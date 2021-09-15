/* global kakao */ /* eslint-disable */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import geojson12 from 'lib/TL_SCCO_CTPRVN.json';
import { useExperienceContext } from 'contexts/ExperienceContext';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const mapOption = {
  center: new kakao.maps.LatLng(35.93450063771281, 127.75854915532611), // 지도의 중심좌표
  level: 13, // 지도의 확대 레벨
};

const centerOfRegions = [
  ['강원', 11, 128.32481502321897, 37.80488331383935],
  ['경기', 11, 127.10939551302752, 37.572406668451116],
  ['경남', 11, 128.36784396735032, 35.34078921005318],
  ['경북', 11, 128.6902100671252, 36.37366077067553],
  ['광주', 8, 126.83299766029563, 35.15790543546186],
  ['대구', 9, 128.55993267501816, 35.80967624691683],
  ['대전', 9, 127.38570543814956, 36.346354640017324],
  ['부산', 9, 129.05194055177546, 35.19759612949504],
  ['서울', 9, 126.98044296615916, 37.55803979640168],
  ['세종', 9, 127.26207540326605, 36.578252094229235],
  ['울산', 9, 129.22476602714622, 35.53047430858697],
  ['인천', 10, 126.42446431505151, 37.51800427453422],
  ['전남', 11, 126.70989589747093, 34.860434760985726],
  ['전북', 10, 127.12624295499178, 35.71042661295992],
  ['제주', 10, 126.54177540788722, 33.40915067864407],
  ['충남', 11, 126.88960399724316, 36.51966196080457],
  ['충북', 11, 127.82341585111794, 36.68036947587705],
];

const Map = () => {
  const [mapLevel, setMapLevel] = useState(12);
  const { experiences, mapLocationCount, isDataLoading, handleMarkerClick } = useExperienceContext();
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [polygons, setPolygons] = useState([]);
  const [numberOfmarkers, setNumberOfmarkers] = useState([]);
  const [markers, setMarkers] = useState([]);

  const [preLevel_Polygon, setPreLevel_Polygons] = useState(13);
  const [preLevel_NumberOfMarkers, setPreLevel_NumberOfMarkers] = useState(12);

  const [changePlace, setChangePlace] = useState(16);

  //지도 영역을 결정하는 polygon을 생성하여 지도
  function makePolygon(geojson) {
    const data = geojson.features;
    let coordi = []; // 좌표 저장 배열

    //data 순서
    //강원도, 경기도, 경상남도, 경상북도, 광주, 대구, 대전, 부산, 서울, 세종, 울산, 인천, 전라남도, 전라북도, 제주도, 충청남도, 충청북도
    data.forEach((val, idx) => {
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
        path,
        strokeWeight: 2,
        strokeColor: '#004c80',
        strokeOpacity: 0.5,
        strokeStyle: 'solid',
        fillColor: '#fff',
        fillOpacity: 0.4,
      });

      kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
        polygon.setOptions({ fillColor: '#09f' });
      });

      kakao.maps.event.addListener(polygon, 'mouseout', function () {
        polygon.setOptions({ fillColor: '#fff' });
      });

      //지역을 클릭하면, 해당 지역으로 확대
      kakao.maps.event.addListener(polygon, 'click', function () {
        var moveCenter = new kakao.maps.LatLng(
          centerOfRegions[idx][3],
          centerOfRegions[idx][2],
        );
        map.current.setCenter(moveCenter);
        map.current.setLevel(centerOfRegions[idx][1]);

        setChangePlace(idx);
      });

      //polygon 집합을 Polygons에 저장
      setPolygons((PreState) => [...PreState, polygon]);
      polygon.setMap(map.current);
    });
  }

  //exp를 지역별로 숫자로 표현하는 numberOfmarker 생성하여 지도 위에
  useEffect(() => {
    centerOfRegions.forEach((center, idx) => {
      mapLocationCount.forEach((val) => {
        if (center[0] === val.location) {
          //numberOfmarkers의 구성
          const content = document.createElement('div');
          content.style =
            'height: 27px; width: 30px; border-radius: 50%; text-align: center; padding-top:2px; font-weight: bold; background-color: #09f; color: white';
          content.innerHTML = val.count;
          content.addEventListener('click', function () {
            var moveCenter = new kakao.maps.LatLng(
              centerOfRegions[idx][3],
              centerOfRegions[idx][2],
            );
            map.current.setCenter(moveCenter);
            map.current.setLevel(centerOfRegions[idx][1]);

            setChangePlace(idx);
          });

          //numberOfmarkers 생성
          const position = new kakao.maps.LatLng(center[3], center[2]);
          const numberOfmarker = new kakao.maps.CustomOverlay({
            map: map.current,
            position,
            content,
          });
          //numberOfmarker 집합을 numberOfmarkers에 저장
          setNumberOfmarkers((PreState) => [...PreState, numberOfmarker]);
        }
      });
    });
  }, [isDataLoading]);

  //exp를 지역별로 마커로 표현하는 marker를 생성하여 지도 위에
  useEffect(() => {
    // markers.forEach((val) => {
    //   val.setMap(null);
    // });
    // setMarkers([]);

    const geocoder = new kakao.maps.services.Geocoder(); //문자열을 좌표값으로 변환
    experiences.forEach((exp) => {
      //이 부근에서 TypeError: Cannot read properties of undefined (reading '0')
      const dis = exp.location.split(' ')[0];
      console.log('dis', dis);
      if (centerOfRegions[changePlace][0] === dis) {
        geocoder.addressSearch(exp.location, function (result, status) {
          // 정상적으로 검색이 완료
          if (status === kakao.maps.services.Status.OK) {
            const position = new kakao.maps.LatLng(result[0].y, result[0].x);
            const marker = new kakao.maps.Marker({
              map: map.current,
              position,
              title: exp.id,
            });

            //마커 클릭 시 모달을 띄우는 로직을 추가해줌
            kakao.maps.event.addListener(marker, 'click', () => {
              const experienceId = marker.Fb;
              handleMarkerClick(experienceId);
            });
            
            //marker 집합을 markers에 저장
            setMarkers((PreState) => [...PreState, marker]);
          }
        });
      }
    });
  }, [changePlace]);

  useEffect(() => {
    //지도 확대 레벨에 따라, numberOfMarkers의 유무를 결정
    if (preLevel_NumberOfMarkers == 0 && 12 == mapLevel) {
      setPreLevel_NumberOfMarkers(12);
      if (markers.length) {
        markers.forEach((val) => {
          val.setMap(null);
        });
      }
      numberOfmarkers.forEach((val) => {
        val.setMap(map.current);
      });
    } else if (mapLevel < 12 && preLevel_NumberOfMarkers == 12) {
      setPreLevel_NumberOfMarkers(0);
      numberOfmarkers.forEach((val) => {
        val.setMap(null);
      });
    }
    //지도 확대 레벨에 따라, polygons의 유무를 결정
    if (preLevel_Polygon == 0 && 8 <= mapLevel) {
      setPreLevel_Polygons(13);
      polygons.forEach((val) => {
        val.setMap(map.current);
      });
    } else if (mapLevel < 8 && 13 == preLevel_Polygon) {
      setPreLevel_Polygons(0);
      polygons.forEach((val) => {
        val.setMap(null);
      });
    }
  }, [mapLevel]);

  useEffect(() => {
    map.current = new kakao.maps.Map(mapContainer.current, mapOption);
    makePolygon(geojson12);

    kakao.maps.event.addListener(map.current, 'zoom_changed', function () {
      const level = map.current.getLevel();
      setMapLevel(level);
    });
  }, []);

  return (
    <Container>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
    </Container>
  );
};

export default Map;
