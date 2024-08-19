import {memo} from "react";
import {TodoRecord} from '../molecules/TodoRecord';

type TodoListType = {
    todos: Array<{id: number, text: string, completed: boolean}>;
    onTextChange: (id: number, newText: string) => void;
    onToggle: (id: number) => void;
}

export const TodoList = memo((props: TodoListType) => {
    console.log("=== TodoList rendered ===");
    const {todos, onTextChange, onToggle} = props;
    return (
        <div>
            {todos.map(todo => (
                <TodoRecord
                    key={todo.id}
                    todo={todo}
                    onTextChange={onTextChange}
                    onToggle={onToggle}
                />
            ))}
        </div>
    )
});

