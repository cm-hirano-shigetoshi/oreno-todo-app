import { memo, FC } from "react";
import { Stack, HStack, Button, Badge } from "@chakra-ui/react";

import { Todo, isRunning, adjustEndTime } from "../../../logic/Todo";
import { Project } from "../../../logic/Project";
import { StatusColor } from "../../../logic/List";
import { calcElapsedTime, toggleTimer, stopTimer } from "../../../logic/Time";

export const getTaskcodeFromId = (id: string): string => {
  return id.slice(15);
};

const hasQuickTaskcodeTodo = (todos: Todo[], id: string): boolean => {
  for (const todo of todos) {
    if (todo.id === id) return true;
  }
  return false;
};

const createQuickTaskcodeTodo = (todos: Todo[], id: string, dt: string) => {
  const projectcode = getTaskcodeFromId(id);
  todos.push({
    id: id,
    order: "",
    summary: id,
    taskcode: projectcode,
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
          times: stopTimer(todo.times, dt, false),
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

const getColor = (
  todos: Partial<Todo>[],
  projectcode: string,
  date: string
): StatusColor => {
  const projectGeneral = getQuickTaskcodeTodoById(
    todos,
    `PJT ${date} ${projectcode}`
  );
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
  projects: Project[];
  handleClick: (id: string) => void;
  handleAdjust: (id: string, minutes: number) => void;
};

export const QuickTaskcode: FC<Props> = memo((props) => {
  const { date, todos, projects, handleClick, handleAdjust } = props;
  return (
    <HStack style={{ width: "100%", height: 120 }} marginBottom={3}>
      {projects.map((project) => {
        const id = `PJT ${date} ${project.projectcode}`;
        return (
          <Stack borderWidth={2} borderColor={project.color}>
            <Button
              bgColor={getColor(todos, project.projectcode, date)}
              onClick={() => handleClick(id)}
            >
              {project.projectname || project.projectcode}
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
