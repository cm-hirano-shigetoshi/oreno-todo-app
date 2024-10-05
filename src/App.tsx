import { useState, useEffect, useRef } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme/theme";
import { useDebounce } from "./utils/Hooks";
import { startButtonClick } from "./logic/Times";

import { HeaderLayout } from "./components/templates/HeaderLayout";
import { Todo, TodoItem } from "./components/organisms/todo/TodoItem";

function App() {
  const JSON_FILE = "/tmp/sample.json";
  const [todos, setTodos] = useState<Todo[]>([]);
  const debouncedTodos = useDebounce(todos, 500);
  const prevTodosRef = useRef<Todo[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await window.electronAPI.readFile(JSON_FILE);
      setTodos(JSON.parse(data));
    };
    fetchData();
  }, []);

  const handleInputChange = (attrib: string, id: string, newText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, [attrib]: newText } : todo
      )
    );
  };

  const handleStartButtonClick = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, times: startButtonClick(todo.times) } : todo
      )
    );
  };

  const handleDoneButtonClick = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleDeleteButtonClick = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    const saveData = async (content: string) => {
      await window.electronAPI.writeFile(JSON_FILE, content);
    };

    const prevTodos = prevTodosRef.current;
    if (prevTodos && prevTodos !== debouncedTodos) {
      saveData(JSON.stringify(debouncedTodos, null, "  "));
    }
    prevTodosRef.current = debouncedTodos;
  }, [debouncedTodos]);

  return (
    <>
      <ChakraProvider theme={theme}>
        <HeaderLayout>
          {todos
            .sort((a, b) => Number(a.order) - Number(b.order))
            .map((todo: Todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  handleInputChange={handleInputChange}
                  handleStartButtonClick={handleStartButtonClick}
                  handleDoneButtonClick={handleDoneButtonClick}
                  handleDeleteButtonClick={handleDeleteButtonClick}
                />
              );
            })}
        </HeaderLayout>
      </ChakraProvider>
    </>
  );
}

export default App;
