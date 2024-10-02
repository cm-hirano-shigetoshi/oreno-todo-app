import { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";

import { HeaderLayout } from "./components/templates/HeaderLayout";
import { Todo, TodoItem } from "./components/organisms/todo/TodoItem";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const filePath = "/tmp/sample.json";
      const data = await window.electronAPI.readFile(filePath);
      setTodos(JSON.parse(data));
    };
    fetchData();
  }, []);

  const handleTodoChange = (id: string, newText: string) => {
    const saveData = async (content: string) => {
      const filePath = "/tmp/sample.json";
      await window.electronAPI.writeFile(filePath, content);
    };

    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, todo: newText } : todo
      );
      saveData(JSON.stringify(newTodos, null, "  "));
      return newTodos;
    });
  };

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
