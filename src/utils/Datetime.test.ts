import { calcDur, now } from "./Datetime";

test("calcDur", () => {
  expect(calcDur("2024-04-01 10:00:00", "2024-04-01 11:00:00")).toStrictEqual(
    3600
  );
});

/*
test("now", () => {
  expect(now()).toStrictEqual("2024-10-05 23:53:00");
});
*/
