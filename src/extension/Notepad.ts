import { Todo } from "../logic/Todo";
import { now, dt2date } from "../utils/Datetime";

const getContent = async (date: string): Promise<string> => {
  return await window.electronAPI.readFile(`${date}.md`);
};

const getCanonicalId = (id: string): string => {
  return id.replace(/ /g, "_");
};
const getHeadingString = (todo: Todo): string => {
  return `- ## [${todo.summary}](${getCanonicalId(todo.id)}) #${todo.taskcode}`;
};

const addHeading = (prevContent: string, todo: Todo): string => {
  if (prevContent.length !== 0) {
    while (prevContent.slice(-2) !== "\n\n") {
      prevContent += "\n";
    }
  }
  return prevContent + getHeadingString(todo) + "\n\t- ";
};

const saveContent = async (date: string, content: string) => {
  await window.electronAPI.writeFile(`${date}.md`, content);
};

export const notepad = async (todo: Todo | undefined) => {
  if (todo === undefined) return;
  const date = dt2date(now());
  const prevContent = await getContent(date);
  let newContent: string;
  if (prevContent.includes(getCanonicalId(todo.id))) {
    newContent = prevContent
      .split("\n")
      .map((line) => (line.includes(todo.id) ? getHeadingString(todo) : line))
      .join("\n");
  } else {
    newContent = addHeading(prevContent, todo);
  }
  await saveContent(date, newContent);
};
