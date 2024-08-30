import {styled} from "styled-components";


type TodoCommentType = {
    value: string;
}

export const TodoComment = (props: TodoCommentType) => {
    console.log("=== TodoComment rendered ===");
    const {value} = props;
    return (
        <SCInput type="text" value={value} />
    )
}

const SCInput = styled.input`
    width: 200px;
`
