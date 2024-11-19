import styled from "styled-components";
import NavBar from "./NavBar";

export default function RootLayout({ children }) {
    return (
        <>
            <header>
                <StyledHeadline>Workflow Wizzard</StyledHeadline>
            </header>
            <StyledMain>
                {children}
            </StyledMain>
            <NavBar />
        </>
    );
}

// ----- Styled Components -----

const StyledHeadline= styled.h1`
    display: flex;
    justify-content: center;
    white-space: nowrap;
`;

const StyledMain = styled.main`
    margin: 0 20px;
`;