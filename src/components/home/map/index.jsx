import React from 'react';
import styled from 'styled-components';

import Map from 'components/home/map/Map';

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Text = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
`;

const index = () => (
  <Container>
    <Text>맵 컨테이너</Text>
    <Map />
  </Container>
);

export default index;
