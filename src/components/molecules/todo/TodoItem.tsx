import { memo, FC } from "react";
import { Input, HStack } from "@chakra-ui/react";

import { getTodoColor } from "../../../logic/List";
import { Todo, Project } from "../../../logic/Todo";
import { ElapsedTime } from "../../atoms/input/ElapsedTime";
import { StartButton } from "../../atoms/button/StartButton";
import { DoneButton } from "../../atoms/button/DoneButton";
import { DeleteButton } from "../../atoms/button/DeleteButton";

type Props = {
  todo: Todo;
  date: string;
  renderingDt: string;
  project: Project;
  handleInputChange: (attrib: string, id: string, newText: string) => void;
  handleStartButtonClick: (id: string) => void;
  handleAdjustButtonClick: (id: string, seconds: number) => void;
  handleDeleteButtonClick: (id: string) => void;
  handleDoneButtonClick: (id: string) => void;
};

export const TodoItem: FC<Props> = memo((props) => {
  console.log("TodoItem");
  const {
    todo,
    date,
    renderingDt,
    project,
    handleInputChange,
    handleStartButtonClick,
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
        <StartButton handleClick={() => handleStartButtonClick(todo.id)} />
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
