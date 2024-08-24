import {memo} from "react";
import {TodoInput} from "../atoms/input/TodoInput";
import {DoneButton} from "../atoms/button/DoneButton";


type TodoRecordType = {
    key: number;
    todo: {id: number, text: string, completed: boolean};
    onTextChange: (id: number, newText: string) => void;
    onToggle: (id: number) => void;
}

export const TodoRecord = memo((props: TodoRecordType) => {
    console.log("=== TodoRecord rendered ===");
    const {todo, onTextChange, onToggle} = props;
    return (
        <div>
            <TodoInput value={todo.text} onChange={(newText) => onTextChange(todo.id, newText)} />
            <DoneButton completed={todo.completed} onClick={() => onToggle(todo.id)} />
        </div>
    )
});

