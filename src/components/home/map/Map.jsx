/* global kakao */ /* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import geojson9 from 'lib/TL_SCCO_SIG.json';
import geojson12 from 'lib/TL_SCCO_CTPRVN.json';

const Container = styled.div`
  width: 80%;
  height: 80%;
  background-color: white;
`;

const mapOption = {
  center: new kakao.maps.LatLng(37.5666103, 126.9783882), // 지도의 중심좌표
  level: 12, // 지도의 확대 레벨
};

const Map = () => {
  const [mapLevel, setMapLevel] = useState(12);
  const mapContainer = useRef(null);
  const map = useRef(null);

  const geo0 = [];
  const geo9 = makePolygon(geojson9);
  const geo12 = makePolygon(geojson12);
  const geolen = [0, 249, 17];
  const [pregeo, setPregeo] = useState(geo12);
  const [geo, setGeo] = useState(geo12);

  const [places, setPlaces] = useState(['제주특별자치도 제주시 첨단로 242']);
  const [markers, setMarkers] = useState([]);

  function makePolygon(geojson) {
    const data = geojson.features;
    let polygons = [];
    let coordinates = []; // 좌표 저장 배열
    // let name = ''; // 행정구 이름

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
      polygons.push(makePolygon(coordinates));
    });
    return polygons;
  }

  const onChangeZoomLevel = () => {
    const level = map.current.getLevel();
    setMapLevel(level);
  };

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
    //11 mapLevel 13 : 12
    //7 mapLevel 10 : 9
    //1 mapLevel 6 : x
    let geol = geo.length;
    console.log(geol, geolen);
    if (geol === geolen[2]) {
      console.log('12');
      if (0 < mapLevel && mapLevel < 7) {
        setPregeo(geo);
        setGeo(geo0);
      } else if (6 < mapLevel && mapLevel < 11) {
        setPregeo(geo);
        setGeo(geo9);
      }
    } else if (geol === geolen[1]) {
      console.log('9');
      if (0 < mapLevel && mapLevel < 7) {
        setPregeo(geo);
        setGeo(geo0);
      } else if (10 < mapLevel && mapLevel < 14) {
        setPregeo(geo);
        setGeo(geo12);
      }
    } else if (geol === geolen[0]) {
      console.log('0');
      if (6 < mapLevel && mapLevel < 11) {
        setPregeo(geo);
        setGeo(geo9);
      } else if (10 < mapLevel && mapLevel < 14) {
        setPregeo(geo);
        setGeo(geo12);
      }
    }
  }, [mapLevel]);

  useEffect(() => {
    pregeo.forEach((val) => {
      val.setMap(null);
    });
    geo.forEach((val) => {
      val.setMap(map.current);
    });
  }, [geo]);

  useEffect(() => {
    map.current = new kakao.maps.Map(mapContainer.current, mapOption);
    geo.forEach((val) => {
      val.setMap(map.current);
    });

    makeMarkers(places);

    kakao.maps.event.addListener(
      map.current,
      'zoom_changed',
      onChangeZoomLevel,
    );
  }, []);

  return (
    <Container>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      {mapLevel}
    </Container>
  );
};

export default Map;
