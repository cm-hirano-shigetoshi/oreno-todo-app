import { memo, FC } from "react";
import { Input, Stack, HStack } from "@chakra-ui/react";

import { getTodoColor } from "../../../logic/List";
import { Todo } from "../../../logic/Todo";
import { ElapsedTime } from "../../atoms/input/ElapsedTime";
import { StartButton } from "../../atoms/button/StartButton";
import { DoneButton } from "../../atoms/button/DoneButton";
import { AdjustButton } from "../../atoms/button/AdjustButton";
import { DeleteButton } from "../../atoms/button/DeleteButton";

type Props = {
  todo: Todo;
  date: string;
  renderingDt: string;
  adjustUnit: number;
  handleInputChange: (attrib: string, id: string, newText: string) => void;
  handleStartButtonClick: (id: string) => void;
  handleAdjustButtonClick: (id: string, minutes: number) => void;
  handleDeleteButtonClick: (id: string) => void;
  handleDoneButtonClick: (id: string) => void;
};

export const MeetingItem: FC<Props> = memo((props) => {
  const {
    todo,
    date,
    renderingDt,
    adjustUnit,
    handleInputChange,
    handleStartButtonClick,
    handleAdjustButtonClick,
    handleDoneButtonClick,
    handleDeleteButtonClick,
  } = props;
  return (
    <>
      <Stack
        key={todo.id}
        bgColor={getTodoColor(todo, date, renderingDt)}
        marginY={1}
        shadow="md"
        spacing={1}
      >
        <HStack>
          <StartButton handleClick={() => handleStartButtonClick(todo.id)} />
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
            done={todo.done}
            handleClick={() => handleDoneButtonClick(todo.id)}
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
          <ElapsedTime times={todo.times} />
          <AdjustButton
            adjustUnit={-adjustUnit}
            handleClick={() => handleAdjustButtonClick(todo.id, -adjustUnit)}
          />
          <AdjustButton
            adjustUnit={adjustUnit}
            handleClick={() => handleAdjustButtonClick(todo.id, adjustUnit)}
          />
          <Input
            px={2}
            value={todo.memo}
            onChange={(e) => handleInputChange("memo", todo.id, e.target.value)}
          />
          <DeleteButton handleClick={() => handleDeleteButtonClick(todo.id)} />
        </HStack>
      </Stack>
    </>
  );
});
