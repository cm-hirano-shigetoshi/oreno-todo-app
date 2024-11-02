import {
  TodoType,
  createNewTask,
  getTodoType,
  isRunning,
  isDone,
  getMeetings,
  concatTaskcodes,
  guessTaskcode,
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

test("getMeetings", () => {
  const event = {
    kind: "calendar#event",
    etag: '"3457085795718010"',
    id: "7r0rb14umbvuc141dp6pch3kdn",
    status: "confirmed",
    htmlLink:
      "https://www.google.com/calendar/event?eid=N3IwcmIxNHVtYnZ1YzEzOWRwNnBjaDNrZG5gaGlyYW7vLnNoaWdldG13zaGlAY1xhc3NtZXRob2QuanA",
    created: "2024-10-10T06:48:17.000Z",
    updated: "2024-10-10T06:48:17.859Z",
    summary: "定例会議",
    creator: {
      email: "hoge.fuga@example.com",
      self: true,
    },
    organizer: {
      email: "hoge.fuga@example.com",
      self: true,
    },
    start: {
      dateTime: "2024-10-11T15:30:00+09:00",
      timeZone: "Asia/Tokyo",
    },
    end: {
      dateTime: "2024-10-11T17:00:00+09:00",
      timeZone: "Asia/Tokyo",
    },
    iCalUID: "9r1rb16umbvuc140dp7pch0kdn@google.com",
    sequence: 0,
    guestsCanModify: true,
    reminders: {
      useDefault: true,
    },
    eventType: "default",
  };
  expect(getMeetings([event], [])).toStrictEqual([
    {
      id: "MTG 2024-10-11T15:30:00+09:00 2024-10-10T06:48:17.000Z",
      order: "MTG 2024-10-11T15:30:00+09:00 2024-10-10T06:48:17.000Z",
      summary: "定例会議",
      taskcode: "",
      estimate: "90",
      times: [{ start: "2024-10-11 15:30:00", end: "2024-10-11 17:00:00" }],
      memo: "",
      created: "2024-10-10 06:48:17",
      updated: "2024-10-10 06:48:17",
      done: "",
    },
  ]);
});

test("concatTaskcodes", () => {
  const projects = [
    {
      projectcode: "XXX",
      taskcodes: [
        {
          taskcode: "XXX",
          keywords: ["XXX", "xxx"],
        },
      ],
    },
    {
      projectcode: "XXXY",
      taskcodes: [
        {
          taskcode: "XXXY",
          keywords: ["XXXY", "xxxy"],
        },
      ],
    },
  ];
  expect(concatTaskcodes(projects)).toStrictEqual([
    {
      taskcode: "XXX",
      keywords: ["XXX", "xxx"],
    },
    {
      taskcode: "XXXY",
      keywords: ["XXXY", "xxxy"],
    },
  ]);
});

test("guessTaskcode", () => {
  const projects = [
    {
      projectcode: "XXX",
      taskcodes: [
        {
          taskcode: "XXX",
          keywords: ["XXX", "xxx"],
        },
      ],
    },
    {
      projectcode: "XXXY",
      taskcodes: [
        {
          taskcode: "XXXY",
          keywords: ["XXXY", "xxxy"],
        },
      ],
    },
  ];
  expect(guessTaskcode({ summary: "[XXX] 定例会議" }, projects)).toStrictEqual("XXX"); // prettier-ignore
  expect(guessTaskcode({ summary: "[XXXY] 定例会議" }, projects)).toStrictEqual("XXX"); // prettier-ignore
  expect(guessTaskcode({ summary: "[XXYY] 定例会議" }, projects)).toStrictEqual(""); // prettier-ignore
});
