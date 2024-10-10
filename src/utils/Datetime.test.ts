import { calcDur, dt2date } from "./Datetime";

test("calcDur", () => {
  expect(calcDur("2024-04-01 10:00:00", "2024-04-01 11:00:00")).toStrictEqual(
    3600
  );
});

test("dt2date", () => {
  expect(dt2date("2024-01-01 00:00:00") === "2024-01-01");
});
