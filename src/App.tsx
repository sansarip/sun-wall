import { Colors } from "@blueprintjs/core";
import { useMemo, useState } from "react";
import styled, { ThemeProvider, ThemeConsumer } from "styled-components";
import { darkColor } from "./colors";
import { Header } from "./components";
import { Articles } from "./pages";
import { getFromLocalStorage } from "./utils";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  padding: 0px 1rem;
  background-color: ${(props) => props.theme.color};
`;

const Content = styled.div`
  width: 100%;
  max-width: 600px;
`;

const App: React.FC = () => {
  const [color, setColor] = useState(getFromLocalStorage("color") ?? darkColor);
  const theme = useMemo(() => ({ color, setColor }), [color]);
  return (
    <ThemeProvider theme={theme}>
      <ThemeConsumer>
        {(theme) => (
          <Layout
            className={theme.color === darkColor ? "bp4-dark" : "bp4-light"}
          >
            <Content>
              <Header />
              <Articles />
            </Content>
          </Layout>
        )}
      </ThemeConsumer>
    </ThemeProvider>
  );
};

export default App;
