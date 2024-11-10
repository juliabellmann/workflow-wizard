import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

  :root {
    --text-font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    --bg-color: rgba(219, 219, 219, 0.75);
    --border-radius-button: 10px;
    --border-radius-input: 5px;
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
  }

  a {
    color: black;
    text-decoration: none;

    &:hover {
      color: red;
    }
  }
`;
