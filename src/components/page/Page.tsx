/// <reference path="../../renderer.d.ts" />
import {TodoList} from '../organisms/TodoList';
import {useState, useCallback, useEffect} from 'react';


export const Page = () => {
    console.log("=== Page rendered ===");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        readFile();
    }, []);

    const readFile = async () => {
        try {
            const content = await window.electronAPI.readFile('/tmp/date.txt');
            const j = JSON.parse(content);
            console.log(j);
            setTodos(j);
        } catch (error) {
            console.error('Error reading file:', error);
            //setFileContent('Error reading file');
        }
    };

    const writeFile = async () => {
        try {
            const content = JSON.stringify(todos, null, 2);
            await window.electronAPI.writeFile('/tmp/sample.json', content);
        } catch (error) {
            console.error(error);
            alert('Failed to save');
        }
    };

    const updateTodoText = useCallback((id: number, newText: string) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? {...todo, text: newText} : todo
        ));
    }, []);

    const toggleComplete = useCallback((id: number) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        ));
        writeFile();
    }, []);

    return (
        <div>
            <h1>My Todo List</h1>
            <TodoList todos={todos} onTextChange={updateTodoText} onToggle={toggleComplete} />
        </div>
    );
}
