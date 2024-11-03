import { Todo } from "../logic/Todo";
import { Project, Taskcode } from "../logic/Project";
import { calcDur } from "../utils/Datetime";

export type GoogleCalendarEvent = {
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
  summary: string;
  created: string;
  updated: string;
  eventType?: string;
};

export const concatTaskcodes = (projects: Project[]): Taskcode[] => {
  return projects.reduce((accu, project) => accu.concat(project.taskcodes), []);
};

export const guessTaskcode = (
  event: Partial<GoogleCalendarEvent>,
  projects: Project[]
): string => {
  for (const taskcode of concatTaskcodes(projects)) {
    for (const keyword of taskcode.keywords || []) {
      if (event.summary.includes(keyword)) {
        return taskcode.taskcode;
      }
    }
  }
  return "";
};

const getMeeting = (
  event: Partial<GoogleCalendarEvent>,
  projects: Project[]
): Todo => {
  const taskcode = guessTaskcode(event, projects);
  const newEvent: Todo = {
    id: `MTG ${event.start.dateTime} ${event.created}`,
    order: `MTG ${event.start.dateTime} ${event.created}`,
    summary: event.summary,
    taskcode: taskcode,
    estimate: getEstimate(event.start.dateTime, event.end.dateTime).toString(),
    times: [
      {
        start: getDt(event.start.dateTime),
        end: getDt(event.end.dateTime),
      },
    ],
    memo: "",
    created: getDt(event.created),
    updated: getDt(event.updated),
    done: "",
  };
  return newEvent;
};

const isMeetingEvent = (event: Partial<GoogleCalendarEvent>): boolean => {
  // 勤務場所は除外
  if (event.eventType === "workingLocation") return false;
  // 離席系は除外（休暇は工数につけるので除外しない）
  if (event.summary.startsWith("[離席]")) return false;
  if (event.summary.startsWith("[休憩]")) return false;
  if (event.summary.startsWith("[休日]")) return false;
  // 作業は除外
  if (event.summary.startsWith("[作業]")) return false;
  return true;
};

const filterEvent = (event: Partial<GoogleCalendarEvent>): boolean => {
  if (!isMeetingEvent(event)) return false;
  return true;
};

export const getMeetings = (
  events: Partial<GoogleCalendarEvent>[],
  projects: Project[]
): Todo[] => {
  return events
    .filter((event) => filterEvent(event))
    .map((event) => getMeeting(event, projects));
};

const getDt = (datetime: string): string => {
  return datetime.replace("T", " ").slice(0, 19);
};

const getEstimate = (start: string, end: string): number => {
  return Math.round(calcDur(getDt(start), getDt(end)) / 60);
};