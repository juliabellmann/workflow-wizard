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
  
  background-color: var(--bg-color-btn);
  border-radius: 50%;
  border: 1px solid var(--accent-color);
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
