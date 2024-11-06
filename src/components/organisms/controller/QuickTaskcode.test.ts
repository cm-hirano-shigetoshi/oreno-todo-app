import { getSummaryFromId, getTaskcodeFromId } from "./QuickTaskcode";

test("getSummaryFromId", () => {
  expect(getSummaryFromId("PJT 2024-11-06 hogehoge abc")).toStrictEqual(
    "hogehoge"
  );
});

test("getTaskcodeFromId", () => {
  expect(getTaskcodeFromId("PJT 2024-11-06 hogehoge abc")).toStrictEqual("abc");
});
