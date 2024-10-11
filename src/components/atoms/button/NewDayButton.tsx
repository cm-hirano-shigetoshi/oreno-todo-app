import { memo, FC } from "react";
import { IconButton } from "@chakra-ui/react";
import { SunIcon } from "@chakra-ui/icons";

type Props = {
  handleClick: () => void;
};

export const NewDayButton: FC<Props> = memo((props) => {
  const { handleClick } = props;
  return (
    <IconButton
      aria-label="delete"
      icon={<SunIcon />}
      w="4rem"
      onClick={handleClick}
    >
      newDay
    </IconButton>
  );
});
