import {styled} from "styled-components";

export type TimesType = Array<{start: string, end: string}>

type EstimatedMinutesType = {
    times: TimesType;
}

export const EstimatedMinutes = (props: EstimatedMinutesType) => {
    console.log("=== EstimatedMinutes rendered ===");
    const {times} = props;
    return (
        <SCLabel>{JSON.stringify(times)}</SCLabel>
    )
}

const SCLabel = styled.label`
    width: 20px;
`

