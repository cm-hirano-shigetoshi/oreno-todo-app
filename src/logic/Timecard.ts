export type Timecard = {
  type: "start" | "end";
  time: string;
};

export const getTimecardByDate = (
  timecard: { [date: string]: Timecard[] },
  date: string
): Timecard[] => {
  return timecard[date] || [];
};
