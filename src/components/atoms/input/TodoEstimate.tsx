import {styled} from "styled-components";


type TodoEstimateType = {
    value: string;
    onChange: (newText: string) => void;
}

export const TodoEstimate = (props: TodoEstimateType) => {
    console.log("=== TodoEstimate rendered ===");
    const {value, onChange} = props;
    return (
        <SCInput type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    )
}

const SCInput = styled.input`
    width: 20px;
`
