import BackBtnSvg from "@/assets/icons/reply-solid.svg";
import Link from "next/link";
import styled from "styled-components";

const BackLinkWrapper = styled.div`
  position: fixed;
  top: 70px;
  left: 25px;
  z-index: 10;
  background-color: var(--bg-color-btn);
`;

const StyledSvgContainer = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 48px;
  width: 48px;
  padding: var(--border-radius-btn);

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
