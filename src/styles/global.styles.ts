import { createGlobalStyle, css } from "styled-components";

export default createGlobalStyle(
  //This line create a GlobalStyle for the project
  () => css`
    \* {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      outline: 0;
    }

    //The style below lets the fonts more responsive

    html {
      font-size: 62.5%;
    }
    body {
      font-size: 1.6rem;
      font-family: "Roboto", sans-serif;
    }
    h1 {
      font-size: 2.25rem;
    }
    h2 {
      font-size: 2rem;
    }
    h3 {
      font-size: 1.75rem;
    }
    h4 {
      font-size: 1.5rem;
    }
    h5 {
      font-size: 1.5rem;
    }
    p {
      font-size: 1.5rem;
    }
    a {
      text-decoration: none;
    }

    ul {
      list-style: none;
    }
  `
);
