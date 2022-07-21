import styled from "styled-components";

const Layout = styled.header`
  display: flex;
  align-items: center;
  height: 10vh;
  
  h1 {
    margin: 0px;
  }
`;

const Header: React.FC = () => (
  <Layout>
    <h1>Sun Wall</h1>
  </Layout>
);

export default Header;
