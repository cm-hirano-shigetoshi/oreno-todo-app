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

type Props = {
  todos: Partial<Todo>[];
  projects: { [date: string]: Project[] };
};

const createGraphData = (
  todos: Partial<Todo>[],
  projects: { [date: string]: Project[] }
) => {
  const graphData = [
    { taskcode: "uuu", color: "red", time: 3 },
    { taskcode: "sss", color: "green", time: 2 },
    { taskcode: "hhh", color: "pink", time: 1 },
  ];
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
  );
});
