import { Todo } from "./Todo";
import { filterTodo } from "./List";

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
