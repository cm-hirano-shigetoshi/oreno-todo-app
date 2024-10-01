import { memo, FC } from "react";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export const DeleteButton: FC = memo(() => {
  return (
    <IconButton aria-label="delete" icon={<DeleteIcon />} w="4rem">
      delete
    </IconButton>
  );
});
