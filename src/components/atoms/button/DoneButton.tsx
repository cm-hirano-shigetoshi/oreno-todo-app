import { memo, FC } from "react";
import { IconButton } from "@chakra-ui/react";
import { CheckIcon, CheckCircleIcon } from "@chakra-ui/icons";

type Props = {
  isCompleted: boolean;
  handleClick: () => void;
};

export const DoneButton: FC<Props> = memo((props) => {
  const { isCompleted, handleClick } = props;
  return (
    <IconButton
      aria-label="done"
      icon={isCompleted ? <CheckCircleIcon /> : <CheckIcon />}
      w="4rem"
      onClick={handleClick}
    ></IconButton>
  );
});
