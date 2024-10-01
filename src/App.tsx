import { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";

import { HeaderLayout } from "./components/templates/HeaderLayout";
import { Todo, TodoItem } from "./components/organisms/todo/TodoItem";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setTodos([
      {
        id: "1",
        order: "1",
        todo: "あれやる",
        taskcode: "c123",
        estimate: "120",
        elapsed: "90",
        memo: "hogehoge",
      },
      {
        id: "1",
        order: "100",
        todo: "あれやる",
        taskcode: "c123",
        estimate: "120",
        elapsed: "90",
        memo: "hogehoge",
      },
    ]);
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
