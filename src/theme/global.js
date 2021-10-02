import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import FONTS from "../constants/fontUrl";

const GlobalStyle = createGlobalStyle`
  ${reset};

  html, body {
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  a {
    text-decoration: none;
  }

  @font-face {
    font-family: "Megrim", cursive;
    src: url(${FONTS.MEGRIM});
  }

  @font-face {
    font-family: "Raleway", sans-serif;
    src: url(${FONTS.RALE_WAY_LIGHT});
  }

  * {
    font-family: "Raleway", sans-serif;
  }

  button {
    font-family: "Raleway", sans-serif;
    cursor: pointer;
  }
`;

export default GlobalStyle;
