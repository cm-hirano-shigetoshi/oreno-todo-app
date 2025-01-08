import { Todo, TodoType, getTodoType, isDone, isRunning } from "./Todo";
import { Time } from "./Time";
import { dt2date } from "../utils/Datetime";
import { hashObject } from "../utils/Utils";

export enum StatusColor {
  COMPLETED = "green.300",
  NOT_COMPLETED = "blue.100",
  RUNNING = "blue.300",
  EXPIRED = "gray.400",
  MEETING = "red.100",
  MEETING_DONE = "pink.300",
}

export type DailyTodo = {
  id: string;
  taskcode: string;
  times: Time[];
  done: string;
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
    if (isDone(todo)) {
      if (dt2date(todo.done) === date) {
        return StatusColor.COMPLETED;
      } else {
        return StatusColor.EXPIRED;
      }
    } else {
      if (date < dt2date(renderingDt)) return StatusColor.EXPIRED;
      if (isRunning(todo)) return StatusColor.RUNNING;
      return StatusColor.NOT_COMPLETED;
    }
  }
};

const dailyTodoIds: { [id: string]: DailyTodo[] } = {};

export const getTodoByDate = (
  todos: Partial<Todo>[],
  date: string
): DailyTodo[] => {
  const dailyTodos = todos
    .filter((todo) =>
      todo.id.startsWith("PJT") ? todo.id.slice(4, 14) === date : true
    )
    .map((todo) => {
      return {
        id: todo.id,
        taskcode: todo.taskcode,
        times: todo.id.startsWith("PJT")
          ? todo.times
          : todo.times.filter((time) => dt2date(time.start) === date),
        done: todo.done,
      };
    })
    .filter((dailyTodo) => dailyTodo.times.length > 0);
  const id = hashObject(dailyTodos);
  if (id in dailyTodoIds) {
    return dailyTodoIds[id];
  } else {
    dailyTodoIds[id] = dailyTodos;
    return dailyTodos;
  }
};
