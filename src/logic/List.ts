import { Todo, TodoType, getTodoType, isDone, isRunning } from "./Todo";
import { dt2date } from "../utils/Datetime";

export enum StatusColor {
  COMPLETED = "green.300",
  NOT_COMPLETED = "blue.100",
  RUNNING = "blue.300",
  EXPIRED = "gray.400",
}

export const filterTodo = (todo: Todo, date: string): boolean => {
  if (getTodoType(todo) === TodoType.MTG) {
    return dt2date(todo.created) === date;
  } else {
    if (isDone(todo)) {
      return dt2date(todo.created) <= date && date <= dt2date(todo.done);
    } else {
      return dt2date(todo.created) <= date;
    }
  }
};

export const compareTodo = (todoA: Todo, todoB: Todo): number => {
  if (todoA.order.startsWith("MTG") && todoB.order.startsWith("MTG")) {
    return todoA.order < todoB.order ? -1 : 1;
  } else if (todoA.order.startsWith("MTG")) {
    return 1;
  } else if (todoB.order.startsWith("MTG")) {
    return -1;
  } else {
    return Number(todoA.order) < Number(todoB.order) ? -1 : 1;
  }
};

export const getTodoColor = (
  todo: Todo,
  date: string,
  rendering_dt: string
) => {
  if (date < dt2date(rendering_dt)) return StatusColor.EXPIRED;
  if (isRunning(todo)) return StatusColor.RUNNING;
  if (isDone(todo)) return StatusColor.COMPLETED;
  return StatusColor.NOT_COMPLETED;
};

function mergeArrays(arrayA: Todo[], arrayB: Todo[]): Todo[] {
  const result: Todo[] = [...arrayA];

  arrayB.forEach((TodoB) => {
    const indexInA = result.findIndex((TodoA) => TodoA.id === TodoB.id);

    if (indexInA === -1) {
      result.push(TodoB);
    } else {
      if (TodoB.updated >= result[indexInA].updated) {
        // Aが手動で書き換えられていた場合のみAを残す
        result[indexInA] = TodoB;
      }
    }
  });

  return result;
}

export const upsertMeetings = (todos: Todo[], meetings: Todo[]): Todo[] => {
  return mergeArrays(todos, meetings);
};
