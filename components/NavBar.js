import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function NavBar() {
    const { pathname } = useRouter();

    return (
        <StyledNav>

            <StyledNavLink href="/tasksdone" $isactive={pathname === "/tasksdone"}>
                <Image
                      src="/icons/square-check-regular.svg"
                      alt="Icon steering wheel"
                      width="35"
                      height="35"
                      optimized
                  />
            </StyledNavLink>

            <StyledNavLink href="/" $isactive={pathname === "/"}>
                <Image
                    src="/icons/home.svg"
                    alt="Icon steering wheel"
                    width="35"
                    height="35"
                    optimized
                />
            </StyledNavLink>

            <StyledNavLink href="/taskcreate" $isactive={pathname === "/taskcreate"}>
                <Image
                      src="/icons/square-plus-regular.svg"
                      alt="Icon Done"
                      width="35"
                      height="35"
                      optimized
                 />
            </StyledNavLink>
        </StyledNav>
    )
}

// ----- Styled Components -----

const StyledNav = styled.nav`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: fixed;
    /* unten fixieren */
    bottom: 0;
    /* volle Breite des Viewports */
    right: 0;
    left: 0;
    /* in den Vordergrund */
    z-index: 3;

    height: var(--nav-height);
    background-color: white;

    border-top: 3px solid var(--accent-color);  
`;

const StyledNavLink = styled(Link)`
    padding: 10px;
    /* color: ${({ $isactive }) => ($isactive ? "lightblue" : "black")}; */
    background-color: ${({ $isactive }) => ($isactive ? "var(--bg-color-body)" : "")};
    border: ${({ $isactive }) => ($isactive ? "3px solid var(--accent-color)" : "")};
    border-radius: ${({ $isactive }) => ($isactive ? "50%" : "")};
    text-decoration: ${({ $isactive }) => ($isactive ? "underline" : "none")};
`;