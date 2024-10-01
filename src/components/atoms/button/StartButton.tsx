import { memo, FC } from "react";
import { IconButton } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";

export const StartButton: FC = memo(() => {
  return (
    <IconButton aria-label="start" icon={<TimeIcon />} w="4rem">
      start
    </IconButton>
  );
});
