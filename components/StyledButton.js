import styled from "styled-components";

export const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: white;
    border-radius: 1px solid black;
    min-width: 50px;
    min-height: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    ${({ $variant }) =>
    $variant === "indexButton" &&
    css`
      padding: 5px;
      margin: 0 2px;
    `}

    ${({ $variant }) =>
    $variant === "resetButton" &&
    css`
      margin-top: 15px;
      display: flex;
      justify-content: center;
    `}
    
      ${({ $variant, $isEditMode }) => {
    if ($variant === "update" && $isEditMode) {
      return css`
        background-color: rgba(164, 211, 110, 1);
        color: white;
      `;
    } else if ($variant === "delete") {
      return css`
        background-color: firebrick;
        color: white;
      `;
    }
  }}
`;