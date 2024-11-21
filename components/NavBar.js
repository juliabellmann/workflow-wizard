import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import HomeBtn from "@/assets/icons/home.svg";
import SquareCkeckBtn from "@/assets/icons/square-check-regular.svg";
import SquarePlusBtn from "@/assets/icons/square-plus-regular.svg";

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
    </StyledNav>
  );
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
  display: flex;
  justify-content: center;
  align-items: center;

  width: 48px;
  height: 48px;

  padding: 7px;

  fill: ${({ $isactive }) => ($isactive ? "lightblue" : "black")};
  background-color: ${({ $isactive }) =>
    $isactive ? "var(--bg-color-body)" : ""};
  border: ${({ $isactive }) =>
    $isactive ? "3px solid var(--accent-color)" : ""};
  border-radius: ${({ $isactive }) => ($isactive ? "5px" : "")};
  text-decoration: ${({ $isactive }) => ($isactive ? "underline" : "none")};
`;
