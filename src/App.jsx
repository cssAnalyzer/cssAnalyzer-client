import React from "react";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "./theme/global";
import theme from "./theme/theme";

import Menu from "./components/Menu";
import Main from "./pages/Main";
import Attributes from "./pages/Attributes";
import Browser from "./pages/Browser";
import Color from "./pages/Color";
import Tags from "./pages/Tags";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Menu />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/Attributes">
          <Attributes />
        </Route>
        <Route exact path="/Browser">
          <Browser />
        </Route>
        <Route exact path="/Color">
          <Color />
        </Route>
        <Route exact path="/Tags">
          <Tags />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
