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

import { Todo, Project } from "../../../logic/Todo";
import { calcDur } from "../../../utils/Datetime";

type Props = {
  todos: Partial<Todo>[];
  projects: Project[];
};

const accumulateHours = (todos: Partial<Todo>[], taskcode: string): number => {
  const timeInSecond = todos
    .filter((todo) => todo.taskcode === taskcode)
    .reduce(
      (acc1, todo) =>
        acc1 +
        todo.times
          .filter((time) => time.end)
          .reduce((acc2, time) => acc2 + calcDur(time.start, time.end), 0),
      0
    );
  return timeInSecond / 60 / 60;
};

export const createGraphData = (
  todos: Partial<Todo>[],
  projects: Project[]
) => {
  console.log(projects);
  const graphData = projects.map((project) => {
    return { ...project, time: accumulateHours(todos, project.taskcode) };
  });
  return graphData;
};

export const AccumulatedTime: FC<Props> = memo((props) => {
  const { todos, projects } = props;
  const graphData = createGraphData(todos, projects);
  const data = [{ name: "" }];
  for (const x of graphData) {
    data[0] = { ...data[0], [x.taskcode]: x.time };
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
            <Bar dataKey={x.taskcode} stackId="a" fill={x.color} />
          ))}
          <ReferenceLine x={8} stroke="red" strokeWidth={2} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
});
