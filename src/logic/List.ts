import { Todo, TodoType, getTodoType, isDone } from "./Todo";
import { dt2date } from "../utils/Datetime";

export const filterTodo = (todo: Todo, date: string): boolean => {
  if (getTodoType(todo) === TodoType.MTG) {
    return dt2date(todo.registered) === date;
  } else {
    if (!isDone(todo)) return true;
    if (dt2date(todo.registered) <= date) return true;
    return false;
  }
};

const mergeArrays = (A: Todo[], B: Todo[]): Todo[] => {
  const idsInA = new Set(A.map((Todo) => Todo.id));
  const filteredB = B.filter((Todo) => !idsInA.has(Todo.id));
  return [...A, ...filteredB];
};

export const upsertMeetings = (todos: Todo[], meetings: Todo[]): Todo[] => {
  return mergeArrays(todos, meetings);
};
