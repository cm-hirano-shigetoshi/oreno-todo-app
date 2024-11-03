import { Todo, isRunning } from "../../../logic/Todo";
import { stopTimer } from "../../../logic/Time";

export const stopAllTodos = (todos: Todo[], currentDt: string): Todo[] => {
  return todos.map((todo) =>
    isRunning(todo)
      ? {
          ...todo,
          times: stopTimer(todo.times, currentDt),
          updated: currentDt,
        }
      : todo
  );
};
