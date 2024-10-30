import { memo, FC } from "react";
import { Stack, HStack, Button } from "@chakra-ui/react";

import { Todo, Project } from "../../../logic/Todo";
import { StatusColor } from "../../../logic/List";
import { Timecard } from "../../../logic/Timecard";

type Props = {
  todos: Partial<Todo>[];
  projects: Project[];
  timecard: Timecard[];
};

export const Adjuster: FC<Props> = memo((props) => {
  console.log("Adjuster");
  const { todos, projects, timecard } = props;

  return (
    <>
      {projects.map((project) => {
        return (
          <Stack borderWidth={1} borderColor={project.color}>
            <Button bgColor={StatusColor.NOT_COMPLETED}>
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
