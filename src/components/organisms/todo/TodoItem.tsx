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
  done: boolean;
};

type Props = {
  todo: Todo;
  handleInputChange: (attrib: string, id: string, newText: string) => void;
  handleDoneButtonClick: (id: string) => void;
};

export const TodoItem: FC<Props> = memo((props) => {
  const { todo, handleInputChange, handleDoneButtonClick } = props;
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
          <Input
            px={2}
            w="4rem"
            value={todo.taskcode}
            onChange={(e) =>
              handleInputChange("taskcode", todo.id, e.target.value)
            }
          />
          <Input
            px={2}
            value={todo.summary}
            onChange={(e) =>
              handleInputChange("summary", todo.id, e.target.value)
            }
          />
          <DoneButton
            id={todo.id}
            isCompleted={todo.done}
            handleDoneButtonClick={handleDoneButtonClick}
          />
        </HStack>
        <HStack>
          <Input
            px={2}
            w="4rem"
            value={todo.order}
            onChange={(e) =>
              handleInputChange("order", todo.id, e.target.value)
            }
          />
          <Input
            px={2}
            w="4rem"
            value={todo.estimate}
            onChange={(e) =>
              handleInputChange("estimate", todo.id, e.target.value)
            }
          />
          <Input px={2} w="4rem" value={todo.elapsed} />
          <Input
            px={2}
            value={todo.memo}
            onChange={(e) => handleInputChange("memo", todo.id, e.target.value)}
          />
          <DeleteButton />
        </HStack>
      </Stack>
    </>
  );
});
