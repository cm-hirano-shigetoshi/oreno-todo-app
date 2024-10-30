import { memo, FC } from "react";
import { Input, HStack } from "@chakra-ui/react";

import { getTodoColor } from "../../../logic/List";
import { Todo, Project } from "../../../logic/Todo";
import { ElapsedTime } from "../../atoms/input/ElapsedTime";
import { DoneButton } from "../../atoms/button/DoneButton";
import { AdjustButton } from "../../atoms/button/AdjustButton";
import { DeleteButton } from "../../atoms/button/DeleteButton";

type Props = {
  todo: Todo;
  date: string;
  renderingDt: string;
  adjustUnit: number;
  project: Project;
  handleInputChange: (attrib: string, id: string, newText: string) => void;
  handleStartButtonClick: (id: string) => void;
  handleAdjustButtonClick: (id: string, minutes: number) => void;
  handleDeleteButtonClick: (id: string) => void;
  handleDoneButtonClick: (id: string) => void;
};

export const MeetingItem: FC<Props> = memo((props) => {
  console.log("MeetingItem");
  const {
    todo,
    date,
    renderingDt,
    adjustUnit,
    project,
    handleInputChange,
    handleAdjustButtonClick,
    handleDoneButtonClick,
    handleDeleteButtonClick,
  } = props;
  return (
    <>
      <HStack bgColor={getTodoColor(todo, date, renderingDt)}>
        <Input
          px={2}
          w="6rem"
          value={todo.order}
          onChange={(e) => handleInputChange("order", todo.id, e.target.value)}
        />
        <Input
          px={2}
          w="8rem"
          value={todo.taskcode}
          bgColor={project ? `${project.color}.500` : "gray"}
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
        <Input
          px={2}
          w="6rem"
          value={todo.estimate}
          onChange={(e) =>
            handleInputChange("estimate", todo.id, e.target.value)
          }
        />
        <AdjustButton
          adjustUnit={-adjustUnit}
          handleClick={() => handleAdjustButtonClick(todo.id, -adjustUnit)}
        />
        <AdjustButton
          adjustUnit={adjustUnit}
          handleClick={() => handleAdjustButtonClick(todo.id, adjustUnit)}
        />
        <ElapsedTime times={todo.times} />
        <Input
          px={2}
          value={todo.memo}
          onChange={(e) => handleInputChange("memo", todo.id, e.target.value)}
        />
        <DoneButton
          done={todo.done}
          handleClick={() => handleDoneButtonClick(todo.id)}
        />
        <DeleteButton handleClick={() => handleDeleteButtonClick(todo.id)} />
      </HStack>
    </>
  );
});
