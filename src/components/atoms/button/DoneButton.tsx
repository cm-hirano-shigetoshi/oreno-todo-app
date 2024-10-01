import { memo, FC } from "react";
import { IconButton } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

export const DoneButton: FC = memo(() => {
  return (
    <IconButton aria-label="done" icon={<CheckIcon />} w="4rem">
      done
    </IconButton>
  );
});
