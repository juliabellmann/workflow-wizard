import Link from "next/link";
import styled from "styled-components";

const StyledButtonFlexContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledButtonBack = styled(Link)`
    display: flex;
    justify-content: center;
    white-space: nowrap;

    padding: 5px 10px;

    background-color: white;
    border: 1px solid black;
    border-radius: var(--border-radius-button);
`;

export default function ButtonBack() {
    return (
        <>
            <StyledButtonFlexContainer>
                <StyledButtonBack href="/" aria-label="Link back to homepage">Back to Homepage</StyledButtonBack>
            </StyledButtonFlexContainer>
        </>
    );
}