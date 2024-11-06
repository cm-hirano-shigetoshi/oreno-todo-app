import { Todo } from "./Todo";
import { StatusColor, filterTodo, getTodoColor, getTodoByDate } from "./List";

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
   * 10/16完了タスク
   */
  // 10/16
  // 10/16に登録
  expect(
    getTodoColor(complete, "2024-10-16", "2024-10-16 00:00:00")
  ).toStrictEqual(StatusColor.COMPLETED);
  // 10/15に登録
  expect(
    getTodoColor(complete, "2024-10-15", "2024-10-16 00:00:00")
  ).toStrictEqual(StatusColor.EXPIRED);

  // 10/17
  // 10/16に登録
  expect(
    getTodoColor(complete, "2024-10-16", "2024-10-17 00:00:00")
  ).toStrictEqual(StatusColor.COMPLETED);
  // 10/15に登録
  expect(
    getTodoColor(complete, "2024-10-15", "2024-10-17 00:00:00")
  ).toStrictEqual(StatusColor.EXPIRED);
});

test("getTodoByDate", () => {
  const todos = [
    {
      id: "2024-10-21 00:00:02",
      order: " 5",
      summary: "あれやる",
      taskcode: "XXX",
      estimate: "",
      times: [
        {
          start: "2024-10-17 13:04:52",
          end: "2024-10-17 13:49:57",
        },
        {
          start: "2024-10-17 13:50:52",
          end: "2024-10-17 13:52:57",
        },
        {
          start: "2024-10-18 17:33:40",
          end: "2024-10-18 17:56:24",
        },
      ],
      memo: "",
      created: "2024-10-16 09:00:02",
      updated: "2024-10-18 17:56:24",
      done: "2024-10-18 17:56:24",
    },
  ];
  const expected = [
    {
      id: "2024-10-21 00:00:02",
      taskcode: "XXX",
      times: [
        {
          start: "2024-10-17 13:04:52",
          end: "2024-10-17 13:49:57",
        },
        {
          start: "2024-10-17 13:50:52",
          end: "2024-10-17 13:52:57",
        },
      ],
      done: "2024-10-18 17:56:24",
    },
  ];
  expect(getTodoByDate(todos, "2024-10-17")).toStrictEqual(expected);
});
