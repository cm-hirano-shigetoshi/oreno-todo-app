import { getTaskcodeFromId } from "./QuickTaskcode";

test("getTaskcodeFromId", () => {
  expect(getTaskcodeFromId("PJT 2024-11-06 abc")).toStrictEqual("abc");
});
