import { calcDur } from "../utils/Datetime";

const HESITATION_SECONDS = 10;

export type TimeType = { start: string; end: string };

export function startTimer(times: TimeType[], dt: string): TimeType[] {
  if (times.length === 0 || times[times.length - 1].end !== null) {
    times.push({ start: dt, end: null });
  }
  return times;
}

export function stopTimer(times: TimeType[], dt: string): TimeType[] {
  if (times.length > 0 && times[times.length - 1].end === null) {
    const start = times[times.length - 1].start;
    if (calcDur(start, dt) > HESITATION_SECONDS) {
      times[times.length - 1].end = dt;
    } else {
      times.pop();
    }
  }
  return times;
}

export function toggleTimer(times: TimeType[], dt: string): TimeType[] {
  if (times.length > 0 && times[times.length - 1].end === null) {
    times = stopTimer(times, dt);
  } else {
    times = startTimer(times, dt);
  }
  return times;
}

export function calcElapsedTime(times: TimeType[]): number {
  const durationSecond = times
    .filter((time) => time.end !== null)
    .reduce((acc, time) => acc + calcDur(time["start"], time["end"]), 0);
  return Math.round(durationSecond / 60);
}
