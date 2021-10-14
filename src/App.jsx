import React from "react";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";

import GlobalStyle from "./theme/global";
import theme from "./theme/theme"
import Menu from "./components/Menu";
import Main from "./pages/Main";
import Attributes from "./pages/Attributes";
import Compatibility from "./pages/Compatibility";
import Color from "./pages/Color";
import Tags from "./pages/Tags";
import Error from "./components/Error";

function App() {
  const { hasError, ...error } = useSelector((state) => state.error);

  return (
    <ThemeProvider theme={theme}>
      {hasError && <Error {...error} /> }
      <GlobalStyle />
      <Menu />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/Attributes">
          <Attributes />
        </Route>
        <Route exact path="/compatibility">
          <Compatibility />
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
