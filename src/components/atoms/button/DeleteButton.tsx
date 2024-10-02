import { memo, FC } from "react";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

type Props = {
  handleClick: () => void;
};

export const DeleteButton: FC<Props> = memo((props) => {
  const { handleClick } = props;
  return (
    <IconButton
      aria-label="delete"
      icon={<DeleteIcon />}
      w="4rem"
      onClick={handleClick}
    >
      delete
    </IconButton>
  );
});
