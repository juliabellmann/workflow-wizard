import Link from "next/link";
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
`;

export default function NavBar() {
    return (
        <StyledNav>
            <StyledNavLink href="/">All Tasks</StyledNavLink>
            <StyledNavLink href="tasksdone">Done</StyledNavLink>
        </StyledNav>
    )
}