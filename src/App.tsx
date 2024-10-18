import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { ChakraProvider, Stack } from "@chakra-ui/react";

import theme from "./theme/theme";
import { now, dt2date } from "./utils/Datetime";
import { executeCommand } from "./utils/Command";
import { useDebounce } from "./utils/Hooks";
import {
  Todo,
  TodoType,
  getTodoType,
  getMeetings,
  adjustEnd,
} from "./logic/Todo";
import { startButtonClick } from "./logic/Times";
import { filterTodo, compareTodo, upsertMeetings } from "./logic/List";

import { HeaderLayout } from "./components/templates/HeaderLayout";
import { TodoItem } from "./components/organisms/todo/TodoItem";
import { MeetingItem } from "./components/organisms/todo/MeetingItem";
import { NewDayButton } from "./components/atoms/button/NewDayButton";

function App() {
  const JSON_FILE = "/tmp/sample.json";
  const ADJUST_UNIT = 5;
  const [todos, setTodos] = useState<Todo[]>([]);
  const debouncedTodos = useDebounce(todos, 500);
  const prevTodosRef = useRef<Todo[]>();

  useEffect(() => {
    window.electronAPI.subscribeAddTask(
      (summary: string, taskcode: string, memo: string) => {
        setTodos((prevTodos) => {
          const current_dt = now();
          const newTodos = [
            ...prevTodos,
            {
              id: current_dt,
              order: "",
              summary: summary,
              taskcode: taskcode,
              estimate: "",
              times: [],
              memo: memo,
              created: current_dt,
              updated: current_dt,
              done: "",
            },
          ];
          return newTodos;
        });
      }
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await window.electronAPI.readFile(JSON_FILE);
      setTodos(JSON.parse(data));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const saveData = async (content: string) => {
      await window.electronAPI.writeFile(JSON_FILE, content);
    };

    const prevTodos = prevTodosRef.current;
    if (prevTodos && prevTodos !== debouncedTodos) {
      saveData(JSON.stringify(debouncedTodos, null, "  "));
    }
    prevTodosRef.current = debouncedTodos;
  }, [debouncedTodos]);

  const handleNewDayButtonClick = useCallback(async () => {
    const today = dt2date(now());
    const events_str = await executeCommand(
      `python python/get_meeting.py ${today} | grep -v '^Please visit'`
    );
    const meetings = getMeetings(JSON.parse(events_str));
    setTodos((prevTodos) => upsertMeetings(prevTodos, meetings));
    alert("今日の会議を取得しました。");
  }, []);

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

  const handleStartButtonClick = useCallback((id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, times: startButtonClick(todo.times), updated: now() }
          : todo
      )
    );
  }, []);

  const handleAdjustButtonClick = useCallback((id: string, minutes: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, times: adjustEnd(todo.times, minutes), updated: now() }
          : todo
      )
    );
  }, []);

  const handleDoneButtonClick = useCallback((id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, done: todo.done === "" ? now() : "", updated: now() }
          : todo
      )
    );
  }, []);

  const handleDeleteButtonClick = useCallback((id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const renderingDt = useMemo(() => now(), []);
  const renderingDays = [dt2date(renderingDt)];

  return (
    <>
      <ChakraProvider theme={theme}>
        <HeaderLayout>
          <NewDayButton handleClick={handleNewDayButtonClick} />
          {renderingDays.map((date) => (
            <>
              <h1>{date}</h1>
              <Stack>
                {todos
                  .filter((todo) => filterTodo(todo, date))
                  .sort((a, b) => compareTodo(a, b))
                  .map((todo: Todo) => {
                    if (getTodoType(todo) === TodoType.MTG) {
                      return (
                        <MeetingItem
                          key={todo.id}
                          todo={todo}
                          date={date}
                          renderingDt={renderingDt}
                          adjustUnit={ADJUST_UNIT}
                          handleInputChange={handleInputChange}
                          handleStartButtonClick={handleStartButtonClick}
                          handleAdjustButtonClick={handleAdjustButtonClick}
                          handleDoneButtonClick={handleDoneButtonClick}
                          handleDeleteButtonClick={handleDeleteButtonClick}
                        />
                      );
                    } else {
                      return (
                        <TodoItem
                          key={todo.id}
                          todo={todo}
                          date={date}
                          renderingDt={renderingDt}
                          handleInputChange={handleInputChange}
                          handleStartButtonClick={handleStartButtonClick}
                          handleAdjustButtonClick={handleAdjustButtonClick}
                          handleDoneButtonClick={handleDoneButtonClick}
                          handleDeleteButtonClick={handleDeleteButtonClick}
                        />
                      );
                    }
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
