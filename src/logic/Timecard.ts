import { calcDur, now } from "../utils/Datetime";

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

export const getWorkingHours = (timecard: Timecard[]): number => {
  if (timecard.length === 0) {
    return 8;
  } else if (timecard.length % 2 !== 0) {
    const newTimecard = [...timecard, { type: "end", time: now() }];
    let seconds = 0;
    let start = "";
    for (const tc of newTimecard) {
      if (tc.type === "start") {
        start = tc.time;
      } else {
        seconds += calcDur(start, tc.time);
      }
    }
    return Math.round((seconds / 60 / 60) * 100) / 100;
  } else {
    let seconds = 0;
    let start = "";
    for (const tc of timecard) {
      if (tc.type === "start") {
        start = tc.time;
      } else {
        seconds += calcDur(start, tc.time);
      }
    }
    return Math.round((seconds / 60 / 60) * 100) / 100;
  }
};
