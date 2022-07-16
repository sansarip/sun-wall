import { createContext } from "react";

export type Theme = {
    isDark: boolean;
}

export const ThemeContext = createContext<Theme>({ isDark: false });

interface ThemeProviderProps {
    theme: Theme;
    children?: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
    const { isDark } = props.theme;
    return (
        <ThemeContext.Provider value={props.theme}>
            <div className={isDark ? 'bp4-dark' : 'bp4-light'}>{props.children}</div>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;