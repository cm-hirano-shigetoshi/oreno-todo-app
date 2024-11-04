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

import { Todo, TodoType, getTodoType, isDone } from "../../../logic/Todo";
import { Timecard, getWorkingHours } from "../../../logic/Timecard";
import { Project } from "../../../logic/Project";
import { calcDur, now } from "../../../utils/Datetime";

const accumulateHours = (todos: Partial<Todo>[], project: Project): number => {
  const timeInSecond = todos
    .filter((todo) => getTodoType(todo) !== TodoType.MTG || isDone(todo))
    .filter((todo) =>
      project.taskcodes.map((tc) => tc.taskcode).includes(todo.taskcode)
    )
    .reduce(
      (acc1, todo) =>
        acc1 +
        todo.times.reduce(
          (acc2, time) =>
            acc2 + calcDur(time.start, time.end !== null ? time.end : now()),
          0
        ),
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

type Props = {
  todos: Partial<Todo>[];
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
