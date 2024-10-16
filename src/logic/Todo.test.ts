import { getMeetings } from "./Todo";

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
  expect(getMeetings([event])).toStrictEqual([
    {
      id: "MTG 2024-10-11T15:30:00+09:00 2024-10-10T06:48:17.000Z",
      order: "MTG 2024-10-11T15:30:00+09:00 2024-10-10T06:48:17.000Z",
      summary: "定例会議",
      taskcode: "",
      estimate: "90",
      times: [{ start: "2024-10-11 15:30:00", end: "2024-10-11 17:00:00" }],
      memo: "",
      created: "2024-10-11 15:30:00",
      updated: "2024-10-11 15:30:00",
      done: "",
    },
  ]);
});
