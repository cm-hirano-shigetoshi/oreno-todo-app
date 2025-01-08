import {
  getMeetingsWithTaskcode,
  concatTaskcodes,
  guessTaskcode,
  getMeetingUrlFromDescription,
  getMeetingUrlFromHangoutLink,
} from "./GoogleCalendarEvent";

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

test("getMeetingsWithTaskcode", () => {
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
  expect(getMeetingsWithTaskcode([event], [])).toStrictEqual([
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

test("getMeetingUrlFromDescription", () => {
  expect(
    getMeetingUrlFromDescription({
      start: {
        dateTime: "2024-10-11T15:30:00+09:00",
        timeZone: "Asia/Tokyo",
      },
      end: {
        dateTime: "2024-10-11T17:00:00+09:00",
        timeZone: "Asia/Tokyo",
      },
      summary: "定例会議",
      created: "2024-10-10T06:48:17.000Z",
      updated: "2024-10-10T06:48:17.859Z",
      eventType: "default",
    })
  ).toStrictEqual(null);
  expect(
    getMeetingUrlFromDescription({
      start: {
        dateTime: "2024-10-11T15:30:00+09:00",
        timeZone: "Asia/Tokyo",
      },
      end: {
        dateTime: "2024-10-11T17:00:00+09:00",
        timeZone: "Asia/Tokyo",
      },
      summary: "定例会議",
      created: "2024-10-10T06:48:17.000Z",
      updated: "2024-10-10T06:48:17.859Z",
      eventType: "default",
      description:
        "\n\n\n\nZoomでの開催です。\n\n\n議事録: https://example.com/hoge\n\n\n参加 Zoom ミーティング\n\nhttps://hogehoge.zoom.us/j/99999999999?pwd=WUdXaVNKcmMwc2ZBZU4LQVZiSkNKQT80\n\n\n\nミーティング ID: 999 9999 9999\n\nパスコード: 999999\n\n\n\n---\n\n\n\nワンタップ モバイル",
    })
  ).toStrictEqual(
    "https://hogehoge.zoom.us/j/99999999999?pwd=WUdXaVNKcmMwc2ZBZU4LQVZiSkNKQT80"
  );
  expect(
    getMeetingUrlFromDescription({
      start: {
        dateTime: "2024-10-11T15:30:00+09:00",
        timeZone: "Asia/Tokyo",
      },
      end: {
        dateTime: "2024-10-11T17:00:00+09:00",
        timeZone: "Asia/Tokyo",
      },
      summary: "定例会議",
      created: "2024-10-10T06:48:17.000Z",
      updated: "2024-10-10T06:48:17.859Z",
      eventType: "default",
      description:
        '<pre><a href="https://zoom.us/j/99999999999?pwd=dk9ycmVRRTlKZUxSQXI2aHpZY3BnQT09" target="_blank"><u>https://zoom.us/j/99999999999?pwd=dk9ycmVRRTlKZUxSQXI2aHpZY3BnQT09</u></a></pre><ul><li><pre>ミーティングID: 999 9999 9999</pre></li><li><pre>パスコード: 553023</pre></li></ul>はじめてZoomを利用する方は画面の指示に従ってZoomアプリをインストールしてください',
    })
  ).toStrictEqual(
    "https://zoom.us/j/99999999999?pwd=dk9ycmVRRTlKZUxSQXI2aHpZY3BnQT09"
  );
  expect(
    getMeetingUrlFromDescription({
      start: {
        dateTime: "2024-10-11T15:30:00+09:00",
        timeZone: "Asia/Tokyo",
      },
      end: {
        dateTime: "2024-10-11T17:00:00+09:00",
        timeZone: "Asia/Tokyo",
      },
      summary: "定例会議",
      created: "2024-10-10T06:48:17.000Z",
      updated: "2024-10-10T06:48:17.859Z",
      eventType: "default",
      description:
        '参加URLはこちらでです。<br>→ <a href="https://teams.microsoft.com/l/meetup-join/22%3ameeting_OTAyMWI4ZTEtYWNiO00%40thread.v2/0?context=%7b%25Tid%22%4a%22287e8982-cf74-46d1-9ea1-426797c98628%22%2c%22Oid%23%2a%2225b51900-e9f1-4450-9cbc-0f9ccba8cdd9%23%7d">Teams MTG URL（定例会）</a>',
    })
  ).toStrictEqual(
    "https://teams.microsoft.com/l/meetup-join/22%3ameeting_OTAyMWI4ZTEtYWNiO00%40thread.v2/0?context=%7b%25Tid%22%4a%22287e8982-cf74-46d1-9ea1-426797c98628%22%2c%22Oid%23%2a%2225b51900-e9f1-4450-9cbc-0f9ccba8cdd9%23%7d"
  );
});

test("getMeetingUrlFromHangoutLink", () => {
  expect(
    getMeetingUrlFromHangoutLink({
      start: {
        dateTime: "2024-10-11T15:30:00+09:00",
        timeZone: "Asia/Tokyo",
      },
      end: {
        dateTime: "2024-10-11T17:00:00+09:00",
        timeZone: "Asia/Tokyo",
      },
      summary: "定例会議",
      created: "2024-10-10T06:48:17.000Z",
      updated: "2024-10-10T06:48:17.859Z",
      eventType: "default",
      hangoutLink: "https://meet.google.com/xxx-xxxx-xxx",
    })
  ).toStrictEqual("https://meet.google.com/xxx-xxxx-xxx");
});
