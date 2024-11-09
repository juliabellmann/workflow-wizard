import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }

  a {
    color: black;
    text-decoration: none;

    &:hover {
      color: red;
    }
  }
`;
