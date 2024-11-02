import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { ChakraProvider, Stack, HStack, Heading } from "@chakra-ui/react";

import theme from "./theme/theme";
import {
  now,
  dt2date,
  dateIter,
  getDayOfWeek,
  isWeekDay,
} from "./utils/Datetime";
import { getCalendarEvents } from "./utils/Command";
import { useDebounce } from "./utils/Hooks";
import {
  Todo,
  TodoType,
  Project,
  getTodoType,
  getMeetings,
  adjustEnd,
  isRunning,
} from "./logic/Todo";
import { toggleTimer, stopTimer } from "./logic/Times";
import {
  filterTodo,
  compareTodo,
  upsertMeetings,
  getTodoForDate,
} from "./logic/List";
import { Timecard } from "./logic/Timecard";

import { HeaderLayout } from "./components/templates/HeaderLayout";
import { TodoItem } from "./components/organisms/todo/TodoItem";
import { MeetingItem } from "./components/organisms/todo/MeetingItem";
import { NewDayButton } from "./components/atoms/button/NewDayButton";
import { AccumulatedTime } from "./components/organisms/chart/AccumulatedTime";
import { Adjuster } from "./components/organisms/controller/Adjuster";

const getProjects = (projects: { [date: string]: Project[] }, date: string) => {
  const yyyymm = date.slice(0, 7);
  if (yyyymm in projects) {
    return projects[yyyymm];
  } else {
    return [];
  }
};

const getProjectByTaskcode = (
  projects: Project[],
  taskcode: string
): Project => {
  if (projects.length === 0) return null;
  const projectCandidates = projects.filter(
    (project) =>
      project.taskcodes.filter((tc) => {
        return tc.taskcode === taskcode;
      }).length > 0
  );
  if (projectCandidates.length === 0) {
    return null;
  } else if (projectCandidates.length === 1) {
    return projectCandidates[0];
  } else {
    throw new Error("複数プロジェクトに同一taskcodeが存在します");
  }
};

const getTimecard = (
  timecard: { [date: string]: Timecard[] },
  date: string
): Timecard[] => {
  return timecard[date] || [];
};

function App() {
  const SHOWING_DAY_LENGTH = 35;
  const ADJUST_UNIT = 5;
  const [projects, setProjects] = useState<{ [date: string]: Project[] }>({});
  const [timecard, setTimecard] = useState<{ [date: string]: Timecard[] }>({});
  const [todos, setTodos] = useState<Todo[]>([]);
  const debouncedTodos = useDebounce(todos, 500);
  const prevTodosRef = useRef<Todo[]>();

  useEffect(() => {
    window.electronAPI.subscribeAddTask(
      (summary: string, taskcode: string, memo: string) => {
        setTodos((prevTodos) => {
          const current_dt = now();
          const newTodos = [
            ...prevTodos,
            {
              id: current_dt,
              order: "",
              summary: summary,
              taskcode: taskcode,
              estimate: "",
              times: [],
              memo: memo,
              created: current_dt,
              updated: current_dt,
              done: "",
            },
          ];
          return newTodos;
        });
      }
    );
  }, []);

  useEffect(() => {
    window.electronAPI.subscribeStopTodos(() => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          const currentDt = now();
          return isRunning(todo)
            ? {
                ...todo,
                times: stopTimer(todo.times, currentDt),
                updated: currentDt,
              }
            : todo;
        })
      );
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const todoList = await window.electronAPI.readFile("todo_list.json");
      setTodos(JSON.parse(todoList));
      const projects = await window.electronAPI.readFile("project.json");
      setProjects(JSON.parse(projects));
      const timecard = await window.electronAPI.readFile("timecard.json");
      setTimecard(JSON.parse(timecard));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const saveData = async (content: string) => {
      await window.electronAPI.writeFile("todo_list.json", content);
    };

    const prevTodos = prevTodosRef.current;
    if (prevTodos && prevTodos !== debouncedTodos) {
      saveData(JSON.stringify(debouncedTodos, null, "  "));
    }
    prevTodosRef.current = debouncedTodos;
  }, [debouncedTodos]);

  const handleNewDayButtonClick = useCallback(
    async (date: string) => {
      const events_str = await getCalendarEvents(date);
      const meetings = getMeetings(
        JSON.parse(events_str),
        getProjects(projects, date)
      );
      setTodos((prevTodos) => upsertMeetings(prevTodos, meetings));
    },
    [projects]
  );

  const handleInputChange = useCallback(
    (attrib: string, id: string, newText: string) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, [attrib]: newText, updated: now() } : todo
        )
      );
    },
    []
  );

  const handleStartButtonClick = useCallback((id: string) => {
    const currentDt = now();
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              times: toggleTimer(todo.times, currentDt),
              updated: currentDt,
            }
          : isRunning(todo)
          ? {
              ...todo,
              times: stopTimer(todo.times, currentDt),
              updated: currentDt,
            }
          : todo
      )
    );
  }, []);

  const handleAdjustButtonClick = useCallback((id: string, minutes: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, times: adjustEnd(todo.times, minutes), updated: now() }
          : todo
      )
    );
  }, []);

  const handleDoneButtonClick = useCallback((id: string) => {
    const current_dt = now();
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              done: todo.done === "" ? current_dt : "",
              times: stopTimer(todo.times, current_dt),
              updated: now(),
            }
          : todo
      )
    );
  }, []);

  const handleDeleteButtonClick = useCallback((id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const hasProjectGeneral = (todos: Todo[], id: string): boolean => {
    for (const todo of todos) {
      if (todo.id === id) return true;
    }
    return false;
  };
  const createProjectGeneral = (
    todos: Todo[],
    date: string,
    projectcode: string,
    currentDt: string
  ) => {
    const id = `PJT ${date} ${projectcode}`;
    todos.push({
      id: id,
      order: "",
      summary: id,
      taskcode: projectcode,
      estimate: "",
      times: [],
      memo: "",
      created: currentDt,
      updated: currentDt,
      done: "",
    });
  };

  const aaa = (
    todos: Todo[],
    date: string,
    projectcode: string,
    currentDt: string
  ): Todo[] => {
    const id = `PJT ${date} ${projectcode}`;
    if (!hasProjectGeneral(todos, id))
      createProjectGeneral(todos, date, projectcode, currentDt);
    return todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            times: toggleTimer(todo.times, currentDt),
            updated: currentDt,
          }
        : isRunning(todo)
        ? {
            ...todo,
            times: stopTimer(todo.times, currentDt),
            updated: currentDt,
          }
        : todo
    );
  };

  const handleAdjusterButtonClick = useCallback(
    (date: string, projectcode: string) => {
      setTodos((prevTodos) => aaa(prevTodos, date, projectcode, now()));
    },
    []
  );

  const getShowingDays = (renderingDt: string, len: number): string[] => {
    return [...dateIter(dt2date(renderingDt), len, -1)];
  };

  const renderingDt = useMemo(() => now(), []);
  const renderingDays = useMemo(
    () => getShowingDays(renderingDt, SHOWING_DAY_LENGTH),
    []
  );

  return (
    <>
      <ChakraProvider theme={theme}>
        <HeaderLayout>
          {renderingDays
            .filter((date) => isWeekDay(date))
            .map((date) => (
              <>
                <HStack marginBottom={5}>
                  <Heading as="h1">
                    {date} ({getDayOfWeek(date)})
                  </Heading>
                  <NewDayButton
                    handleClick={() => handleNewDayButtonClick(date)}
                  />
                </HStack>
                <HStack style={{ width: "100%", height: 80 }} marginBottom={3}>
                  <AccumulatedTime
                    todos={useMemo(() => getTodoForDate(todos, date), [todos])}
                    projects={useMemo(
                      () => getProjects(projects, date),
                      [projects]
                    )}
                    timecard={useMemo(
                      () => getTimecard(timecard, date),
                      [timecard]
                    )}
                  />
                </HStack>
                <HStack style={{ width: "100%", height: 120 }} marginBottom={3}>
                  <Adjuster
                    date={date}
                    todos={useMemo(() => getTodoForDate(todos, date), [todos])}
                    projects={useMemo(
                      () => getProjects(projects, date),
                      [projects]
                    )}
                    handleClick={handleAdjusterButtonClick}
                  />
                </HStack>
                <Stack marginBottom={10}>
                  {todos
                    .filter((todo) => filterTodo(todo, date))
                    .sort((a, b) => compareTodo(a, b))
                    .map((todo: Todo) => {
                      if (getTodoType(todo) === TodoType.MTG) {
                        return (
                          <MeetingItem
                            key={todo.id}
                            todo={todo}
                            date={date}
                            renderingDt={renderingDt}
                            project={getProjectByTaskcode(
                              getProjects(projects, date),
                              todo.taskcode
                            )}
                            adjustUnit={ADJUST_UNIT}
                            handleInputChange={handleInputChange}
                            handleStartButtonClick={handleStartButtonClick}
                            handleAdjustButtonClick={handleAdjustButtonClick}
                            handleDoneButtonClick={handleDoneButtonClick}
                            handleDeleteButtonClick={handleDeleteButtonClick}
                          />
                        );
                      } else {
                        return (
                          <TodoItem
                            key={todo.id}
                            todo={todo}
                            date={date}
                            renderingDt={renderingDt}
                            project={getProjectByTaskcode(
                              getProjects(projects, date),
                              todo.taskcode
                            )}
                            handleInputChange={handleInputChange}
                            handleStartButtonClick={handleStartButtonClick}
                            handleAdjustButtonClick={handleAdjustButtonClick}
                            handleDoneButtonClick={handleDoneButtonClick}
                            handleDeleteButtonClick={handleDeleteButtonClick}
                          />
                        );
                      }
                    })}
                </Stack>
              </>
            ))}
        </HeaderLayout>
      </ChakraProvider>
    </>
  );
}

export default App;
