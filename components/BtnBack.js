import BackBtnSvg from "@/assets/icons/reply-solid.svg";
import Link from "next/link";
import styled from "styled-components";

const BackLinkWrapper = styled.div`
  position: fixed;
  top: 90px;
  left: 25px;
  z-index: 10;
  `;

const StyledSvgContainer = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  
  height: 48px;
  width: 48px;
  padding: var(--border-radius-btn);
  
  border: 2px solid var(--accent-color);
  border-radius: 50%;

  background-color: var(--bg-color-btn);
  fill: var(--text-color);
`;

export default function ButtonBack() {
  return (
    <BackLinkWrapper>
      <StyledSvgContainer href="/" aria-label="Link to the Homepage">
        <BackBtnSvg />
      </StyledSvgContainer>
    </BackLinkWrapper>
  );
}
