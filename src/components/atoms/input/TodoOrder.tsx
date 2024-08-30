import {styled} from "styled-components";


type TodoOrderType = {
    value: string;
}

export const TodoOrder = (props: TodoOrderType) => {
    console.log("=== TodoOrder rendered ===");
    const {value} = props;
    return (
        <SCInput type="text" value={value} />
    )
}

const SCInput = styled.input`
    width: 30px;
`
