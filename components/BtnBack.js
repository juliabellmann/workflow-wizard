import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const BackLinkWrapper = styled.div`
  position: fixed;
  top: 50px;
  left: 25px;
  z-index: 10;

  height: 48px;
  width: 48px;

  background-color: var(--bg-color-btn);
  color: var(--accentcolor);

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(21, 53, 43);
`;

const StyledImage = styled(Image)`
  color: rgb(21, 53, 43);
`;

export default function ButtonBack() {
  return (
    <BackLinkWrapper>
      <Link href="/" aria-label="Link to the Homepage">
        <StyledImage
          src={"/icons/reply-solid.svg"}
          alt={"Link to the Homepage"}
          width="30"
          height="30"
        />
      </Link>
    </BackLinkWrapper>
  );
}
