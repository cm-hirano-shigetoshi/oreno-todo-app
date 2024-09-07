import {memo} from "react";
import {TodoOrder} from "../atoms/input/TodoOrder";
import {TodoInput} from "../atoms/input/TodoInput";
import {TodoTaskcode} from "../atoms/input/TodoTaskcode";
import {TodoEstimate} from "../atoms/input/TodoEstimate";
import {EstimatedMinutes, TimesType} from "../atoms/input/EstimatedMinutes";
import {DoneButton} from "../atoms/button/DoneButton";
import {TodoComment} from "../atoms/input/TodoComment";
import {DeleteButton} from "../atoms/button/DeleteButton";

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
    onOrderChanged: (id: number, newText: string) => void;
    onTextChange: (id: number, newText: string) => void;
    onTaskcodeChanged: (id: number, newText: string) => void;
    onEstimatedMinutesChanged: (id: number, newText: string) => void;
    onDoneButtonClicked: (id: number) => void;
    onCommentChanged: (id: number, newText: string) => void;
    onDeleteButtonClicked: (id: number) => void;
}

export const TodoRecord = memo((props: TodoRecordType) => {
    console.log("=== TodoRecord rendered ===");
    const {todo,
        onOrderChanged,
        onTextChange,
        onTaskcodeChanged,
        onEstimatedMinutesChanged,
        onDoneButtonClicked,
        onCommentChanged,
        onDeleteButtonClicked
    } = props;
    return (
        <div>
            <TodoOrder value={todo.tags.Order} onChange={(newText) => onOrderChanged(todo.id, newText)} />
            <TodoInput value={todo.text} onChange={(newText) => onTextChange(todo.id, newText)} />
            <TodoTaskcode value={todo.taskcode} onChange={(newText) => onTaskcodeChanged(todo.id, newText)} />
            <TodoEstimate value={todo.estimate} onChange={(newText) => onEstimatedMinutesChanged(todo.id, newText)} />
            <EstimatedMinutes times={todo.times} />
            <DoneButton completed={todo.completed} onClick={() => onDoneButtonClicked(todo.id)} />
            <TodoComment value={todo.comment} onChange={(newText) => onCommentChanged(todo.id, newText)} />
            <DeleteButton onClick={() => onDeleteButtonClicked(todo.id)} />
        </div>
    )
});

