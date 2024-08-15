import {memo} from "react";
import {styled} from "styled-components";

type TodoInputType = {
    value: string;
    onChange: (newText: string) => void;
}

export const TodoInput = (props: TodoInputType) => {
    console.log("=== TodoInput rendered ===");
    const {value, onChange} = props;
    return (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    )
}
