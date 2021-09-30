import React from "react";
import { ThemeProvider } from "styled-components";
import { Route, Switch } from "react-router-dom";
import theme from "./theme/theme";
import GlobalStyle from "./theme/global";

import Main from "./pages/Main";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
      </Switch>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
