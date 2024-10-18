import { TimeType } from "../logic/Times";
import { calcDur, addSeconds } from "../utils/Datetime";

export type Todo = {
  id: string;
  order: string;
  summary: string;
  taskcode: string;
  estimate: string;
  times: TimeType[];
  memo: string;
  created: string;
  updated: string;
  done: string;
};

export type GoogleCalendarEvent = {
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
  summary: string;
  created: string;
  eventType?: string;
};

export enum TodoType {
  Task = 0,
  MTG = 1,
}

export const getTodoType = (todo: Todo): TodoType => {
  if (todo.id.startsWith("MTG")) return TodoType.MTG;
  return TodoType.Task;
};

export const isRunning = (todo: Todo) => {
  if (todo.times.length === 0) return false;
  if (todo.times[todo.times.length - 1].end === null) return true;
  return false;
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
    id: `MTG ${event.start.dateTime} ${event.created}`,
    order: `MTG ${event.start.dateTime} ${event.created}`,
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
    created: getDt(event.start.dateTime),
    updated: getDt(event.start.dateTime),
    done: "",
  };
  return newEvent;
};

const isWorkingLocation = (event: Partial<GoogleCalendarEvent>): boolean => {
  return event.eventType === "workingLocation";
};

const filterEvent = (event: Partial<GoogleCalendarEvent>): boolean => {
  if (isWorkingLocation(event)) return false;
  return true;
};

export const getMeetings = (events: Partial<GoogleCalendarEvent>[]): Todo[] => {
  return events
    .filter((event) => filterEvent(event))
    .map((event) => getMeeting(event));
};

export const adjustEnd = (times: TimeType[], minutes: number): TimeType[] => {
  if (times.length === 0) return times;
  if (times[times.length - 1].end === null) return times;
  const newTimes = [...times];
  newTimes[newTimes.length - 1].end = addSeconds(
    newTimes[newTimes.length - 1].end,
    minutes * 60
  );
  return newTimes;
};
