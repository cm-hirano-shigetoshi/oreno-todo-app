import { toggleTimer } from "./Times";

test("recordTime", () => {
  expect(toggleTimer([], "2024-04-01 11:00:00")).toStrictEqual([
    { start: "2024-04-01 11:00:00", end: null },
  ]);
});
