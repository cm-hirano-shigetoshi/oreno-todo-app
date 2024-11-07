import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { ChakraProvider, Stack } from "@chakra-ui/react";

import theme from "./theme/theme";
import { now, dt2date, dateIter, isWeekDay } from "./utils/Datetime";
import { useDebounce } from "./utils/Hooks";
import { Todo, createNewTask, toggleRunning, complete } from "./logic/Todo";
import { getMeetings } from "./logic/GoogleCalendarEvent";
import { filterTodo, compareTodo, getTodoByDate } from "./logic/List";
import { Timecard, getTimecardByDate } from "./logic/Timecard";
import {
  Project,
  Taskcode,
  getProjectsByDate,
  getProjectByTaskcode,
  getQuickTaskcodesByDate,
} from "./logic/Project";

import { HeaderLayout } from "./components/templates/HeaderLayout";
import { DateTitle } from "./components/organisms/date/Date";
import { AccumulatedTime } from "./components/organisms/chart/AccumulatedTime";
import {
  QuickTaskcode,
  toggleQuickTaskcodeRunning,
  adjustQuickTaskcode,
} from "./components/organisms/controller/QuickTaskcode";
import {
  stopAllTodos,
  upsertMeetings,
} from "./components/organisms/todolist/TodoList";
import { TodoItem } from "./components/molecules/todo/TodoItem";

function App() {
  const SHOWING_DAY_LENGTH = 35;
  const ADJUST_UNIT = 5;
  const [projects, setProjects] = useState<{ [date: string]: Project[] }>({});
  const [timecard, setTimecard] = useState<{ [date: string]: Timecard[] }>({});
  const [todos, setTodos] = useState<Todo[]>([]);
  const [quickTaskcodes, setQuickTaskcodes] = useState<{
    [date: string]: Taskcode[];
  }>({});
  const debouncedTodos = useDebounce(todos, 500);
  const prevTodosRef = useRef<Todo[]>();

  useEffect(() => {
    window.electronAPI.subscribeAddTask(
      (summary: string, taskcode: string, memo: string) => {
        setTodos((prevTodos) => {
          return [...prevTodos, createNewTask(summary, taskcode, memo, now())];
        });
      }
    );
  }, []);

  useEffect(() => {
    window.electronAPI.subscribeStopTodos(() => {
      setTodos((prevTodos) => stopAllTodos(prevTodos, now()));
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const todoList = await window.electronAPI.readFile("todo_list.json");
      setTodos(JSON.parse(todoList));
      const projects = await window.electronAPI.readFile("project.json");
      setProjects(JSON.parse(projects));
      const timecard = await window.electronAPI.readFile("timecard.json");
      setTimecard(JSON.parse(timecard));
      const quickTaskcodes = await window.electronAPI.readFile(
        "quick_taskcode.json"
      );
      setQuickTaskcodes(JSON.parse(quickTaskcodes));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const saveData = async (content: string) => {
      await window.electronAPI.writeFile("todo_list.json", content);
    };

    const prevTodos = prevTodosRef.current;
    if (prevTodos && prevTodos !== debouncedTodos) {
      saveData(JSON.stringify(debouncedTodos, null, "  "));
    }
    prevTodosRef.current = debouncedTodos;
  }, [debouncedTodos]);

  const handleNewDayButtonClick = useCallback(
    async (date: string) => {
      const meetings = await getMeetings(
        date,
        getProjectsByDate(projects, date)
      );
      setTodos((prevTodos) => upsertMeetings(prevTodos, meetings));
    },
    [projects]
  );

  const handleInputChange = useCallback(
    (attrib: string, id: string, newText: string) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, [attrib]: newText, updated: now() } : todo
        )
      );
    },
    []
  );

  const handleStampingButtonClick = useCallback((id: string) => {
    const currentDt = now();
    setTodos((prevTodos) => {
      prevTodos = stopAllTodos(prevTodos, currentDt, [id]);
      return prevTodos.map((todo) =>
        todo.id === id ? toggleRunning(todo, currentDt) : todo
      );
    });
  }, []);

  const handleDoneButtonClick = useCallback((id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? complete(todo, now()) : todo))
    );
  }, []);

  const handleDeleteButtonClick = useCallback((id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const handleQuickTaskcodeButtonClick = useCallback((id: string) => {
    setTodos((prevTodos) => toggleQuickTaskcodeRunning(prevTodos, id, now()));
  }, []);

  const handleAdjustButtonClick = useCallback((id: string, minutes: number) => {
    setTodos((prevTodos) => adjustQuickTaskcode(prevTodos, id, minutes, now()));
  }, []);

  const getShowingDays = (renderingDt: string, len: number): string[] => {
    return [...dateIter(dt2date(renderingDt), len, -1)];
  };

  const renderingDt = useMemo(() => now(), []);
  const renderingDays = useMemo(
    () => getShowingDays(renderingDt, SHOWING_DAY_LENGTH),
    []
  );

  return (
    <>
      <ChakraProvider theme={theme}>
        <HeaderLayout>
          {renderingDays
            .filter((date) => isWeekDay(date))
            .map((date) => (
              <Stack key={date}>
                <DateTitle date={date} handleClick={handleNewDayButtonClick} />
                <AccumulatedTime
                  todos={useMemo(() => getTodoByDate(todos, date), [todos])}
                  projects={useMemo(
                    () => getProjectsByDate(projects, date),
                    [projects]
                  )}
                  timecard={useMemo(
                    () => getTimecardByDate(timecard, date),
                    [timecard]
                  )}
                />
                <QuickTaskcode
                  date={date}
                  todos={useMemo(() => getTodoByDate(todos, date), [todos])}
                  taskcodes={useMemo(
                    () => getQuickTaskcodesByDate(quickTaskcodes, date),
                    [quickTaskcodes]
                  )}
                  handleClick={handleQuickTaskcodeButtonClick}
                  handleAdjust={handleAdjustButtonClick}
                />
                <Stack marginBottom={10}>
                  {todos
                    .filter((todo) => filterTodo(todo, date))
                    .sort((a, b) => compareTodo(a, b))
                    .map((todo: Todo) => {
                      return (
                        <TodoItem
                          key={todo.id}
                          todo={todo}
                          date={date}
                          renderingDt={renderingDt}
                          project={getProjectByTaskcode(
                            getProjectsByDate(projects, date),
                            todo.taskcode
                          )}
                          adjustUnit={ADJUST_UNIT}
                          handleInputChange={handleInputChange}
                          handleStampingButtonClick={handleStampingButtonClick}
                          handleAdjustButtonClick={handleAdjustButtonClick}
                          handleDoneButtonClick={handleDoneButtonClick}
                          handleDeleteButtonClick={handleDeleteButtonClick}
                        />
                      );
                    })}
                </Stack>
              </Stack>
            ))}
        </HeaderLayout>
      </ChakraProvider>
    </>
  );
}

export default App;
