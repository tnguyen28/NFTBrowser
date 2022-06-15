import "./App.css";
import styled from "styled-components";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import CollectionList from "./components/CollectionList";

const Header = styled.h1`
  text-align: center;
  padding: 20px;
`;

const Container = styled.div`
  margin: 0 30px 0 30px;
`;

const App = () => {
  return (
    <Container>
      <Header>NFT BROWSER</Header>
      <CollectionList />
    </Container>
  );
};

export default App;
