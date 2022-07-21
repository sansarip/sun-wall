import "../src/index.css";
import styled, { ThemeProvider } from "styled-components";
import { darkColor, lightColor } from "../src/colors";
import { noop } from "lodash";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      // Array of plain string values or MenuItem shape (see below)
      items: ["light", "dark"],
      // Property that specifies if the name of the item will be displayed
      showName: true,
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

const Background = styled.div`
  background-color: ${(props) => props.theme.color};
`;

const withThemeProvider = (Story, context) => {
  const isDark = context.globals.theme === "dark";
  const color = isDark ? darkColor : lightColor;
  return (
    <ThemeProvider theme={{ color, setColor: noop }}>
      <Background className={isDark ? "bp4-dark" : "bp4-light"}>
        <Story {...context} />
      </Background>
    </ThemeProvider>
  );
};

const withPadding = (Story, context) => {
  return (
    <div style={{ padding: "1rem" }}>
      <Story {...context} />
    </div>
  );
};

export const decorators = [withPadding, withThemeProvider];
