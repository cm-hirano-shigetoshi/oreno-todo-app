import { Todo } from "./Todo";
import { Project } from "./Project";
import { createGraphData, accumulateSeconds } from "./AccumulatedTime";

test("createGraphData", () => {
  const todos: Todo[] = [
    {
      id: "2024-01-01 00:00:00",
      order: "",
      summary: "summary",
      taskcode: "c230",
      estimate: "",
      times: [{ start: "2024-01-01 00:00:00", end: "2024-01-01 01:00:00" }],
      memo: "hoge",
      created: "2024-01-01 00:00:00",
      updated: "2024-01-01 01:00:00",
      done: "",
    },
  ];
  const projects = [
    {
      projectcode: "c",
      projectname: "部門共通",
      color: "orange",
      taskcodes: [
        {
          taskcode: "c230",
          keywords: ["勉強会"],
        },
      ],
    },
  ];
  expect(createGraphData(todos, projects)).toStrictEqual([
    {
      projectcode: "c",
      projectname: "部門共通",
      color: "orange",
      taskcodes: [
        {
          taskcode: "c230",
          keywords: ["勉強会"],
        },
      ],
      time: 1,
    },
  ]);
});

test("accumulateSeconds", () => {
  const todos: Todo[] = [
    {
      id: "2024-01-01 00:00:00",
      order: "",
      summary: "summary",
      taskcode: "c230",
      estimate: "",
      times: [{ start: "2024-01-01 00:00:00", end: "2024-01-01 01:00:00" }],
      memo: "hoge",
      created: "2024-01-01 00:00:00",
      updated: "2024-01-01 01:00:00",
      done: "",
    },
  ];
  const project: Project = {
    projectcode: "c",
    projectname: "部門共通",
    color: "orange",
    taskcodes: [
      {
        taskcode: "c230",
        keywords: ["勉強会"],
      },
    ],
  };
  expect(accumulateSeconds(todos, project)).toStrictEqual(3600);
});
