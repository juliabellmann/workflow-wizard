import styled from "styled-components";

export const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: white;
    border: var(--border-btn);
    min-width: 50px;
    min-height: 50px;
`;
 export const BaseButton = styled.button`
 display: flex;
 align-items: center;
 justify-content: center;
 border: var(--border-btn);
`;

export const StyledDoneButton = styled(BaseButton)`
    padding: 10px;
    position: absolute;
    top: 0;
    right: 2rem;
    height: 30px;
    width: 30px;
    border-top: 0;
    border-radius: 0 0 5px 5px;
`;

export const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({ padding }) => padding || "10px"};
    position: ${({ position }) => position || "relative"};
    border: var(--border-btn);
    border-radius: ${({ borderRadius }) => borderRadius || "0"};
`;