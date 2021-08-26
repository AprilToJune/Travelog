/* global kakao */ /* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import geojson12 from 'lib/TL_SCCO_CTPRVN.json';

const Container = styled.div`
  width: 80%;
  height: 80%;
  background-color: white;
`;

const mapOption = {
  center: new kakao.maps.LatLng(35.93450063771281, 127.75854915532611), // 지도의 중심좌표
  level: 13, // 지도의 확대 레벨
};

const Map = () => {
  const [mapLevel, setMapLevel] = useState(12);
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [polygons, setPolygons] = useState([]);
  const [preLevel, setPreLevel] = useState(13);

  const [places, setPlaces] = useState(['제주특별자치도 제주시 첨단로 242']);

  function makePolygon(geojson) {
    const data = geojson.features;
    let coordi = []; // 좌표 저장 배열

    data.forEach((val) => {
      coordi = val.geometry.coordinates;
      const path = [];
      coordi.forEach((item) => {
        const points = [];
        item.forEach((coordinate) => {
          points.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
        });
        path.push(points);
      });

      const polygon = new kakao.maps.Polygon({
        path, // 그려질 다각형의 좌표 배열입니다
        strokeWeight: 2, // 선의 두께입니다
        strokeColor: '#004c80', // 선의 색깔입니다
        strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid', // 선의 스타일입니다
        fillColor: '#fff', // 채우기 색깔입니다
        fillOpacity: 0.7, // 채우기 불투명도 입니다
      });

      kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
        polygon.setOptions({ fillColor: '#09f' });
      });

      kakao.maps.event.addListener(polygon, 'mouseout', function () {
        polygon.setOptions({ fillColor: '#fff' });
      });

      kakao.maps.event.addListener(polygon, 'click', function (mouseEvent) {
        polygon.setOptions({ fillColor: 'red' });
      });

      setPolygons((PreState) => [...PreState, polygon]);
      polygon.setMap(map.current);
    });
  }

  function makeMarkers(places) {
    const geocoder = new kakao.maps.services.Geocoder();
    places.forEach((place) => {
      geocoder.addressSearch(place, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          const newPosition = new kakao.maps.LatLng(result[0].y, result[0].x);
          new kakao.maps.Marker({
            map: map.current,
            position: newPosition,
          });
        }
      });
    });
  }

  useEffect(() => {
    if (preLevel < 12 && 12 <= mapLevel) {
      setPreLevel(13);
      polygons.forEach((val) => {
        val.setMap(map.current);
      });
    } else if (mapLevel < 12 && 12 <= preLevel) {
      setPreLevel(0);
      polygons.forEach((val) => {
        val.setMap(null);
      });
    }
  }, [mapLevel]);

  useEffect(() => {
    map.current = new kakao.maps.Map(mapContainer.current, mapOption);
    makePolygon(geojson12);

    makeMarkers(places);

    kakao.maps.event.addListener(map.current, 'zoom_changed', function () {
      const level = map.current.getLevel();
      setMapLevel(level);
    });
  }, []);

  return (
    <Container>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      {mapLevel}
    </Container>
  );
};

export default Map;
