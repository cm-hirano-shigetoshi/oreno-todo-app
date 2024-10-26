import { Todo, TodoType, getTodoType, isDone, isRunning } from "./Todo";
import { dt2date } from "../utils/Datetime";

export enum StatusColor {
  COMPLETED = "green.300",
  NOT_COMPLETED = "blue.100",
  RUNNING = "blue.300",
  EXPIRED = "gray.400",
  MEETING = "red.100",
  MEETING_DONE = "pink.300",
}

export type DailyTodos = {
  [date: string]: Partial<Todo>[];
};

export const filterTodo = (todo: Todo, date: string): boolean => {
  if (getTodoType(todo) === TodoType.MTG) {
    return dt2date(todo.times[0].start) === date;
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

export const getTodoColor = (todo: Todo, date: string, renderingDt: string) => {
  if (getTodoType(todo) === TodoType.MTG) {
    if (isDone(todo)) return StatusColor.MEETING_DONE;
    return StatusColor.MEETING;
  } else {
    if (isDone(todo)) return StatusColor.COMPLETED;
    if (date < dt2date(renderingDt)) return StatusColor.EXPIRED;
    if (isRunning(todo)) return StatusColor.RUNNING;
    return StatusColor.NOT_COMPLETED;
  }
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

export const calcDailyTodos = (
  todos: Todo[],
  renderingDays: string[]
): DailyTodos => {
  const dailyTodos: DailyTodos = {};
  for (const todo of todos) {
    for (const date of renderingDays) {
      const filteredTimes = todo.times.filter(
        (time) => dt2date(time.start) === date
      );
      (dailyTodos[date] ??= []).push({ ...todo, times: filteredTimes });
    }
  }
  return dailyTodos;
};
