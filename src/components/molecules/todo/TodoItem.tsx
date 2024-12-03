import { memo, FC } from "react";

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
};

export const TodoItem: FC<Props> = memo((props) => {
  const { todo } = props;
  if (getTodoType(todo) === TodoType.Task) {
    return <TaskItem {...props} />;
  } else if (getTodoType(todo) === TodoType.MTG) {
    return <MeetingItem {...props} />;
  }
});
