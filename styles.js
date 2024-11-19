import { createGlobalStyle } from "styled-components";
import styled, {css} from "styled-components";

export default createGlobalStyle`

  :root {
    --text-font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

    --bg-color: rgba(219, 219, 219, 0.25);
    --bg-high: rgb(178, 34, 34);
    --bg-medium:rgb(255, 149, 0);
    --bg-low: rgb(30, 157, 61);
    --border-radius-button: 10px;

    --bg-default: rgba(219, 219, 219, 0.25);
    --bg-today: rgba(255, 149, 0, 0.5);
    --bg-overdue: rgba(178, 34, 34, 0.5);
    
    --border-radius-input: 5px;
    --nav-height: 50px;

  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  body {
    margin: 0;
    font-family: var(--text-font);
    margin-bottom: calc(var(--nav-height) + 20px);
  }

  a {
    color: black;
    text-decoration: none;

    &:hover {
      color: red;
    }
  }
`;
// ----- Styled Components -----

export const StyledUpdateForm = styled.form`
  background-color: var(--bg-color);
    border: 1px solid black;
    border-radius: var(--border-radius-button);
    display: flex;
    flex-direction: column;

    padding: 25px;
    margin-top: 20px;

  ${css`
      input {
        padding: 5px;
        border: 1px solid black;
        border-radius: var(--border-radius-input);
        font-family: var(--text-font);
      }

      textarea {
        padding: 5px;
        border: 1px solid black;
        border-radius: var(--border-radius-input);
        font-family: var(--text-font);
      }

      select {
        padding: 5px;
        border: 1px solid black;
        border-radius: var(--border-radius-input);
        font-family: var(--text-font);
      }
      
      button {
        background-color: white;
        padding: 5px 10px;
        white-space: nowrap;
        border: 1px solid black;

          display: flex;
          align-items: center;
          justify-content: center;
      }
  `}
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;