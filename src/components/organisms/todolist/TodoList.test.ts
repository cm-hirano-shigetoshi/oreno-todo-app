import { Todo } from "../../../logic/Todo";
import { stopAllTodos } from "./TodoList";

test("stopAllTodos", () => {
  const todos: Todo[] = [
    {
      id: "2024-01-01 00:00:00",
      order: "",
      summary: "summary",
      taskcode: "taskcode",
      estimate: "",
      times: [],
      memo: "hoge",
      created: "2024-01-01 00:00:00",
      updated: "2024-01-01 00:00:00",
      done: "",
    },
    {
      id: "2024-01-01 00:00:00",
      order: "",
      summary: "summary",
      taskcode: "taskcode",
      estimate: "",
      times: [
        { start: "2024-01-01 00:00:00", end: "2024-01-01 00:00:00" },
        { start: "2024-01-01 00:00:00", end: null },
      ],
      memo: "hoge",
      created: "2024-01-01 00:00:00",
      updated: "2024-01-01 00:00:00",
      done: "",
    },
  ];
  expect(stopAllTodos(todos, "2024-01-01 01:00:00")).toStrictEqual([
    {
      id: "2024-01-01 00:00:00",
      order: "",
      summary: "summary",
      taskcode: "taskcode",
      estimate: "",
      times: [],
      memo: "hoge",
      created: "2024-01-01 00:00:00",
      updated: "2024-01-01 00:00:00",
      done: "",
    },
    {
      id: "2024-01-01 00:00:00",
      order: "",
      summary: "summary",
      taskcode: "taskcode",
      estimate: "",
      times: [
        { start: "2024-01-01 00:00:00", end: "2024-01-01 00:00:00" },
        { start: "2024-01-01 00:00:00", end: "2024-01-01 01:00:00" },
      ],
      memo: "hoge",
      created: "2024-01-01 00:00:00",
      updated: "2024-01-01 01:00:00",
      done: "",
    },
  ]);
});
