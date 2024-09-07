import {TodoRecord, TodoType} from '../molecules/TodoRecord';


type TodoListType = {
    todos: Array<TodoType>;
    onOrderChanged: (id: number, newText: string) => void;
    onTextChange: (id: number, newText: string) => void;
    onTaskcodeChanged: (id: number, newText: string) => void;
    onEstimatedMinutesChanged: (id: number, newText: string) => void;
    onDoneButtonClicked: (id: number) => void;
    onCommentChanged: (id: number, newText: string) => void;
    onDeleteButtonClicked: (id: number) => void;
}

export const TodoList = (props: TodoListType) => {
    console.log("=== TodoList rendered ===");
    const {todos,
        onOrderChanged,
        onTextChange,
        onTaskcodeChanged,
        onEstimatedMinutesChanged,
        onDoneButtonClicked,
        onCommentChanged,
        onDeleteButtonClicked} = props;
    return (
        <div>
            {todos.map(todo => (
                <TodoRecord
                    key={todo.id}
                    todo={todo}
                    onOrderChanged={onOrderChanged}
                    onTextChange={onTextChange}
                    onTaskcodeChanged={onTaskcodeChanged}
                    onEstimatedMinutesChanged={onEstimatedMinutesChanged}
                    onDoneButtonClicked={onDoneButtonClicked}
                    onCommentChanged={onCommentChanged}
                    onDeleteButtonClicked={onDeleteButtonClicked}
                />
            ))}
        </div>
    )
}

