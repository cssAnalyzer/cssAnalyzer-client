import React from "react";
import { ThemeProvider } from "styled-components";
import { Route, Switch } from "react-router-dom";

import GlobalStyle from "./theme/global";
import theme from "./theme/theme";

import Main from "./pages/Main";
import Attributes from "./pages/Attributes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/attributes">
          <Attributes />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
