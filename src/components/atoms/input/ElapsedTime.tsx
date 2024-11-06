import { memo, FC } from "react";
import { Badge } from "@chakra-ui/react";

type Props = {
  minutes: number;
};

export const ElapsedTime: FC<Props> = memo((props) => {
  const { minutes } = props;
  return <Badge w="2rem">{minutes}</Badge>;
});
