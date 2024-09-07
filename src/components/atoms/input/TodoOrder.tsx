import {styled} from "styled-components";


type TodoOrderType = {
    value: string;
    onChange: (newText: string) => void;
}

export const TodoOrder = (props: TodoOrderType) => {
    console.log("=== TodoOrder rendered ===");
    const {value, onChange} = props;
    return (
        <SCInput type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    )
}

const SCInput = styled.input`
    width: 30px;
`
