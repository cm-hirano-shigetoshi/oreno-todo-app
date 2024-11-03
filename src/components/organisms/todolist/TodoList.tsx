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

export const upsertMeetings = (todos: Todo[], meetings: Todo[]): Todo[] => {
  const result: Todo[] = [...todos];

  meetings.forEach((meeting) => {
    const indexInTodo = result.findIndex((todo) => todo.id === meeting.id);
    if (indexInTodo === -1) {
      result.push(meeting);
    } else {
      if (meeting.updated >= result[indexInTodo].updated) {
        // Todoが手動で書き換えられていた場合のみTodoを残す
        result[indexInTodo] = meeting;
      }
    }
  });

  return result;
};
