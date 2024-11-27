import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import HomeBtn from "@/assets/icons/home.svg";
import SquareCkeckBtn from "@/assets/icons/square-check-regular.svg";
import SquarePlusBtn from "@/assets/icons/square-plus-regular.svg";
import BtnToggleMode from "./BtnToggleMode";

export default function NavBar() {
  const { pathname } = useRouter();

  const isActive = true;

  return (
    <StyledNav>

      <StyledNavLink href="/tasksdone" $isactive={pathname === "/tasksdone"}>
        <SquareCkeckBtn />
      </StyledNavLink>

      <StyledNavLink href="/" $isactive={pathname === "/"}>
        <HomeBtn />
      </StyledNavLink>

      <StyledNavLink href="/taskcreate" $isactive={pathname === "/taskcreate"}>
        <SquarePlusBtn />
      </StyledNavLink>

      <StyledToggleContainer>
        <BtnToggleMode />
      </StyledToggleContainer>

    </StyledNav>
  );
}

// ----- Styled Components -----

const StyledNav = styled.nav`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 3;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  
  border-top: 3px solid var(--accent-color);

  height: var(--nav-height);
  background-color: var(--bg-color-btn);
`;

const StyledNavLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 48px;
  height: 48px;

  padding: 7px;

  fill: ${({ $isactive }) => ($isactive ? "var(--accent-color)" : "var(--text-color)")};
  background-color: ${({ $isactive }) =>
    $isactive ? "var(--bg-color-body)" : ""};
  border: ${({ $isactive }) =>
    $isactive ? "3px solid var(--accent-color)" : ""};
  border-radius: ${({ $isactive }) => ($isactive ? "5px" : "5px")};
  text-decoration: ${({ $isactive }) => ($isactive ? "underline" : "none")};
`;

const StyledToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 48px;
  height: 48px;

  fill: ${({ $isactive }) => ($isactive ? "var(--accent-color)" : "var(--text-color)")};
  background-color: ${({ $isactive }) =>
    $isactive ? "var(--bg-color-body)" : ""};
  border: ${({ $isactive }) =>
    $isactive ? "3px solid var(--accent-color)" : ""};
  border-radius: ${({ $isactive }) => ($isactive ? "5px" : "5px")};
  text-decoration: ${({ $isactive }) => ($isactive ? "underline" : "none")};
`;