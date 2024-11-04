import { memo, FC } from "react";
import { IconButton } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";

type Props = {
  handleClick: () => void;
};

export const StampingButton: FC<Props> = memo((props) => {
  const { handleClick } = props;
  return (
    <IconButton
      aria-label="stamping"
      icon={<TimeIcon />}
      w="4rem"
      onClick={handleClick}
    >
      start
    </IconButton>
  );
});
