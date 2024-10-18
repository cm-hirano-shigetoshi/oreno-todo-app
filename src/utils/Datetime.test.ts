import { calcDur, dt2date, addSeconds } from "./Datetime";

test("calcDur", () => {
  expect(calcDur("2024-04-01 10:00:00", "2024-04-01 11:00:00")).toStrictEqual(
    3600
  );
});

test("dt2date", () => {
  expect(dt2date("2024-01-01 00:00:00")).toStrictEqual("2024-01-01");
});

test("addSeconds", () => {
  expect(addSeconds("2024-01-01 00:00:10", 10)).toStrictEqual(
    "2024-01-01 00:00:20"
  );
  expect(addSeconds("2024-01-01 00:00:10", -10)).toStrictEqual(
    "2024-01-01 00:00:00"
  );
  expect(addSeconds("2024-01-01 00:00:10", 60)).toStrictEqual(
    "2024-01-01 00:01:10"
  );
  expect(addSeconds("2024-01-01 23:59:10", 60)).toStrictEqual(
    "2024-01-02 00:00:10"
  );
  expect(addSeconds("2024-01-31 23:59:10", 60)).toStrictEqual(
    "2024-02-01 00:00:10"
  );
  expect(addSeconds("2024-12-31 23:59:10", 60)).toStrictEqual(
    "2025-01-01 00:00:10"
  );
});
