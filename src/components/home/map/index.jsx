import React from 'react';
import styled from 'styled-components';

// import Map from 'components/home/map/Map';
import KakaoMap from 'components/home/map/KakaoMap';
import Polygon from 'components/home/map/Polygon';
import Overlay from 'components/home/map/Overlay';

import { CENTER_OF_REGINOS } from 'constants/index';

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
    <KakaoMap>
      <Polygon />
      {CENTER_OF_REGINOS.map((center) => <Overlay key={center[0]} lat={center[3]} log={center[2]} />)}
    </KakaoMap>
  </Container>
);

export default index;
