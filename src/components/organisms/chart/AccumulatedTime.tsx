import { memo, FC } from "react";
import { HStack } from "@chakra-ui/react";

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

import { DailyTodo } from "../../../logic/List";
import { Timecard, getWorkingHours } from "../../../logic/Timecard";
import { Project } from "../../../logic/Project";
import { createGraphData } from "../../../logic/AccumulatedTime";

type Props = {
  todos: DailyTodo[];
  projects: Project[];
  timecard: Timecard[];
};

export const AccumulatedTime: FC<Props> = memo((props) => {
  console.log("AccumulatedTime");
  const { todos, projects, timecard } = props;
  const graphData = createGraphData(todos, projects);
  const data = [{ name: "" }];
  for (const x of graphData) {
    data[0] = { ...data[0], [x.projectname || x.projectcode]: x.time };
  }

  return (
    <HStack style={{ width: "100%", height: 80 }} marginBottom={3}>
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
    </HStack>
  );
});
