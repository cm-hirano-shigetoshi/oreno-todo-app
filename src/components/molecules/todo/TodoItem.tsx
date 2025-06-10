import { memo, FC } from "react";
import { useDrag, useDrop } from "react-dnd";

import { Todo, TodoType, getTodoType } from "../../../logic/Todo";
import { Project } from "../../../logic/Project";
import { TaskItem } from "./TaskItem";
import { MeetingItem } from "./MeetingItem";

type Props = {
  todo: Todo;
  date: string;
  renderingDt: string;
  adjustUnit: number;
  project: Project;
  handleInputChange: (attrib: string, id: string, newText: string) => void;
  handleStampingButtonClick: (id: string) => void;
  handleAdjustButtonClick: (id: string, minutes: number) => void;
  handleDeleteButtonClick: (id: string) => void;
  handleDoneButtonClick: (id: string) => void;
  handleEnterMeetingButtonClick: (id: string) => void;
  handleMoveTodo: (dragId: string, hoverId: string) => void;
};

export const TodoItem: FC<Props> = memo((props) => {
  const { todo, handleMoveTodo } = props;

  const [{ isDragging }, drag] = useDrag({
    type: "TODO",
    item: { id: todo.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "TODO",
    hover: (item: { id: string }) => {
      if (item.id !== todo.id) {
        handleMoveTodo(item.id, todo.id);
      }
    },
  });

  const opacity = isDragging ? 0.5 : 1;

  if (getTodoType(todo) === TodoType.Task) {
    return (
      <div ref={(node) => drag(drop(node))} style={{ opacity }}>
        <TaskItem {...props} />
      </div>
    );
  } else if (getTodoType(todo) === TodoType.MTG) {
    return (
      <div ref={(node) => drag(drop(node))} style={{ opacity }}>
        <MeetingItem {...props} />
      </div>
    );
  }
});
