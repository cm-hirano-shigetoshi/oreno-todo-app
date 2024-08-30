import {memo} from "react";
import {TodoOrder} from "../atoms/input/TodoOrder";
import {TodoInput} from "../atoms/input/TodoInput";
import {TodoTaskcode} from "../atoms/input/TodoTaskcode";
import {TodoEstimate} from "../atoms/input/TodoEstimate";
import {EstimatedMinutes, TimesType} from "../atoms/input/EstimatedMinutes";
import {DoneButton} from "../atoms/button/DoneButton";
import {TodoComment} from "../atoms/input/TodoComment";
import { DeleteButton } from "../atoms/button/DeleteButton";

export type TodoType = {
    id: number,
    tags: {Date: string, Order: string},
    text: string,
    taskcode: string,
    estimate: string,
    times: TimesType,
    completed: boolean,
    comment: string
};

type TodoRecordType = {
    key: number;
    todo: TodoType;
    onTextChange: (id: number, newText: string) => void;
    onToggle: (id: number) => void;
}

export const TodoRecord = memo((props: TodoRecordType) => {
    console.log("=== TodoRecord rendered ===");
    const {todo, onTextChange, onToggle} = props;
    return (
        <div>
            <TodoOrder value={todo.tags.Order} />
            <TodoInput value={todo.text} onChange={(newText) => onTextChange(todo.id, newText)} />
            <TodoTaskcode value={todo.taskcode} />
            <TodoEstimate value={todo.estimate} />
            <EstimatedMinutes times={todo.times} />
            <DoneButton completed={todo.completed} onClick={() => onToggle(todo.id)} />
            <TodoComment value={todo.comment} />
            <DeleteButton />
        </div>
    )
});

