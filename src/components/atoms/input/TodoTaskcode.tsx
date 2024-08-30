import {styled} from "styled-components";


type TodoTaskcodeType = {
    value: string;
}

export const TodoTaskcode = (props: TodoTaskcodeType) => {
    console.log("=== TodoTaskcode rendered ===");
    const {value} = props;
    return (
        <SCInput type="text" value={value} />
    )
}

const SCInput = styled.input`
    width: 30px;
`
