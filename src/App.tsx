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

  return (
    <>
      <ChakraProvider theme={theme}>
        <HeaderLayout>
          {todos.map((todo: Todo) => {
            return <TodoItem todo={todo} />;
          })}
        </HeaderLayout>
      </ChakraProvider>
    </>
  );
}

export default App;
