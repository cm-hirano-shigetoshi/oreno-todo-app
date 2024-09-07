/// <reference path="../../renderer.d.ts" />
import {TodoList} from '../organisms/TodoList';
import {useState, useCallback, useEffect, useRef} from 'react';


export const Page = () => {
    console.log("=== Page rendered ===");
    const [todos, setTodos] = useState([]);
    const isInitialRender = useRef(true);

    useEffect(() => {
        readFile();
    }, []);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
        } else {
            writeFile();
        }
    }, [todos]);

    const readFile = async () => {
        try {
            const content = await window.electronAPI.readFile('/tmp/sample.json');
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
            const content = JSON.stringify(todos, null, 4);
            await window.electronAPI.writeFile('/tmp/sample.json', content);
        } catch (error) {
            console.error(error);
            alert('Failed to save');
        }
    };

    const onOrderChanged = useCallback((id: number, newText: string) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? {...todo, tags: {Date: todo.tags.Date, Order: newText}} : todo
        ));
    }, []);

    const onTextChange = useCallback((id: number, newText: string) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? {...todo, text: newText} : todo
        ));
    }, []);

    const onTaskcodeChanged = useCallback((id: number, newText: string) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? {...todo, taskcode: newText} : todo
        ));
    }, []);

    const onEstimatedMinutesChanged = useCallback((id: number, newText: string) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? {...todo, estimate: newText} : todo
        ));
    }, []);

    const onDoneButtonClicked = useCallback((id: number) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        ));
    }, []);

    const onCommentChanged = useCallback((id: number, newText: string) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? {...todo, comment: newText} : todo
        ));
    }, []);

    const onDeleteButtonClicked = useCallback((id: number) => {
        console.log("=== delete button pushed ===");
        setTodos(prevTodos => prevTodos.filter(todo =>
            todo.id !== id
        ));
    }, []);

    return (
        <div>
            <h1>My Todo List</h1>
            <TodoList todos={todos}
                onOrderChanged={onOrderChanged}
                onTextChange={onTextChange}
                onTaskcodeChanged={onTaskcodeChanged}
                onEstimatedMinutesChanged={onEstimatedMinutesChanged}
                onDoneButtonClicked={onDoneButtonClicked}
                onCommentChanged={onCommentChanged}
                onDeleteButtonClicked={onDeleteButtonClicked}
            />
        </div>
    );
}
