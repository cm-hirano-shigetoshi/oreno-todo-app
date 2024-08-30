import {TodoRecord, TodoType} from '../molecules/TodoRecord';


type TodoListType = {
    todos: Array<TodoType>;
    onTextChange: (id: number, newText: string) => void;
    onToggle: (id: number) => void;
}

export const TodoList = (props: TodoListType) => {
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
}

