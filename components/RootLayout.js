import Head from "next/head";
import styled, {css} from "styled-components";
import NavBar from "./NavBar";

// ----- Styled Components -----

const StyledHeadline= styled.h1`
            display: flex;
            justify-content: center;
            white-space: nowrap;
`;

const StyledMain = styled.main`
    margin: 0 20px;
`;

export default function RootLayout({ children }) {
    return (
        <>
            <Head>
                <title>Workflow Wizzard</title>
            </Head>
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