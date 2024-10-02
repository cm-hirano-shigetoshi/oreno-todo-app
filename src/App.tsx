import { useState, useEffect, useRef } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme/theme";
import { useDebounce } from "./utils/hooks";

import { HeaderLayout } from "./components/templates/HeaderLayout";
import { Todo, TodoItem } from "./components/organisms/todo/TodoItem";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const debouncedTodos = useDebounce(todos, 500);
  const prevTodosRef = useRef<Todo[]>();

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
            return <TodoItem todo={todo} handleTodoChange={handleTodoChange} />;
          })}
        </HeaderLayout>
      </ChakraProvider>
    </>
  );
}

export default App;
