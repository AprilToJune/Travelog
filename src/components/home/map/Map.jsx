/* global kakao */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import geojson from 'lib/TL_SCCO_SIG.json';
// import geojson from 'lib/TL_SCCO_CTPRVN.json';

const Container = styled.div`
  width: 80%;
  height: 80%;
  background-color: white;
`;

const Map = () => {
  useEffect(() => {
    const data = geojson.features;
    let coordinates = []; // 좌표 저장 배열
    // let name = ''; // 행정구 이름
    let polygon = [];

    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
      level: 9, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    const makePolygon = (coordi) => {
      const path = [];
      coordi.forEach((item) => {
        const points = [];
        item.forEach((coordinate) => {
          points.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
        });
        path.push(points);
      });
      return new kakao.maps.Polygon({
        path, // 그려질 다각형의 좌표 배열입니다
        strokeWeight: 2, // 선의 두께입니다
        strokeColor: '#004c80', // 선의 색깔입니다
        strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid', // 선의 스타일입니다
        fillColor: '#fff', // 채우기 색깔입니다
        fillOpacity: 0.7, // 채우기 불투명도 입니다
      });
    };

    data.forEach((val) => {
      coordinates = val.geometry.coordinates;
      // name = val.properties.CTP_KOR_NM;
      polygon = makePolygon(coordinates);
      polygon.setMap(map);
    });
  }, []);

  return (
    <Container>
      <div id="map" style={{ width: '100%', height: '100%' }} />
    </Container>
  );
};

export default Map;
