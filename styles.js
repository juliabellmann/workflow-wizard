import { createGlobalStyle } from "styled-components";
import styled, {css} from "styled-components";

export default createGlobalStyle`

  :root {
    --text-font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

    --bg-color-body: #f8f8f8;
    --bg-color-card: #ffffff;
    --bg-High: rgb(178, 34, 34);
    --bg-Medium:rgb(255, 149, 0);
    --bg-Low: rgb(30, 157, 61);
    --border-radius-button: 10px;

    --bg-default: var(--bg-color-card);
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
    background-color: var(--bg-color-body);
    margin: 0;
    font-family: var(--text-font);
    margin-bottom: calc(var(--nav-height) + 20px);

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  main {
    width: 375px;
    min-height: 80vh;
  }

  a {
    color: black;
    text-decoration: none;
  }

  ul{
    padding: 0;
  }
`;
// ----- Styled Components -----

export const StyledForm = styled.form`

    background-color: var(--bg-color-card);
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
  `}
`;

export const StyledFlexbox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;