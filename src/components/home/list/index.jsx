import React from 'react';
import styled from 'styled-components';

import List from 'components/home/list/List';

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Text = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
`;

const ListContainer = styled.div`
  width: 80%;
  height: 80%;
  background-color: white;
  overflow: scroll;
`;

const index = () => (
  <Container>
    <Text>리스트 컨테이너</Text>
    <ListContainer>
      <List />
      <List />
      <List />
      <List />
      <List />
      <List />
      <List />
      <List />
      <List />
      <List />
    </ListContainer>
  </Container>
);

export default index;
