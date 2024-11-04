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
};

export const Adjuster: FC<Props> = memo((props) => {
  const { date, todos, projects, handleClick } = props;
  return (
    <>
      {projects.map((project) => {
        return (
          <Stack borderWidth={2} borderColor={project.color}>
            <Button
              bgColor={getColor(todos, project.projectcode, date)}
              onClick={() => handleClick(date, project.projectcode)}
            >
              {project.projectname || project.projectcode}
            </Button>
            <HStack>
              <Button>←</Button>
              <Button>→</Button>
            </HStack>
          </Stack>
        );
      })}
    </>
  );
});
