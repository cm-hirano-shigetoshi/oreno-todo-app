import { Timecard, getTimecardByDate, getWorkingHours } from "./Timecard";

test("getTimecardByDate", () => {
  const timecard: { [date: string]: Timecard[] } = {
    "2024-10-18": [
      {
        type: "start",
        time: "2024-10-18 10:59:00",
      },
      {
        type: "end",
        time: "2024-10-18 19:15:00",
      },
    ],
  };
  expect(getTimecardByDate(timecard, "2024-10-18")).toStrictEqual([
    {
      type: "start",
      time: "2024-10-18 10:59:00",
    },
    {
      type: "end",
      time: "2024-10-18 19:15:00",
    },
  ]);
  expect(getTimecardByDate(timecard, "2024-10-19")).toStrictEqual([]);
});

test("getWorkingHours", () => {
  expect(getWorkingHours([])).toStrictEqual(8);
  expect(
    getWorkingHours([
      {
        type: "start",
        time: "2024-10-25 09:30:00",
      },
      {
        type: "end",
        time: "2024-10-25 12:30:00",
      },
    ])
  ).toStrictEqual(3);
});
