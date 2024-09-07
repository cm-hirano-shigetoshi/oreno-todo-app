import {styled} from "styled-components";


type TodoCommentType = {
    value: string;
    onChange: (newText: string) => void;
}

export const TodoComment = (props: TodoCommentType) => {
    console.log("=== TodoComment rendered ===");
    const {value, onChange} = props;
    return (
        <SCInput type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    )
}

const SCInput = styled.input`
    width: 200px;
`
