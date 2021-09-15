import React from 'react';
import styled from 'styled-components';

import Map from 'components/home/map/Map';

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

const index = () => (
  <Container>
    <Map />
  </Container>
);

export default index;
