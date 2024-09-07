import {styled} from "styled-components";


type TodoTaskcodeType = {
    value: string;
    onChange: (newText: string) => void;
}

export const TodoTaskcode = (props: TodoTaskcodeType) => {
    console.log("=== TodoTaskcode rendered ===");
    const {value, onChange} = props;
    return (
        <SCInput type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    )
}

const SCInput = styled.input`
    width: 30px;
`
