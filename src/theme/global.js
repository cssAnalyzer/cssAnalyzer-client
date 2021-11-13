import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import FONTS from "../constants/fontUrl";

const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body {
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  a {
    text-decoration: none;
  }

  @font-face {
    font-family: "Megrim-Regular", cursive;
    src: url("../static/fonts/Megrim-Regular.eot")url("../static/fonts/Megrim-Regular.ttf");
  }

  @font-face {
    font-family: "Raleway", sans-serif;
    src: url("../static/fonts/Raleway-Light.eot")url("../static/fonts/Raleway-Light.ttf");
  }

  * {
    font-family: "Raleway", sans-serif;
    src: url("../static/fonts/Raleway-Light.eot")url("../static/fonts/Raleway-Light.ttf");
  }

  button {
    font-family: "Raleway", sans-serif;
    src: url("../static/fonts/Raleway-Light.eot")url("../static/fonts/Raleway-Light.ttf");
    cursor: pointer;
  }
`;

export default GlobalStyle;
