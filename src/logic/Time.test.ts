import {
  startTimer,
  stopTimer,
  toggleTimer,
  calcElapsedTime,
  adjustEnd,
} from "./Time";

test("startTimer", () => {
  expect(startTimer([], "2024-04-01 02:00:00")).toStrictEqual([
    { start: "2024-04-01 02:00:00", end: null },
  ]);
  expect(
    startTimer(
      [{ start: "2024-04-01 00:00:00", end: null }],
      "2024-04-01 02:00:00"
    )
  ).toStrictEqual([{ start: "2024-04-01 00:00:00", end: null }]);
  expect(
    startTimer(
      [{ start: "2024-04-01 00:00:00", end: "2024-04-01 01:00:00" }],
      "2024-04-01 02:00:00"
    )
  ).toStrictEqual([
    { start: "2024-04-01 00:00:00", end: "2024-04-01 01:00:00" },
    { start: "2024-04-01 02:00:00", end: null },
  ]);
});

test("stopTimer", () => {
  expect(stopTimer([], "2024-04-01 02:00:00")).toStrictEqual([]);
  expect(
    stopTimer(
      [{ start: "2024-04-01 00:00:00", end: null }],
      "2024-04-01 02:00:00"
    )
  ).toStrictEqual([
    { start: "2024-04-01 00:00:00", end: "2024-04-01 02:00:00" },
  ]);
  expect(
    stopTimer(
      [{ start: "2024-04-01 00:00:00", end: "2024-04-01 01:00:00" }],
      "2024-04-01 02:00:00"
    )
  ).toStrictEqual([
    { start: "2024-04-01 00:00:00", end: "2024-04-01 01:00:00" },
  ]);
});

test("toggleTimer", () => {
  expect(toggleTimer([], "2024-04-01 02:00:00")).toStrictEqual([
    { start: "2024-04-01 02:00:00", end: null },
  ]);
  expect(
    toggleTimer(
      [{ start: "2024-04-01 00:00:00", end: null }],
      "2024-04-01 02:00:00"
    )
  ).toStrictEqual([
    { start: "2024-04-01 00:00:00", end: "2024-04-01 02:00:00" },
  ]);
  expect(
    toggleTimer(
      [{ start: "2024-04-01 00:00:00", end: "2024-04-01 01:00:00" }],
      "2024-04-01 02:00:00"
    )
  ).toStrictEqual([
    { start: "2024-04-01 00:00:00", end: "2024-04-01 01:00:00" },
    { start: "2024-04-01 02:00:00", end: null },
  ]);
});

test("calcElapsedTime", () => {
  expect(calcElapsedTime([])).toStrictEqual(0);
  expect(
    calcElapsedTime([{ start: "2024-04-01 00:00:00", end: null }])
  ).toStrictEqual(0);
  expect(
    calcElapsedTime([
      { start: "2024-04-01 00:00:00", end: "2024-04-01 01:00:00" },
    ])
  ).toStrictEqual(60);
});

test("adjustEnd", () => {
  expect(adjustEnd([], 1)).toStrictEqual([]);
  expect(
    adjustEnd([{ start: "2024-04-01 00:00:00", end: null }], 1)
  ).toStrictEqual([{ start: "2024-04-01 00:00:00", end: null }]);
  expect(
    adjustEnd([{ start: "2024-04-01 00:00:00", end: "2024-04-01 01:00:00" }], 1)
  ).toStrictEqual([
    { start: "2024-04-01 00:00:00", end: "2024-04-01 01:01:00" },
  ]);
  expect(
    adjustEnd(
      [{ start: "2024-04-01 00:00:00", end: "2024-04-01 01:00:00" }],
      -1
    )
  ).toStrictEqual([
    { start: "2024-04-01 00:00:00", end: "2024-04-01 00:59:00" },
  ]);
});
