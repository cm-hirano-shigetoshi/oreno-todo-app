import {TodoList} from '../organisms/TodoList';
import {useState, useCallback} from 'react';


export const Page = () => {
    console.log("=== Page rendered ===");
    const [todos, setTodos] = useState([
        {id: 1, text: 'reactの勉強', completed: false},
        {id: 2, text: 'todoアプリを作る', completed: false},
    ]);

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
