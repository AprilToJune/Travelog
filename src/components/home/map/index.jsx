/* eslint-disable */
import React, { useEffect } from 'react';
import styled from 'styled-components';

// import Map from 'components/home/map/Map';
import KakaoMap from 'components/home/map/KakaoMap';
import Polygon from 'components/home/map/Polygon';
import Overlay from 'components/home/map/Overlay';
import Marker from 'components/home/map/Marker';
import ZoomLevelControler from 'components/home/map/ZoomLevelControler';

import { useExperienceContext } from 'contexts/ExperienceContext';
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

const index = () => {
  const { experiences, mapLocationCount } = useExperienceContext();

  return (
    <Container>
      <KakaoMap>
        <Polygon />
        {CENTER_OF_REGINOS.map((region) =>
          <Overlay
            key={region.name} 
            level={region.level}
            name={region.name} 
            lat={region.lat} 
            lng={region.lng}
            mapLocationCount={mapLocationCount[region.name]}
          />
        )}
        <ZoomLevelControler />
        <Marker experiences={experiences} />
      </KakaoMap>
    </Container>
  );
}

export default index;
