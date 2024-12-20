import { memo, FC } from "react";
import { Input, HStack } from "@chakra-ui/react";

import { getTodoColor } from "../../../logic/List";
import { Todo } from "../../../logic/Todo";
import { Project } from "../../../logic/Project";
import { calcElapsedTime } from "../../../logic/Time";
import { dt2date } from "../../../utils/Datetime";
import { ElapsedTime } from "../../atoms/input/ElapsedTime";
import { StampingButton } from "../../atoms/button/StampingButton";
import { DoneButton } from "../../atoms/button/DoneButton";
import { DeleteButton } from "../../atoms/button/DeleteButton";

type Props = {
  todo: Todo;
  date: string;
  renderingDt: string;
  project: Project;
  handleInputChange: (attrib: string, id: string, newText: string) => void;
  handleStampingButtonClick: (id: string) => void;
  handleAdjustButtonClick: (id: string, seconds: number) => void;
  handleDeleteButtonClick: (id: string) => void;
  handleDoneButtonClick: (id: string) => void;
};

export const TaskItem: FC<Props> = memo((props) => {
  console.log("TaskItem");
  const {
    todo,
    date,
    renderingDt,
    project,
    handleInputChange,
    handleStampingButtonClick,
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
          w="4rem"
          value={todo.estimate}
          onChange={(e) =>
            handleInputChange("estimate", todo.id, e.target.value)
          }
        />
        <StampingButton
          handleClick={() => handleStampingButtonClick(todo.id)}
        />
        <ElapsedTime
          minutes={calcElapsedTime(
            todo.times.filter((time) => dt2date(time.start) === date)
          )}
        />
        <ElapsedTime minutes={calcElapsedTime(todo.times)} />
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
