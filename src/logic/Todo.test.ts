import {
  TodoType,
  createNewTask,
  getTodoType,
  isRunning,
  isDone,
  toggleRunning,
  adjustEndTime,
  complete,
} from "./Todo";

test("createNewTask", () => {
  expect(
    createNewTask("summary", "taskcode", "hoge", "2024-01-01 00:00:00")
  ).toStrictEqual({
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
  });
});

test("getTodoType", () => {
  expect(
    getTodoType({
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
    })
  ).toStrictEqual(TodoType.Task);
  expect(
    getTodoType({
      id: "MTG 2024-10-21T11:00:00+09:00 2023-11-01T08:14:39.000Z",
      order: "MTG 2024-10-21T11:00:00+09:00 2023-11-01T08:14:39.000Z",
      summary: "summary",
      taskcode: "taskcode",
      estimate: "",
      times: [
        {
          start: "2024-10-21 11:00:00",
          end: "2024-10-21 11:30:00",
        },
      ],
      memo: "hoge",
      created: "2024-10-21 11:00:00",
      updated: "2024-10-25 14:28:42",
      done: "2024-10-25 14:28:42",
    })
  ).toStrictEqual(TodoType.MTG);
});

test("isRunning", () => {
  expect(
    isRunning({
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
    })
  ).toStrictEqual(false);
  expect(
    isRunning({
      id: "2024-01-01 00:00:00",
      order: "",
      summary: "summary",
      taskcode: "taskcode",
      estimate: "",
      times: [
        {
          start: "2024-10-21 11:00:00",
          end: null,
        },
      ],
      memo: "hoge",
      created: "2024-01-01 00:00:00",
      updated: "2024-01-01 00:00:00",
      done: "",
    })
  ).toStrictEqual(true);
  expect(
    isRunning({
      id: "2024-01-01 00:00:00",
      order: "",
      summary: "summary",
      taskcode: "taskcode",
      estimate: "",
      times: [
        {
          start: "2024-10-21 11:00:00",
          end: "2024-10-21 11:30:00",
        },
      ],
      memo: "hoge",
      created: "2024-01-01 00:00:00",
      updated: "2024-01-01 00:00:00",
      done: "",
    })
  ).toStrictEqual(false);
});

test("isDone", () => {
  expect(
    isDone({
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
    })
  ).toStrictEqual(false);
  expect(
    isDone({
      id: "2024-01-01 00:00:00",
      order: "",
      summary: "summary",
      taskcode: "taskcode",
      estimate: "",
      times: [],
      memo: "hoge",
      created: "2024-01-01 00:00:00",
      updated: "2024-01-01 00:00:01",
      done: "2024-01-01 00:00:01",
    })
  ).toStrictEqual(true);
});

test("toggleRunning", () => {
  expect(
    toggleRunning(
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
      "2024-01-01 01:00:00"
    )
  ).toStrictEqual({
    id: "2024-01-01 00:00:00",
    order: "",
    summary: "summary",
    taskcode: "taskcode",
    estimate: "",
    times: [{ start: "2024-01-01 01:00:00", end: null }],
    memo: "hoge",
    created: "2024-01-01 00:00:00",
    updated: "2024-01-01 01:00:00",
    done: "",
  });
  expect(
    toggleRunning(
      {
        id: "2024-01-01 00:00:00",
        order: "",
        summary: "summary",
        taskcode: "taskcode",
        estimate: "",
        times: [{ start: "2024-01-01 01:00:00", end: null }],
        memo: "hoge",
        created: "2024-01-01 00:00:00",
        updated: "2024-01-01 01:00:00",
        done: "",
      },
      "2024-01-01 02:00:00"
    )
  ).toStrictEqual({
    id: "2024-01-01 00:00:00",
    order: "",
    summary: "summary",
    taskcode: "taskcode",
    estimate: "",
    times: [{ start: "2024-01-01 01:00:00", end: "2024-01-01 02:00:00" }],
    memo: "hoge",
    created: "2024-01-01 00:00:00",
    updated: "2024-01-01 02:00:00",
    done: "",
  });
});

test("adjustEndTime", () => {
  expect(
    adjustEndTime(
      {
        id: "2024-01-01 00:00:00",
        order: "",
        summary: "summary",
        taskcode: "taskcode",
        estimate: "",
        times: [{ start: "2024-01-01 01:00:00", end: "2024-01-01 02:00:00" }],
        memo: "hoge",
        created: "2024-01-01 00:00:00",
        updated: "2024-01-01 02:00:00",
        done: "",
      },
      5,
      "2024-01-01 03:00:00"
    )
  ).toStrictEqual({
    id: "2024-01-01 00:00:00",
    order: "",
    summary: "summary",
    taskcode: "taskcode",
    estimate: "",
    times: [{ start: "2024-01-01 01:00:00", end: "2024-01-01 02:05:00" }],
    memo: "hoge",
    created: "2024-01-01 00:00:00",
    updated: "2024-01-01 03:00:00",
    done: "",
  });
});

test("complete", () => {
  expect(
    complete(
      {
        id: "2024-01-01 00:00:00",
        order: "",
        summary: "summary",
        taskcode: "taskcode",
        estimate: "",
        times: [{ start: "2024-01-01 01:00:00", end: null }],
        memo: "hoge",
        created: "2024-01-01 00:00:00",
        updated: "2024-01-01 01:00:00",
        done: "",
      },
      "2024-01-01 02:00:00"
    )
  ).toStrictEqual({
    id: "2024-01-01 00:00:00",
    order: "",
    summary: "summary",
    taskcode: "taskcode",
    estimate: "",
    times: [{ start: "2024-01-01 01:00:00", end: "2024-01-01 02:00:00" }],
    memo: "hoge",
    created: "2024-01-01 00:00:00",
    updated: "2024-01-01 02:00:00",
    done: "2024-01-01 02:00:00",
  });
  expect(
    complete(
      {
        id: "2024-01-01 00:00:00",
        order: "",
        summary: "summary",
        taskcode: "taskcode",
        estimate: "",
        times: [{ start: "2024-01-01 01:00:00", end: "2024-01-01 02:00:00" }],
        memo: "hoge",
        created: "2024-01-01 00:00:00",
        updated: "2024-01-01 02:00:00",
        done: "2024-01-01 02:00:00",
      },
      "2024-01-01 03:00:00"
    )
  ).toStrictEqual({
    id: "2024-01-01 00:00:00",
    order: "",
    summary: "summary",
    taskcode: "taskcode",
    estimate: "",
    times: [{ start: "2024-01-01 01:00:00", end: "2024-01-01 02:00:00" }],
    memo: "hoge",
    created: "2024-01-01 00:00:00",
    updated: "2024-01-01 03:00:00",
    done: "",
  });
});
