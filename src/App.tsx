import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { ChakraProvider, Stack, HStack, Heading } from "@chakra-ui/react";

import theme from "./theme/theme";
import {
  now,
  dt2date,
  dateIter,
  getDayOfWeek,
  isWeekDay,
} from "./utils/Datetime";
import { useDebounce } from "./utils/Hooks";
import {
  Todo,
  createNewTask,
  isRunning,
  toggleRunning,
  adjustEndTime,
  complete,
} from "./logic/Todo";
import { getMeetings } from "./logic/GoogleCalendarEvent";
import { toggleTimer, stopTimer } from "./logic/Time";
import { filterTodo, compareTodo, getTodoForDate } from "./logic/List";
import { Timecard, getTimecardByDate } from "./logic/Timecard";
import {
  Project,
  getProjectsByDate,
  getProjectByTaskcode,
} from "./logic/Project";

import { HeaderLayout } from "./components/templates/HeaderLayout";
import { AccumulatedTime } from "./components/organisms/chart/AccumulatedTime";
import { Adjuster } from "./components/organisms/controller/Adjuster";
import {
  stopAllTodos,
  upsertMeetings,
} from "./components/organisms/todolist/TodoList";
import { TodoItem } from "./components/molecules/todo/TodoItem";
import { NewDayButton } from "./components/atoms/button/NewDayButton";

function App() {
  const SHOWING_DAY_LENGTH = 35;
  const ADJUST_UNIT = 5;
  const [projects, setProjects] = useState<{ [date: string]: Project[] }>({});
  const [timecard, setTimecard] = useState<{ [date: string]: Timecard[] }>({});
  const [todos, setTodos] = useState<Todo[]>([]);
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
      stopAllTodos(todos, currentDt);
      return prevTodos.map((todo) =>
        todo.id === id ? toggleRunning(todo, currentDt) : todo
      );
    });
  }, []);

  const handleAdjustButtonClick = useCallback((id: string, minutes: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? adjustEndTime(todo, minutes, now()) : todo
      )
    );
  }, []);

  const handleDoneButtonClick = useCallback((id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? complete(todo, now()) : todo))
    );
  }, []);

  const handleDeleteButtonClick = useCallback((id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const hasProjectGeneral = (todos: Todo[], id: string): boolean => {
    for (const todo of todos) {
      if (todo.id === id) return true;
    }
    return false;
  };
  const createProjectGeneral = (
    todos: Todo[],
    date: string,
    projectcode: string,
    dt: string
  ) => {
    const id = `PJT ${date} ${projectcode}`;
    todos.push({
      id: id,
      order: "",
      summary: id,
      taskcode: projectcode,
      estimate: "",
      times: [],
      memo: "",
      created: dt,
      updated: dt,
      done: "",
    });
  };

  const aaa = (
    todos: Todo[],
    date: string,
    projectcode: string,
    dt: string
  ): Todo[] => {
    const id = `PJT ${date} ${projectcode}`;
    if (!hasProjectGeneral(todos, id))
      createProjectGeneral(todos, date, projectcode, dt);
    return todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            times: toggleTimer(todo.times, dt),
            updated: dt,
          }
        : isRunning(todo)
        ? {
            ...todo,
            times: stopTimer(todo.times, dt),
            updated: dt,
          }
        : todo
    );
  };

  const handleAdjusterButtonClick = useCallback(
    (date: string, projectcode: string) => {
      setTodos((prevTodos) => aaa(prevTodos, date, projectcode, now()));
    },
    []
  );

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
              <>
                <HStack marginBottom={5}>
                  <Heading as="h1">
                    {date} ({getDayOfWeek(date)})
                  </Heading>
                  <NewDayButton
                    handleClick={() => handleNewDayButtonClick(date)}
                  />
                </HStack>
                <HStack style={{ width: "100%", height: 80 }} marginBottom={3}>
                  <AccumulatedTime
                    todos={useMemo(() => getTodoForDate(todos, date), [todos])}
                    projects={useMemo(
                      () => getProjectsByDate(projects, date),
                      [projects]
                    )}
                    timecard={useMemo(
                      () => getTimecardByDate(timecard, date),
                      [timecard]
                    )}
                  />
                </HStack>
                <HStack style={{ width: "100%", height: 120 }} marginBottom={3}>
                  <Adjuster
                    date={date}
                    todos={useMemo(() => getTodoForDate(todos, date), [todos])}
                    projects={useMemo(
                      () => getProjectsByDate(projects, date),
                      [projects]
                    )}
                    handleClick={handleAdjusterButtonClick}
                  />
                </HStack>
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
              </>
            ))}
        </HeaderLayout>
      </ChakraProvider>
    </>
  );
}

export default App;
