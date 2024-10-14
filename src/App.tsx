import { useState, useEffect, useRef } from "react";
import { ChakraProvider, Stack } from "@chakra-ui/react";

import theme from "./theme/theme";
import { now } from "./utils/Datetime";
import { executeCommand } from "./utils/Command";
import { useDebounce } from "./utils/Hooks";
import { Todo, getMeetings } from "./logic/Todo";
import { startButtonClick } from "./logic/Times";
import { filterTodo, upsertMeetings } from "./logic/List";

import { HeaderLayout } from "./components/templates/HeaderLayout";
import { TodoItem } from "./components/organisms/todo/TodoItem";
import { NewDayButton } from "./components/atoms/button/NewDayButton";

function App() {
  const JSON_FILE = "/tmp/sample.json";
  const [todos, setTodos] = useState<Todo[]>([]);
  const debouncedTodos = useDebounce(todos, 500);
  const prevTodosRef = useRef<Todo[]>();

  useEffect(() => {
    window.electronAPI.subscribeAddTask((summary: string) => {
      setTodos((prevTodos) => {
        const current_dt = now();
        const newTodos = [
          ...prevTodos,
          {
            id: current_dt,
            order: "100",
            summary: summary,
            taskcode: "c123",
            estimate: "30",
            times: [],
            memo: "",
            registered: now(),
            done: "",
          },
        ];
        return newTodos;
      });
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await window.electronAPI.readFile(JSON_FILE);
      setTodos(JSON.parse(data));
    };
    fetchData();
  }, []);

  const handleNewDayButtonClick = async () => {
    const events_str = await executeCommand(
      "python python/get_meeting.py | grep -v '^Please visit'"
    );
    const meetings = getMeetings(JSON.parse(events_str));
    setTodos((prevTodos) => upsertMeetings(prevTodos, meetings));
    alert("今日の会議を取得しました。");
  };

  const handleInputChange = (attrib: string, id: string, newText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, [attrib]: newText } : todo
      )
    );
  };

  const handleStartButtonClick = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, times: startButtonClick(todo.times) } : todo
      )
    );
  };

  const handleDoneButtonClick = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: todo.done === "" ? now() : "" } : todo
      )
    );
  };

  const handleDeleteButtonClick = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

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

  const days = ["2024-10-10", "2024-10-11", "2024-10-12"];

  return (
    <>
      <ChakraProvider theme={theme}>
        <HeaderLayout>
          <NewDayButton handleClick={handleNewDayButtonClick} />
          {days.reverse().map((date) => (
            <>
              <h1>{date}</h1>
              <Stack>
                {todos
                  .filter((todo) => filterTodo(todo, date))
                  .sort((a, b) => Number(a.order) - Number(b.order))
                  .map((todo: Todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      handleInputChange={handleInputChange}
                      handleStartButtonClick={handleStartButtonClick}
                      handleDoneButtonClick={handleDoneButtonClick}
                      handleDeleteButtonClick={handleDeleteButtonClick}
                    />
                  ))}
              </Stack>
            </>
          ))}
        </HeaderLayout>
      </ChakraProvider>
    </>
  );
}

export default App;
