import React from 'react';
import styled from 'styled-components';

import UploadButton from 'components/home/UploadButton';
import MapContainer from 'components/home/map';
import ListContainer from 'components/home/list';

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Home = () => (
  <Container>
    <MapContainer />
    <ListContainer />
    <UploadButton />
  </Container>
);

export default Home;
