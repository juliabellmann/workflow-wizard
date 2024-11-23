import styled from "styled-components";
import NavBar from "./NavBar";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

function LanguageSwitcher() {
    const router = useRouter()
    const { t, i18n } = useTranslation()
  
    function changeLanguage(lng) {
      i18n?.changeLanguage(lng)
      router.push(router.asPath, undefined, { locale: lng })
    }
    return (
        <select value={router.locale} onChange={(e) => changeLanguage(e.target.value)}>
          <option value="en">EN</option>
          <option value="de">DE</option>
        </select>
    )
}

export default function RootLayout({ children }) {
    return (
        <>
            <Head>
            <link rel="icon" href="/icon.png" />
            </Head>
            <StlyedHeader>
                <StyledHeadline>Workflow Wizard<LanguageSwitcher/></StyledHeadline>
                
                <StyledLogo
                    src="/image/Logo.jpeg"
                    alt="Logo Workflow Wizard"
                    width="300"
                    height="300"
                    />
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
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;


    background-color: var(--bg-color-btn);

    display: flex;
    justify-content: center;
    white-space: nowrap;

    padding: 10px 0 5px 0;

    border-bottom: 3px solid var(--accent-color);
`;

const StyledLogo = styled(Image)`
    position: fixed;
    top: 100px;
    z-index: -10;
    opacity: 0.5;
`;

const StyledMain = styled.main`
    margin: 90px 20px 0 20px;
`;