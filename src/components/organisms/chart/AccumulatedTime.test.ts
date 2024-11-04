import { getAllTaskcodes } from "./AccumulatedTime";

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
