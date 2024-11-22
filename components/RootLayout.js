import styled from "styled-components";
import NavBar from "./NavBar";
import Image from "next/image";
import Head from "next/head";

export default function RootLayout({ children }) {
    return (
        <>
            <Head>
            <link rel="icon" href="/icon.png" />
            </Head>
            <StlyedHeader>
                <StyledHeadline>Workflow Wizard</StyledHeadline>
                {/* <Image
                    src="/image/Logo.jpeg"
                    alt="Logo Workflow Wizard"
                    width="150"
                    height="150"
                /> */}
            </StlyedHeader>
            <StyledMain>
                {children}
            </StyledMain>
            <NavBar />
        </>
    );
}

// ----- Styled Components -----

const StlyedHeader = styled.header`
        display: flex;
        flex-direction: column;
        align-items: center;
`;

const StyledHeadline= styled.h1`
    display: flex;
    justify-content: center;
    white-space: nowrap;

    margin: 20px 0 10px 0;
`;

const StyledMain = styled.main`
    margin: 0 20px;
`;