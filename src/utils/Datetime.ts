function toDtString(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
    date.getSeconds()
  ).padStart(2, "0")}`;
}

export function calcDur(start_dt: string, end_dt: string) {
  const startDate = new Date(start_dt);
  const endDate = new Date(end_dt);
  const diffInMs = endDate.getTime() - startDate.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  return diffInSeconds;
}

export function now(): string {
  return toDtString(new Date());
}
