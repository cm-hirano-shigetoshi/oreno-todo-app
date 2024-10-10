import { useState, useEffect, useRef } from "react";
import { ChakraProvider, Stack } from "@chakra-ui/react";

import theme from "./theme/theme";
import { now, dt2date } from "./utils/Datetime";
import { useDebounce } from "./utils/Hooks";
import { startButtonClick } from "./logic/Times";

import { HeaderLayout } from "./components/templates/HeaderLayout";
import { Todo, TodoItem } from "./components/organisms/todo/TodoItem";

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

  const days = [
    "2024-10-01",
    "2024-10-02",
    "2024-10-03",
    "2024-10-04",
    "2024-10-05",
    "2024-10-06",
    "2024-10-07",
    "2024-10-08",
    "2024-10-09",
    "2024-10-10",
  ];

  return (
    <>
      <ChakraProvider theme={theme}>
        <HeaderLayout>
          {days.reverse().map((day) => (
            <>
              <h1>{day}</h1>
              <Stack border={10}>
                {todos
                  .filter(
                    (todo) =>
                      dt2date(todo.registered) <= day &&
                      day <= (todo.done === "" ? "9999-99-99" : todo.done)
                  )
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
