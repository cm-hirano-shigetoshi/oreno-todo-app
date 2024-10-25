import { getAllTaskcodes, getWorkingHours } from "./AccumulatedTime";

test("getAllTaskcodes", () => {
  const projects = {
    projectcode: "XXX",
    color: "red",
    assign: 0.3,
    taskcodes: [
      {
        taskcode: "XXX01",
        keywords: ["XXX01"],
      },
      {
        taskcode: "XXX02",
        keywords: ["XXX02", "XXX021"],
      },
    ],
  };
  expect(getAllTaskcodes(projects)).toStrictEqual(["XXX01", "XXX02"]);
});

test("getWorkingHours", () => {
  expect(getWorkingHours([])).toStrictEqual(8);
  expect(
    getWorkingHours([
      {
        type: "start",
        time: "2024-10-25 09:30:00",
      },
    ])
  ).toStrictEqual(8);
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
