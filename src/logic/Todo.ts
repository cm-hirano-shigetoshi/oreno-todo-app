import { Time, toggleTimer, stopTimer, adjustEnd } from "../logic/Time";

export type Todo = {
  id: string;
  order: string;
  summary: string;
  taskcode: string;
  estimate: string;
  times: Time[];
  memo: string;
  created: string;
  updated: string;
  done: string;
};

export enum TodoType {
  Task = 0,
  MTG = 1,
}

export const createNewTask = (
  summary: string,
  taskcode: string,
  memo: string,
  dt: string
): Todo => {
  return {
    id: dt,
    order: "",
    summary: summary,
    taskcode: taskcode,
    estimate: "",
    times: [],
    memo: memo,
    created: dt,
    updated: dt,
    done: "",
  };
};

export const getTodoType = (todo: Partial<Todo>): TodoType => {
  if (todo.id.startsWith("MTG")) return TodoType.MTG;
  return TodoType.Task;
};

export const isRunning = (todo: Partial<Todo>): boolean => {
  if (todo.times.length === 0) return false;
  if (todo.times[todo.times.length - 1].end === null) return true;
  return false;
};

export const isDone = (todo: Partial<Todo>): boolean => {
  return todo.done !== "";
};

export const toggleRunning = (todo: Todo, dt: string): Todo => {
  return {
    ...todo,
    times: toggleTimer(todo.times, dt),
    updated: dt,
  };
};

export const adjustEndTime = (
  todo: Todo,
  minutes: number,
  dt: string
): Todo => {
  return { ...todo, times: adjustEnd(todo.times, minutes), updated: dt };
};

export const complete = (todo: Todo, dt: string): Todo => {
  return {
    ...todo,
    done: todo.done === "" ? dt : "",
    times: stopTimer(todo.times, dt),
    updated: dt,
  };
};
