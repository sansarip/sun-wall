import { Switch } from "@blueprintjs/core";
import { useContext } from "react";
import { DARK, LIGHT } from "src/colors";
import { setInLocalStorage } from "src/utils";
import styled, { ThemeContext } from "styled-components";

const Layout = styled.header`
  display: flex;
  align-items: center;
  height: 10vh;
  justify-content: space-between;

  h1 {
    margin: 0px;
  }
`;

export const Header: React.FC = () => {
  const { color, setColor } = useContext(ThemeContext);
  const persistColor = (color: string) => {
    setInLocalStorage("color", color);
    setColor(color);
  }

  return (
    <Layout>
      <h1>Sun Wall</h1>
      <Switch
        checked={color === DARK}
        innerLabel="🌞"
        innerLabelChecked="🌜"
        large={true}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          event.target.checked ? persistColor(DARK) : persistColor(LIGHT);
        }}
      />
    </Layout>
  );
};

export default Header;
