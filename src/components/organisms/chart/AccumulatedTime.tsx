import { memo, FC } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

import {
  Todo,
  Project,
  TodoType,
  getTodoType,
  isDone,
} from "../../../logic/Todo";
import { Timecard } from "../../../logic/Timecard";
import { calcDur, now } from "../../../utils/Datetime";

type Props = {
  todos: Partial<Todo>[];
  projects: Project[];
  timecard: Timecard[];
};

export const getAllTaskcodes = (project: Project): string[] => {
  return project.taskcodes.map((tc) => tc.taskcode);
};

const accumulateHours = (todos: Partial<Todo>[], project: Project): number => {
  const timeInSecond = todos
    .filter((todo) => getTodoType(todo) !== TodoType.MTG || isDone(todo))
    .filter((todo) => getAllTaskcodes(project).includes(todo.taskcode))
    .reduce(
      (acc1, todo) =>
        acc1 +
        todo.times
          .filter((time) => time.end)
          .reduce((acc2, time) => acc2 + calcDur(time.start, time.end), 0),
      0
    );
  return Math.round((timeInSecond / 60 / 60) * 100) / 100;
};

export const createGraphData = (
  todos: Partial<Todo>[],
  projects: Project[]
) => {
  const graphData = projects.map((project) => {
    return { ...project, time: accumulateHours(todos, project) };
  });
  return graphData;
};

export const getWorkingHours = (timecard: Timecard[]): number => {
  if (timecard.length === 0) {
    return 8;
  } else if (timecard.length % 2 !== 0) {
    const newTimecard = [...timecard, { type: "end", time: now() }];
    let seconds = 0;
    let start = "";
    for (const tc of newTimecard) {
      if (tc.type === "start") {
        start = tc.time;
      } else {
        seconds += calcDur(start, tc.time);
      }
    }
    return Math.round((seconds / 60 / 60) * 100) / 100;
  } else {
    let seconds = 0;
    let start = "";
    for (const tc of timecard) {
      if (tc.type === "start") {
        start = tc.time;
      } else {
        seconds += calcDur(start, tc.time);
      }
    }
    return Math.round((seconds / 60 / 60) * 100) / 100;
  }
};

export const AccumulatedTime: FC<Props> = memo((props) => {
  const { todos, projects, timecard } = props;
  const graphData = createGraphData(todos, projects);
  const data = [{ name: "" }];
  for (const x of graphData) {
    data[0] = { ...data[0], [x.projectname || x.projectcode]: x.time };
  }

  return (
    <>
      <ResponsiveContainer>
        <BarChart layout="vertical" data={data}>
          <XAxis
            type="number"
            ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend />
          {graphData.map((x) => (
            <Bar
              key={x.projectcode}
              dataKey={x.projectname || x.projectcode}
              stackId="a"
              fill={x.color}
            />
          ))}
          <ReferenceLine
            x={getWorkingHours(timecard)}
            stroke="red"
            strokeWidth={2}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
});
