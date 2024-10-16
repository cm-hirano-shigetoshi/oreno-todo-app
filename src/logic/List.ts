import { Todo, TodoType, getTodoType, isDone } from "./Todo";
import { dt2date } from "../utils/Datetime";

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
