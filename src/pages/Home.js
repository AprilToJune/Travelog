import React from 'react';
import styled from 'styled-components';

import UploadButton from 'components/home/UploadButton';

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
    Home
    <UploadButton />
  </Container>
);

export default Home;
