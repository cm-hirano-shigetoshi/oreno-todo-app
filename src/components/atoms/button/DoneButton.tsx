import {styled} from "styled-components";


type DoneButtonType = {
    completed: boolean;
    onClick: () => void;
}

export const DoneButton = (props: DoneButtonType) => {
    console.log("=== DoneButton rendered ===");
    const {completed, onClick} = props;
    return (
        <SCButton onClick={onClick}>
            {completed ? '完了済' : '完了'}
        </SCButton>
    )
}

const SCButton = styled.button`
    border: none;
    border-radius: 8px;
`
