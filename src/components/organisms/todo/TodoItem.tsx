import { memo, FC } from "react";
import { Input, Stack, HStack } from "@chakra-ui/react";

import { StartButton } from "../../atoms/button/StartButton";
import { DoneButton } from "../../atoms/button/DoneButton";
import { DeleteButton } from "../../atoms/button/DeleteButton";

export type Todo = {
  id: string;
  order: string;
  summary: string;
  taskcode: string;
  estimate: string;
  elapsed: string;
  memo: string;
};

type Props = {
  todo: Todo;
  handleSummaryChange: (id: string, newText: string) => void;
};

export const TodoItem: FC<Props> = memo((props) => {
  const { todo, handleSummaryChange } = props;
  return (
    <>
      <Stack
        key={todo.id}
        bgColor="blue.300"
        marginY={1}
        shadow="md"
        spacing={1}
      >
        <HStack>
          <StartButton />
          <Input px={2} w="4rem" value={todo.taskcode} />
          <Input
            px={2}
            value={todo.summary}
            onChange={(e) => handleSummaryChange(todo.id, e.target.value)}
          />
          <DoneButton />
        </HStack>
        <HStack>
          <Input px={2} w="4rem" value={todo.order} />
          <Input px={2} w="4rem" value={todo.estimate} />
          <Input px={2} w="4rem" value={todo.elapsed} />
          <Input px={2} value={todo.memo} />
          <DeleteButton />
        </HStack>
      </Stack>
    </>
  );
});
