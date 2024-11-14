import Image from "next/image";
import styled from "styled-components";

const StyledDoneButton = styled.button`
    padding: 10px;
    position: absolute;
    top: 0;
    right: 2rem;
    height: 50px;
    width: 50px;

    border: 1px solid black;
    border-radius: 0 0 5px 5px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function MarkAsDoneButton({ isDone, onToggleDone, id }) {
    return (
        <>
            <StyledDoneButton onClick={() => onToggleDone(id)}>
            <Image
            
                src={isDone ? "/icons/square-check-regular.svg" : "/icons/square-regular.svg" }
                alt={isDone ? "Icon is Done" : "/icons/square-regular.svg" }
                width={20}
                height={20}
                unoptimized
             />
            </StyledDoneButton>
        </>
    );
}
