import { memo, FC } from "react";
import { IconButton } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

type Props = {
  handleClick: () => void;
};

export const EnterMeetingButton: FC<Props> = memo((props) => {
  const { handleClick } = props;
  return (
    <IconButton
      aria-label="enter-meeting"
      icon={<ExternalLinkIcon />}
      w="4rem"
      onClick={handleClick}
    >
      delete
    </IconButton>
  );
});
