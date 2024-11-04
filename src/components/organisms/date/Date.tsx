import { memo, FC } from "react";
import { HStack, Heading } from "@chakra-ui/react";
import { getDayOfWeek } from "../../../utils/Datetime";
import { NewDayButton } from "../../atoms/button/NewDayButton";

type Props = {
  date: string;
  handleClick: (date: string) => void;
};

export const DateTitle: FC<Props> = memo((props) => {
  const { date, handleClick } = props;
  return (
    <HStack marginBottom={5}>
      <Heading as="h1">
        {date} ({getDayOfWeek(date)})
      </Heading>
      <NewDayButton handleClick={() => handleClick(date)} />
    </HStack>
  );
});
