import { memo, FC } from "react";
import { IconButton } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

type Props = {
  adjustUnit: number;
  handleClick: () => void;
};

export const AdjustButton: FC<Props> = memo((props) => {
  const { adjustUnit, handleClick } = props;
  return (
    <IconButton
      aria-label="adjust"
      icon={adjustUnit >= 0 ? <ChevronUpIcon /> : <ChevronDownIcon />}
      w="4rem"
      onClick={handleClick}
    >
      adjust
    </IconButton>
  );
});
