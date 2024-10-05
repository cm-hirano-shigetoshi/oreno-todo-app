import { calcDur, now } from "../utils/Datetime";

export type TimeType = { start: string; end: string };

export function recordTime(times: TimeType[], dt: string): TimeType[] {
  if (times.length === 0) {
    times.push({ start: dt, end: null });
  } else {
    if (times[times.length - 1].end === null) {
      times[times.length - 1].end = dt;
    } else {
      times.push({ start: dt, end: null });
    }
  }
  return times;
}

export function startButtonClick(times: TimeType[]): TimeType[] {
  return recordTime(times, now());
}

export function calcElapsedTime(times: TimeType[]): number {
  const durationSecond = times
    .filter((time) => time.end !== null)
    .reduce((acc, time) => acc + calcDur(time["start"], time["end"]), 0);
  return Math.round(durationSecond / 60);
}
