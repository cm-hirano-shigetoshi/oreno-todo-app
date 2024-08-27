/// <reference path="../../renderer.d.ts" />
import {TodoList} from '../organisms/TodoList';
import {useState, useCallback, useEffect} from 'react';


export const Page = () => {
    console.log("=== Page rendered ===");
    const [todos, setTodos] = useState([
        {id: 1, text: 'reactの勉強', completed: false},
        {id: 2, text: 'todoアプリを作る', completed: false},
    ]);

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

    const updateTodoText = useCallback((id: number, newText: string) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? {...todo, text: newText} : todo
        ));
    }, []);

    const toggleComplete = useCallback((id: number) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        ));
    }, []);

    return (
        <div>
            <h1>My Todo List</h1>
            <TodoList todos={todos} onTextChange={updateTodoText} onToggle={toggleComplete} />
        </div>
    );
}
