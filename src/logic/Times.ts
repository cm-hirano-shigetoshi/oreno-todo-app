import { calcDur } from "../utils/Datetime";

const HESITATION_SECONDS = 10;

export type TimeType = { start: string; end: string };

function startTimer(times: TimeType[], dt: string): void {
  times.push({ start: dt, end: null });
}

function stopTimer(times: TimeType[], dt: string): void {
  const start = times[times.length - 1].start;
  if (calcDur(start, dt) > HESITATION_SECONDS) {
    times[times.length - 1].end = dt;
  } else {
    times.pop();
  }
}

export function toggleTimer(times: TimeType[], dt: string): TimeType[] {
  if (times.length > 0 && times[times.length - 1].end === null) {
    stopTimer(times, dt);
  } else {
    startTimer(times, dt);
  }
  return times;
}

export function calcElapsedTime(times: TimeType[]): number {
  const durationSecond = times
    .filter((time) => time.end !== null)
    .reduce((acc, time) => acc + calcDur(time["start"], time["end"]), 0);
  return Math.round(durationSecond / 60);
}
