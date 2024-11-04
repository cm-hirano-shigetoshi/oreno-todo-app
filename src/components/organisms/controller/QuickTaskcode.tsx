import { memo, FC } from "react";
import { Stack, HStack, Button } from "@chakra-ui/react";

import { Todo, isRunning } from "../../../logic/Todo";
import { Project } from "../../../logic/Project";
import { StatusColor } from "../../../logic/List";

const getProjectGeneralById = (
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
  const projectGeneral = getProjectGeneralById(
    todos,
    `PJT ${date} ${projectcode}`
  );
  return projectGeneral && isRunning(projectGeneral)
    ? StatusColor.RUNNING
    : StatusColor.NOT_COMPLETED;
};

type Props = {
  date: string;
  todos: Partial<Todo>[];
  projects: Project[];
  handleClick: (date: string, projectcode: string) => void;
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
              onClick={() => handleClick(date, project.projectcode)}
            >
              {project.projectname || project.projectcode}
            </Button>
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
