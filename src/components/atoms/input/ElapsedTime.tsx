import { memo, FC } from "react";
import { Input } from "@chakra-ui/react";

import { TimeType, calcElapsedTime } from "../../../logic/Times";

type Props = {
  times: TimeType[];
};

export const ElapsedTime: FC<Props> = memo((props) => {
  const { times } = props;
  return <Input px={2} w="4rem" value={calcElapsedTime(times).toString()} />;
});
