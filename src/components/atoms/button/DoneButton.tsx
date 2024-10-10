import { memo, FC } from "react";
import { IconButton } from "@chakra-ui/react";
import { CheckIcon, CheckCircleIcon } from "@chakra-ui/icons";

type Props = {
  done: string;
  handleClick: () => void;
};

export const DoneButton: FC<Props> = memo((props) => {
  const { done, handleClick } = props;
  return (
    <IconButton
      aria-label="done"
      icon={done === "" ? <CheckCircleIcon /> : <CheckIcon />}
      w="4rem"
      onClick={handleClick}
    ></IconButton>
  );
});
