import { useState, useEffect } from "react";
import { ChakraProvider, Button, Input, Flex } from "@chakra-ui/react";
import theme from "./theme/theme";

import { HeaderLayout } from "./components/templates/HeaderLayout";

type Todo = {
  id: string;
  order: string;
  todo: string;
  taskcode: string;
  estimate: string;
  elapsed: string;
  memo: string;
};

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
        order: "1",
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
          {todos.map((todo) => {
            return (
              <>
                <Flex key={todo.id}>
                  <Input h="100%" value={todo.order} />
                  <Input h="100%" value={todo.todo} />
                  <Input h="100%" value={todo.taskcode} />
                  <Input h="100%" value={todo.estimate} />
                  <Button h="100%" colorScheme={"teal"}>
                    start
                  </Button>
                  <Input h="100%" value={todo.elapsed} />
                  <Button h="100%" colorScheme={"teal"}>
                    done
                  </Button>
                  <Input h="100%" value={todo.memo} />
                  <Button h="100%" colorScheme={"teal"}>
                    trash
                  </Button>
                </Flex>
              </>
            );
          })}
        </HeaderLayout>
      </ChakraProvider>
    </>
  );
}

export default App;
