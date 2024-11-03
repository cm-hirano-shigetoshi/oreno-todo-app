import { memo, FC } from "react";
import { Badge } from "@chakra-ui/react";

import { TimeType, calcElapsedTime } from "../../../logic/Time";

type Props = {
  times: TimeType[];
};

export const ElapsedTime: FC<Props> = memo((props) => {
  const { times } = props;
  return <Badge w="2rem">{calcElapsedTime(times)}</Badge>;
});
