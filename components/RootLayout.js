import Head from "next/head";
import styled, {css} from "styled-components";

// ----- Styled Components -----

const StyledHeader= styled.header`

    ${css`

        h1 {
            display: flex;
            justify-content: center;
            white-space: nowrap;
        }

    `}

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
            <StyledHeader>
                <h1>Workflow Wizzard 🧙‍♂️</h1>
            </StyledHeader>
            <StyledMain>
                {children}
            </StyledMain>
        </>
    );
}