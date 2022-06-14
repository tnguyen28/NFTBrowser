import React from "react";
import "./App.css";
import Grid from "./components/Grid";
import styled from "styled-components";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Header = styled.h1`
  text-align: center;
  padding: 20px;
`;

const Container = styled.div`
margin: 0 30px 0 30px
`

const App = () => {
  return (
    <Container>
      <Header>NFT BROWSER</Header>
      <Grid />
    </Container>
  );
};

export default App;
