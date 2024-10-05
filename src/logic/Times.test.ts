import { recordTime } from "./Times";

test("recordTime", () => {
  expect(recordTime([], "2024-04-01 11:00:00")).toStrictEqual([
    { start: "2024-04-01 11:00:00", end: null },
  ]);
});
