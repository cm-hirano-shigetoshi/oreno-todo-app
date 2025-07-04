export enum DayOfWeek {
  Sun = "Sun",
  Mon = "Mon",
  Tue = "Tue",
  Wed = "Wed",
  Thu = "Thu",
  Fri = "Fri",
  Sat = "Sat",
}

function toDtString(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours(),
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
    date.getSeconds(),
  ).padStart(2, "0")}`;
}

export function calcDur(start_dt: string, end_dt: string): number {
  const startDate = new Date(start_dt);
  const endDate = new Date(end_dt);
  const diffInMs = endDate.getTime() - startDate.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  return diffInSeconds;
}

export function dt2date(dt: string): string {
  return dt.slice(0, 10);
}

export function addSeconds(dt: string, sec: number): string {
  const [datePart, timePart] = dt.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes, seconds] = timePart.split(":").map(Number);
  const date = new Date(
    // monthは0始まりで扱われる
    Date.UTC(year, month - 1, day, hours, minutes, seconds),
  );
  date.setSeconds(date.getSeconds() + sec);
  return date.toISOString().slice(0, 19).replace("T", " ");
}

export function getDayOfWeek(dt: string): DayOfWeek {
  const date = new Date(dt);
  const dayValues = Object.values(DayOfWeek);
  return dayValues[date.getDay()];
}

export function isWeekDay(dt: string): boolean {
  return ![DayOfWeek.Sat, DayOfWeek.Sun].includes(getDayOfWeek(dt));
}

export function* dateIter(
  startDate: string,
  n: number,
  step = 1,
): Generator<string, void, undefined> {
  if (step === 0) {
    for (let i = 0; i < n; i++) {
      yield startDate;
    }
  } else {
    const currentDate = new Date(startDate);
    for (let i = 0; i < n; i++) {
      const formattedDate = currentDate.toISOString().split("T")[0];
      yield formattedDate;

      currentDate.setDate(currentDate.getDate() + step);
    }
  }
}

export function now(): string {
  return toDtString(new Date());
}
