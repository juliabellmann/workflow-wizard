import isDoneImg from "@/public/icons/square-check-regular.svg";
import isNotDone from "@/public/icons/square-regular.svg";
import Image from "next/image";
import styled from "styled-components";

const StyledDoneButton = styled.button`
    padding: 10px;
    position: absolute;
    top: 0;
    right: 2rem;
    height: 50px;
    width: 50px;
`;

export default function MarkAsDoneButton({ isDone, onToggleDone, id }) {
    return (
        <>
            <StyledDoneButton onClick={() => onToggleDone(id)}>
                {/* {isDone ? "Done" : "isNotDone" } */}
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
