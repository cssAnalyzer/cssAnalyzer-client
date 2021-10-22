import React from "react";
import { Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import GlobalStyle from "./theme/global";
import theme from "./theme/theme"
import Menu from "./components/Menu";
import Main from "./pages/Main";
import Attributes from "./pages/Attributes";
import Compatibility from "./pages/Compatibility";
import Color from "./pages/Color";
import Tags from "./pages/Tags";

const PageWrapper = styled.div`
  text-align: center;

  @media (min-width: 768px) and (max-width: 1024px) {
    margin: 0;
  }

  @media (min-width: 481px) and (max-width: 767px) {
    {
      width: calc(100%);
    }
  }

  @media (min-width: 280px) and (max-width: 480px) {
    {
      width: calc(100%);
    }
  }
`;

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <PageWrapper>
          <Menu />
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/attributes">
              <Attributes />
            </Route>
            <Route path="/compatibility">
              <Compatibility />
            </Route>
            <Route path="/color">
              <Color />
            </Route>
            <Route path="/tags">
              <Tags />
            </Route>
            <Route path="*">
              <p>Not Found</p>
            </Route>
          </Switch>
        </PageWrapper>
      </ThemeProvider>
    </DndProvider>
  );
}

export default App;
