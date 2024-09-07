import {styled} from "styled-components";


type DeleteButtonType = {
    onClick: () => void;
}

export const DeleteButton = (props: DeleteButtonType) => {
    console.log("=== DeleteButton rendered ===");
    const {onClick} = props;
    return (
        <SCButton onClick={onClick}>
            削除
        </SCButton>
    )
}

const SCButton = styled.button`
    border: none;
    border-radius: 8px;
`
