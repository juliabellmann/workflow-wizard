import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 3;

  height: var(--nav-height);
  background-color: white;

  border-top: 1px solid black;  
`;

const StyledNavLink = styled(Link)`
    padding: 10px 30px;
    color: ${({ $isactive }) => ($isactive ? "lightblue" : "black")};
    background-color: ${({ $isactive }) => ($isactive ? "grey" : "")};
    text-decoration: ${({ $isactive }) => ($isactive ? "underline" : "none")};
`;

export default function NavBar() {
    const { pathname } = useRouter();

    return (
        <StyledNav>
        <StyledNavLink href="/" $isactive={pathname === "/"}>All Tasks</StyledNavLink>
        <StyledNavLink href="/tasksdone" $isactive={pathname === "/tasksdone"}>Done</StyledNavLink>
        <StyledNavLink href="/taskcreate" $isactive={pathname === "/taskcreate"}>Create</StyledNavLink>
      </StyledNav>
    )
}