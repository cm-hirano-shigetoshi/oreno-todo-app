import { calcDur, addSeconds } from "../utils/Datetime";

const HESITATION_SECONDS = 10;

export type Time = { start: string; end: string };

export const startTimer = (times: Time[], dt: string): Time[] => {
  if (times.length === 0 || times[times.length - 1].end !== null) {
    times.push({ start: dt, end: null });
  }
  return times;
};

export const stopTimer = (
  times: Time[],
  dt: string,
  hesitate = false,
): Time[] => {
  if (times.length > 0 && times[times.length - 1].end === null) {
    const start = times[times.length - 1].start;
    if (!hesitate || calcDur(start, dt) > HESITATION_SECONDS) {
      times[times.length - 1].end = dt;
    } else {
      times.pop();
    }
  }
  return times;
};

export const toggleTimer = (times: Time[], dt: string): Time[] => {
  if (times.length > 0 && times[times.length - 1].end === null) {
    times = stopTimer(times, dt, true);
  } else {
    times = startTimer(times, dt);
  }
  return times;
};

export const calcElapsedTime = (times: Time[]): number => {
  const durationSecond = times
    .filter((time) => time.end !== null)
    .reduce((acc, time) => acc + calcDur(time["start"], time["end"]), 0);
  return Math.round(durationSecond / 60);
};

export const adjustEnd = (times: Time[], minutes: number): Time[] => {
  if (times.length === 0) return times;
  if (times[times.length - 1].end === null) return times;
  const newTimes = JSON.parse(JSON.stringify(times));
  newTimes[newTimes.length - 1].end = addSeconds(
    newTimes[newTimes.length - 1].end,
    minutes * 60,
  );
  return calcElapsedTime([newTimes[newTimes.length - 1]]) >= 0
    ? newTimes
    : times;
};
