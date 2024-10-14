import { TimeType } from "../logic/Times";
import { calcDur } from "../utils/Datetime";

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

export type GoogleCalendarEvent = {
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
  summary: string;
  created: string;
};

export enum TodoType {
  Task = 0,
  MTG = 1,
}

export const getTodoType = (todo: Todo): TodoType => {
  if (todo.id.startsWith("MTG")) return TodoType.MTG;
  return TodoType.Task;
};

export const isDone = (todo: Todo): boolean => {
  return todo.done !== "";
};

const getDt = (datetime: string): string => {
  return datetime.replace("T", " ").slice(0, -6);
};

const getEstimate = (start: string, end: string): number => {
  return Math.round(calcDur(getDt(start), getDt(end)) / 60);
};

const getMeeting = (event: Partial<GoogleCalendarEvent>): Todo => {
  const newEvent: Todo = {
    id: `MTG ${event.start.dateTime}`,
    order: `MTG ${event.start.dateTime}`,
    summary: event.summary,
    taskcode: "",
    estimate: getEstimate(event.start.dateTime, event.end.dateTime).toString(),
    times: [
      {
        start: getDt(event.start.dateTime),
        end: getDt(event.end.dateTime),
      },
    ],
    memo: "",
    registered: getDt(event.start.dateTime),
    done: "",
  };
  return newEvent;
};

export const getMeetings = (events: Partial<GoogleCalendarEvent>[]): Todo[] => {
  return events.map((event) => getMeeting(event));
};
