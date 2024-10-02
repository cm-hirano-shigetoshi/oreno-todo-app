import { useState, useEffect, useRef } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme/theme";
import { useDebounce } from "./utils/hooks";

import { HeaderLayout } from "./components/templates/HeaderLayout";
import { Todo, TodoItem } from "./components/organisms/todo/TodoItem";

function App() {
  const JSON_FILE = "/tmp/sample.json";
  const [todos, setTodos] = useState<Todo[]>([]);
  const debouncedTodos = useDebounce(todos, 500);
  const prevTodosRef = useRef<Todo[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await window.electronAPI.readFile(JSON_FILE);
      setTodos(JSON.parse(data));
    };
    fetchData();
  }, []);

  const handleSummaryChange = (id: string, newText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, summary: newText } : todo
      )
    );
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

  return (
    <>
      <ChakraProvider theme={theme}>
        <HeaderLayout>
          {todos.map((todo: Todo) => {
            return <TodoItem todo={todo} handleSummaryChange={handleSummaryChange} />;
          })}
        </HeaderLayout>
      </ChakraProvider>
    </>
  );
}

export default App;
