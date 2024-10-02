import { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";

import { HeaderLayout } from "./components/templates/HeaderLayout";
import { Todo, TodoItem } from "./components/organisms/todo/TodoItem";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const debouncedTodos = useDebounce(todos, 500);

  useEffect(() => {
    const fetchData = async () => {
      const filePath = "/tmp/sample.json";
      const data = await window.electronAPI.readFile(filePath);
      setTodos(JSON.parse(data));
    };
    fetchData();
  }, []);

  const handleTodoChange = (id: string, newText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, todo: newText } : todo
      )
    );
  };

  useEffect(() => {
    const saveData = async (content: string) => {
      const filePath = "/tmp/sample.json";
      await window.electronAPI.writeFile(filePath, content);
    };
    saveData(JSON.stringify(debouncedTodos, null, "  "));
  }, [debouncedTodos]);

  return (
    <>
      <ChakraProvider theme={theme}>
        <HeaderLayout>
          {todos.map((todo: Todo) => {
            return <TodoItem todo={todo} handleTodoChange={handleTodoChange} />;
          })}
        </HeaderLayout>
      </ChakraProvider>
    </>
  );
}

export default App;
