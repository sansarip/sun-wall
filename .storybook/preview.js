import "../src/index.css";
import { ThemeProvider } from "../src/components";

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

const withThemeProvider = (Story, context) => {
  return (
    <ThemeProvider theme={{isDark: context.globals.theme == "dark"}}>
      <Story {...context} />
    </ThemeProvider>
  );
};

const withPadding = (Story, context) => {
  return (
    <div style={{padding: "1rem"}}>
      <Story {...context} />
    </div>
  );
}

export const decorators = [withPadding, withThemeProvider];
