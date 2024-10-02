import { memo, FC } from "react";
import { IconButton } from "@chakra-ui/react";
import { CheckIcon, CheckCircleIcon } from "@chakra-ui/icons";

type Props = {
  id: string;
  isCompleted: boolean;
  handleDoneButtonClick: (id: string) => void;
};

export const DoneButton: FC<Props> = memo((props) => {
  const { id, isCompleted, handleDoneButtonClick } = props;
  return (
    <IconButton
      aria-label="done"
      icon={isCompleted ? <CheckCircleIcon /> : <CheckIcon />}
      w="4rem"
      onClick={() => handleDoneButtonClick(id)}
    ></IconButton>
  );
});
