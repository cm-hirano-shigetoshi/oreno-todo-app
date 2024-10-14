import { TimeType } from "../logic/Times";

export type Todo = {
  id: string;
  order: string;
  summary: string;
  taskcode: string;
  estimate: string;
  times: TimeType[];
  memo: string;
  registered: string;
  done: string;
};

export const getMeetings = (events: any[]) => {
  const event: Todo = {
    id: "2024-10-10 21:58:54",
    order: "100",
    summary: "新しいタスク",
    taskcode: "c123",
    estimate: "30",
    times: [],
    memo: "",
    registered: "2024-10-10 21:58:52",
    done: "",
  };
  return [event];
};
