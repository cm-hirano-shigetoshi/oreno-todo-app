import { memo, FC } from "react";
import { Stack, HStack, Button, Badge } from "@chakra-ui/react";

import { Todo, isRunning, adjustEndTime } from "../../../logic/Todo";
import { Taskcode } from "../../../logic/Project";
import { StatusColor } from "../../../logic/List";
import { calcElapsedTime, toggleTimer, stopTimer } from "../../../logic/Time";

export const getSummaryFromId = (id: string): string => {
  const end = id.lastIndexOf(" ");
  const start = id.lastIndexOf(" ", end - 1) + 1;
  return id.slice(start, end);
};

export const getTaskcodeFromId = (id: string): string => {
  return id.slice(id.lastIndexOf(" ") + 1);
};

const hasQuickTaskcodeTodo = (todos: Todo[], id: string): boolean => {
  for (const todo of todos) {
    if (todo.id === id) return true;
  }
  return false;
};

const createQuickTaskcodeTodo = (todos: Todo[], id: string, dt: string) => {
  todos.push({
    id: id,
    order: "",
    summary: getSummaryFromId(id),
    taskcode: getTaskcodeFromId(id),
    estimate: "",
    times: [],
    memo: "",
    created: dt,
    updated: dt,
    done: "",
  });
};

export const toggleQuickTaskcodeRunning = (
  todos: Todo[],
  id: string,
  dt: string
): Todo[] => {
  if (!hasQuickTaskcodeTodo(todos, id)) createQuickTaskcodeTodo(todos, id, dt);
  return todos.map((todo) =>
    todo.id === id
      ? {
          ...todo,
          times: toggleTimer(todo.times, dt),
          updated: dt,
        }
      : isRunning(todo)
      ? {
          ...todo,
          times: stopTimer(todo.times, dt, true),
          updated: dt,
        }
      : todo
  );
};

export const adjustQuickTaskcode = (
  todos: Todo[],
  id: string,
  minutes: number,
  dt: string
): Todo[] => {
  if (!hasQuickTaskcodeTodo(todos, id)) createQuickTaskcodeTodo(todos, id, dt);
  return todos.map((todo) => {
    return todo.id === id ? adjustEndTime(todo, minutes, dt) : todo;
  });
};

const getQuickTaskcodeTodoById = (
  todos: Partial<Todo>[],
  id: string
): Partial<Todo> => {
  for (const todo of todos) {
    if (todo.id === id) return todo;
  }
  return null;
};

const getColor = (todos: Partial<Todo>[], id: string): StatusColor => {
  const projectGeneral = getQuickTaskcodeTodoById(todos, id);
  return projectGeneral && isRunning(projectGeneral)
    ? StatusColor.RUNNING
    : StatusColor.NOT_COMPLETED;
};

const calcElapsedTimeById = (todos: Partial<Todo>[], id: string) => {
  const targetIndex = todos.findIndex((todo) => todo.id === id);
  if (targetIndex === -1) return 0;
  const targetTodo = todos[targetIndex];
  return calcElapsedTime(targetTodo.times ?? []);
};

type Props = {
  date: string;
  todos: Partial<Todo>[];
  taskcodes: Taskcode[];
  handleClick: (id: string) => void;
  handleAdjust: (id: string, minutes: number) => void;
};

export const QuickTaskcode: FC<Props> = memo((props) => {
  const { date, todos, taskcodes, handleClick, handleAdjust } = props;
  return (
    <HStack style={{ width: "100%", height: 120 }} marginBottom={3}>
      {taskcodes.map((taskcode) => {
        const id = `PJT ${date} ${taskcode.name || taskcode.taskcode} ${
          taskcode.taskcode
        }`;
        return (
          <Stack borderWidth={2}>
            <Button
              bgColor={getColor(todos, id)}
              onClick={() => handleClick(id)}
            >
              {taskcode.name || taskcode.taskcode}
            </Button>
            <Badge w="2rem">{calcElapsedTimeById(todos, id)}</Badge>;
            <HStack>
              <Button onClick={() => handleAdjust(id, -5)}>←</Button>
              <Button onClick={() => handleAdjust(id, 5)}>→</Button>
            </HStack>
          </Stack>
        );
      })}
    </HStack>
  );
});
