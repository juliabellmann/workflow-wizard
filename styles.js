import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export default createGlobalStyle`

  :root {
    --text-font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    --text-font-form: 'Times New Roman', Times, serif;

    --bg-color-body: #ffffff;
    --bg-color-card: #f8f8f8;
    --bg-color-btn: #ffffff;

    --accent-color: #006acd;

    --bg-High: rgb(178, 34, 34);
    --bg-Medium:rgb(255, 149, 0);
    --bg-Low: rgb(30, 157, 61);
    
    --bg-default: var(--bg-color-card);
    --bg-today: rgba(255, 149, 0, 0.5);
    --bg-overdue: rgba(178, 34, 34, 0.5);
    
    --padding-btn: 15px 25px;
    --border-radius-btn: 10px;
    --border-btn: 1px solid black;
    
    --border-radius-input: 5px;
    
    --nav-height: 75px;
    
    --border-radius-form: var(--border-radius-btn);

  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: var(--bg-color-body);
    font-family: var(--text-font);
    margin-bottom: calc(var(--nav-height) + 10px);

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  header {
    font-family: 'Trebuchet MS', sans-serif;
  }

  main {
    /* width: 375px; */
    min-height: 80vh;
  }

  h3 {
    margin: 20px 0 10px 0;
  }

  a {
    color: black;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }
`;

export const StyledContentHeading = styled.h2`
display: flex;
justify-content: center;
margin: 20px 0;
`;