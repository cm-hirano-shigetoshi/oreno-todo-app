import {styled} from "styled-components";


/*
type DeleteButtonType = {
    completed: boolean;
}

export const DeleteButton = (props: DeleteButtonType) => {
*/
export const DeleteButton = () => {
    console.log("=== DeleteButton rendered ===");
    //const {completed} = props;
    return (
        <SCButton>
            削除
        </SCButton>
    )
}

const SCButton = styled.button`
    border: none;
    border-radius: 8px;
`
