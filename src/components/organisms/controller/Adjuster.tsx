import { memo, FC } from "react";
import { Stack, HStack, Button } from "@chakra-ui/react";

import { Todo, Project } from "../../../logic/Todo";
import { StatusColor } from "../../../logic/List";
import { Timecard } from "../../../logic/Timecard";

type Props = {
  date: string;
  todos: Partial<Todo>[];
  projects: Project[];
  timecard: Timecard[];
  handleClick: (date: string, projectcode: string) => void;
};

export const Adjuster: FC<Props> = memo((props) => {
  console.log("Adjuster");
  const { date, todos, projects, timecard, handleClick } = props;

  return (
    <>
      {projects.map((project) => {
        return (
          <Stack borderWidth={2} borderColor={project.color}>
            <Button
              bgColor={StatusColor.NOT_COMPLETED}
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
