import {memo} from "react";
import {styled} from "styled-components";

type DoneButtonType = {
    completed: boolean;
    onClick: () => void;
}

export const DoneButton = memo((props: DoneButtonType) => {
    console.log("=== DoneButton rendered ===");
    const {completed, onClick} = props;
    return (
        <button onClick={onClick}>
            {completed ? '完了済' : '完了'}
        </button>
    )
});

