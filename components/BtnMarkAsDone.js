import Image from "next/image";
import styled from "styled-components";

const StyledDoneButton = styled.button`
    position: absolute;
    top: 0;
    right: 5vw;
    height: 48px;
    width: 48px;

    border: 1px solid black ;
    border-top: 0;
    border-radius: 0 0 5px 5px;
    background-color: var(--bg-color-btn);

    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function BtnMarkAsDone({ isDone, toggleDone, id }) {
    return (
        <StyledDoneButton onClick={() => toggleDone(id)}>
            <Image
                src={isDone ? "/icons/square-check-regular.svg" : "/icons/square-regular.svg" }
                alt={isDone ? "Icon is Done" : "/icons/square-regular.svg" }
                width="35"
                height="35"
                unoptimized
            />
        </StyledDoneButton>
    );
}
