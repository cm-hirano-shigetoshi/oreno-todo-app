import { TodoType, getTodoType, isDone } from "./Todo";
import { DailyTodo } from "./List";
import { Project } from "./Project";
import { calcDur, now } from "../utils/Datetime";

export type GraphData = Project & {
  time: number;
};

export const accumulateHours = (
  todos: DailyTodo[],
  project: Project
): number => {
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
  todos: DailyTodo[],
  projects: Project[]
): GraphData[] => {
  const graphData = projects.map((project) => {
    return { ...project, time: accumulateHours(todos, project) };
  });
  return graphData;
};
