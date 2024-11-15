import { createGlobalStyle } from "styled-components";
import styled, {css} from "styled-components";

export default createGlobalStyle`

  :root {
    --text-font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    --bg-color: rgba(219, 219, 219, 0.25);
    --bg-high: rgba(255, 0, 0, 0.5);
    --bg-medium:rgba(255, 196, 0, 0.5);
    --bg-low: rgba(21, 255, 0, 0.5);
    --border-radius-button: 10px;
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

  .overdue {
    background-color: red;
  }

  .today {
    background-color: orange;
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