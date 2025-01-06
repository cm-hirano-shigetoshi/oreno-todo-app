import { Todo } from "../../../logic/Todo";
import { stopAllTodos, upsertMeetings } from "./TodoList";

test("stopAllTodos", () => {
  expect(
    stopAllTodos(
      [
        {
          id: "2024-01-01 00:00:00",
          order: "",
          summary: "summary",
          taskcode: "taskcode",
          tags: "tags",
          estimate: "",
          times: [],
          memo: "hoge",
          created: "2024-01-01 00:00:00",
          updated: "2024-01-01 00:00:00",
          done: "",
        },
        {
          id: "2024-01-01 00:00:01",
          order: "",
          summary: "summary",
          taskcode: "taskcode",
          tags: "tags",
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
      ],
      "2024-01-01 01:00:00"
    )
  ).toStrictEqual([
    {
      id: "2024-01-01 00:00:00",
      order: "",
      summary: "summary",
      taskcode: "taskcode",
      tags: "tags",
      estimate: "",
      times: [],
      memo: "hoge",
      created: "2024-01-01 00:00:00",
      updated: "2024-01-01 00:00:00",
      done: "",
    },
    {
      id: "2024-01-01 00:00:01",
      order: "",
      summary: "summary",
      taskcode: "taskcode",
      tags: "tags",
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
  expect(
    stopAllTodos(
      [
        {
          id: "2024-01-01 00:00:01",
          order: "",
          summary: "summary",
          taskcode: "taskcode",
          tags: "tags",
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
      ],
      "2024-01-01 01:00:00",
      ["2024-01-01 00:00:01"]
    )
  ).toStrictEqual([
    {
      id: "2024-01-01 00:00:01",
      order: "",
      summary: "summary",
      taskcode: "taskcode",
      tags: "tags",
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
  ]);
});

test("upsertMeetings", () => {
  const todos: Todo[] = [
    {
      id: "MTG 2024-10-21T15:30:00+09:00 2024-10-18T06:02:07.000Z",
      order: "MTG 2024-10-21T15:30:00+09:00 2024-10-18T06:02:07.000Z",
      summary: "summary",
      taskcode: "taskcode",
      tags: "tags",
      estimate: "60",
      times: [
        {
          start: "2024-10-21 15:30:00",
          end: "2024-10-21 16:30:00",
        },
      ],
      memo: "hoge",
      created: "2024-10-21 15:30:00",
      updated: "2024-10-21 16:00:00",
      done: "",
    },
    {
      id: "MTG 2024-10-21T16:30:00+09:00 2024-10-18T06:02:07.000Z",
      order: "MTG 2024-10-21T16:30:00+09:00 2024-10-18T06:02:07.000Z",
      summary: "summary",
      taskcode: "taskcode",
      tags: "tags",
      estimate: "60",
      times: [
        {
          start: "2024-10-21 16:30:00",
          end: "2024-10-21 17:30:00",
        },
      ],
      memo: "hoge",
      created: "2024-10-21 16:30:00",
      updated: "2024-10-21 16:30:00",
      done: "",
    },
  ];
  const meetings: Todo[] = [
    {
      id: "MTG 2024-10-21T15:30:00+09:00 2024-10-18T06:02:07.000Z",
      order: "MTG 2024-10-21T15:30:00+09:00 2024-10-18T06:02:07.000Z",
      summary: "summary",
      taskcode: "taskcode",
      tags: "tags",
      estimate: "60",
      times: [
        {
          start: "2024-10-21 15:30:00",
          end: "2024-10-21 16:30:00",
        },
      ],
      memo: "",
      created: "2024-10-21 15:30:00",
      updated: "2024-10-21 15:30:00",
      done: "",
    },
    {
      id: "MTG 2024-10-21T16:30:00+09:00 2024-10-18T06:02:07.000Z",
      order: "MTG 2024-10-21T16:30:00+09:00 2024-10-18T06:02:07.000Z",
      summary: "summary changed",
      taskcode: "taskcode",
      tags: "tags",
      estimate: "60",
      times: [
        {
          start: "2024-10-21 16:30:00",
          end: "2024-10-21 17:30:00",
        },
      ],
      memo: "hoge",
      created: "2024-10-21 16:30:00",
      updated: "2024-10-21 16:40:00",
      done: "",
    },
  ];
  expect(upsertMeetings(todos, meetings)).toStrictEqual([
    // memoが手動更新されているので、todo側を残す
    {
      id: "MTG 2024-10-21T15:30:00+09:00 2024-10-18T06:02:07.000Z",
      order: "MTG 2024-10-21T15:30:00+09:00 2024-10-18T06:02:07.000Z",
      summary: "summary",
      taskcode: "taskcode",
      tags: "tags",
      estimate: "60",
      times: [
        {
          start: "2024-10-21 15:30:00",
          end: "2024-10-21 16:30:00",
        },
      ],
      memo: "hoge",
      created: "2024-10-21 15:30:00",
      updated: "2024-10-21 16:00:00",
      done: "",
    },
    // カレンダー側でsummaryを変更しているので、meeting側を残す
    {
      id: "MTG 2024-10-21T16:30:00+09:00 2024-10-18T06:02:07.000Z",
      order: "MTG 2024-10-21T16:30:00+09:00 2024-10-18T06:02:07.000Z",
      summary: "summary changed",
      taskcode: "taskcode",
      tags: "tags",
      estimate: "60",
      times: [
        {
          start: "2024-10-21 16:30:00",
          end: "2024-10-21 17:30:00",
        },
      ],
      memo: "hoge",
      created: "2024-10-21 16:30:00",
      updated: "2024-10-21 16:40:00",
      done: "",
    },
  ]);
});
