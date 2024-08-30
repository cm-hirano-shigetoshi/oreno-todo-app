import {styled} from "styled-components";


type TodoEstimateType = {
    value: string;
}

export const TodoEstimate = (props: TodoEstimateType) => {
    console.log("=== TodoEstimate rendered ===");
    const {value} = props;
    return (
        <SCInput type="text" value={value} />
    )
}

const SCInput = styled.input`
    width: 20px;
`
