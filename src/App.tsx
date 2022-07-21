import styled from "styled-components";
import { Header } from "./components";
import { Articles } from "./pages";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  padding: 0px 1rem;
`;

const Content = styled.div`
  width: 100%;
  max-width: 600px;
`;

function App() {
  return (
    <Layout>
      <Content>
        <Header />
        <Articles />
      </Content>
    </Layout>
  );
}

export default App;
