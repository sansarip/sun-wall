import { Colors } from '@blueprintjs/core'
import { ThemeContext } from './ThemeProvider';
import styled from 'styled-components';

const headerStyles = `
  display: flex;
  height: 4rem;
  align-items: center;
  padding: 1rem;
`;

const DarkHeader = styled.header`
  ${headerStyles}
  background-color: ${Colors.DARK_GRAY4};
`;

const LightHeader = styled.header`
  ${headerStyles}
  background-color: ${Colors.LIGHT_GRAY4};
`;

const Title = <h1 className='bp4-text-large'>🌞 Sun Wall</h1>;

const Header: React.FC = () => (
    <ThemeContext.Consumer>
        {({ isDark }) => (
            isDark ? <DarkHeader>{Title}</DarkHeader> : <LightHeader>{Title}</LightHeader>
        )}
    </ThemeContext.Consumer>
)

export default Header;