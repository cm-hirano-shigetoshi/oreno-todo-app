import { getProjectsByDate, getProjectByTaskcode } from "./Project";

test("getProjectsByDate", () => {
  const projects = {
    "2024-11": [
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
    ],
  };
  expect(getProjectsByDate(projects, "2024-11-11")).toStrictEqual([
    {
      projectcode: "c",
      projectname: "部門共通",
      color: "orange",
      taskcodes: [{ taskcode: "c230", keywords: ["勉強会"] }],
    },
  ]);
  expect(getProjectsByDate(projects, "2024-10-11")).toStrictEqual([]);
});

test("getProjectByTaskcode", () => {
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
  expect(getProjectByTaskcode(projects, "c230")).toStrictEqual({
    projectcode: "c",
    projectname: "部門共通",
    color: "orange",
    taskcodes: [{ taskcode: "c230", keywords: ["勉強会"] }],
  });
  expect(getProjectByTaskcode(projects, "c231")).toStrictEqual(undefined);
});
