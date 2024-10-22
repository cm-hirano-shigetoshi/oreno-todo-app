import { Todo } from "./Todo";
import { StatusColor, filterTodo, getTodoColor } from "./List";

test("filterTodo", () => {
  /*
   * 未完了タスク
   */
  const incomplete: Todo = {
    id: "2024-10-16 20:58:14",
    order: "100",
    summary: "新しいタスク",
    taskcode: "c123",
    estimate: "30",
    times: [],
    memo: "",
    created: "2024-10-15 20:58:14",
    updated: "2024-10-16 21:10:27",
    done: "",
  };
  // 登録前日
  expect(filterTodo(incomplete, "2024-10-14")).toStrictEqual(false);
  // 登録当日
  expect(filterTodo(incomplete, "2024-10-15")).toStrictEqual(true);
  // 登録翌日
  expect(filterTodo(incomplete, "2024-10-16")).toStrictEqual(true);

  const complete: Todo = {
    id: "2024-10-16 20:58:14",
    order: "100",
    summary: "新しいタスク",
    taskcode: "c123",
    estimate: "30",
    times: [],
    memo: "",
    created: "2024-10-14 20:58:14",
    updated: "2024-10-16 21:10:27",
    done: "2024-10-16 21:10:27",
  };

  /*
   * 完了タスク
   */
  // 登録前日
  expect(filterTodo(complete, "2024-10-13")).toStrictEqual(false);
  // 登録当日
  expect(filterTodo(complete, "2024-10-14")).toStrictEqual(true);
  // 登録翌日＝完了前日
  expect(filterTodo(complete, "2024-10-15")).toStrictEqual(true);
  // 完了当日
  expect(filterTodo(complete, "2024-10-16")).toStrictEqual(true);
  // 完了翌日
  expect(filterTodo(complete, "2024-10-17")).toStrictEqual(false);
});

test("getTodoColor", () => {
  /*
   * 未完了タスク
   */
  const incomplete: Todo = {
    id: "2024-10-16 20:58:14",
    order: "100",
    summary: "新しいタスク",
    taskcode: "c123",
    estimate: "30",
    times: [],
    memo: "",
    created: "2024-10-15 20:58:14",
    updated: "2024-10-16 21:10:27",
    done: "",
  };
  // 登録当日の当日枠
  expect(
    getTodoColor(incomplete, "2024-10-15", "2024-10-15 00:00:00")
  ).toStrictEqual(StatusColor.NOT_COMPLETED);
  // 登録翌日の当日枠
  expect(
    getTodoColor(incomplete, "2024-10-16", "2024-10-16 00:00:00")
  ).toStrictEqual(StatusColor.NOT_COMPLETED);
  // 登録翌日の前日枠
  expect(
    getTodoColor(incomplete, "2024-10-15", "2024-10-16 00:00:00")
  ).toStrictEqual(StatusColor.EXPIRED);

  /*
   * 実行中タスク
   */
  const running: Todo = {
    id: "2024-10-16 20:58:14",
    order: "100",
    summary: "新しいタスク",
    taskcode: "c123",
    estimate: "30",
    times: [{ start: "2024-10-16 21:10:27", end: null }],
    memo: "",
    created: "2024-10-15 20:58:14",
    updated: "2024-10-16 21:10:27",
    done: "",
  };
  // 登録当日の当日枠
  expect(
    getTodoColor(running, "2024-10-15", "2024-10-15 00:00:00")
  ).toStrictEqual(StatusColor.RUNNING);
  // 登録翌日の当日枠
  expect(
    getTodoColor(running, "2024-10-16", "2024-10-16 00:00:00")
  ).toStrictEqual(StatusColor.RUNNING);
  // 登録翌日の前日枠
  expect(
    getTodoColor(running, "2024-10-15", "2024-10-16 00:00:00")
  ).toStrictEqual(StatusColor.EXPIRED);

  const complete: Todo = {
    id: "2024-10-16 20:58:14",
    order: "100",
    summary: "新しいタスク",
    taskcode: "c123",
    estimate: "30",
    times: [],
    memo: "",
    created: "2024-10-14 20:58:14",
    updated: "2024-10-16 21:10:27",
    done: "2024-10-16 21:10:27",
  };

  /*
   * 完了タスク
   */
  // 登録当日の当日枠
  expect(
    getTodoColor(complete, "2024-10-14", "2024-10-15 00:00:00")
  ).toStrictEqual(StatusColor.EXPIRED);
  // 登録翌日＝完了前日の当日枠
  expect(
    getTodoColor(complete, "2024-10-15", "2024-10-15 00:00:00")
  ).toStrictEqual(StatusColor.COMPLETED);
  // 登録翌日＝完了前日の前日枠
  expect(
    getTodoColor(complete, "2024-10-14", "2024-10-15 00:00:00")
  ).toStrictEqual(StatusColor.COMPLETED);
  // 完了当日の当日枠
  expect(
    getTodoColor(complete, "2024-10-16", "2024-10-16 00:00:00")
  ).toStrictEqual(StatusColor.COMPLETED);
  // 完了当日の前日枠
  expect(
    getTodoColor(complete, "2024-10-15", "2024-10-16 00:00:00")
  ).toStrictEqual(StatusColor.COMPLETED);
});
