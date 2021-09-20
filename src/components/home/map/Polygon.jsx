/* global kakao */
import { useEffect } from 'react';
import { useKakaoMapState, useKakaoMapDispatch } from 'contexts/KakaoMapContext';
import GEO_JSON from 'lib/TL_SCCO_CTPRVN.json';
import { CENTER_OF_REGINOS } from 'constants/index';

const Polygon = () => {
  const { map } = useKakaoMapState();
  const { setPolygon, setChangePlace } = useKakaoMapDispatch();

  function makePolygon() {
    const data = GEO_JSON.features;
    let coordi = []; // 좌표 저장 배열

    // 강원도, 경기도, 경상남도, 경상북도, 광주, 대구, 대전, 부산, 서울, 세종, 울산, 인천, 전라남도, 전라북도, 제주도, 충청남도, 충청북도
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

      kakao.maps.event.addListener(polygon, 'mouseover', () => {
        polygon.setOptions({ fillColor: '#09f' });
      });

      kakao.maps.event.addListener(polygon, 'mouseout', () => {
        polygon.setOptions({ fillColor: '#fff' });
      });

      // 지역을 클릭하면, 해당 지역으로 확대
      kakao.maps.event.addListener(polygon, 'click', () => {
        const moveCenter = new kakao.maps.LatLng(
          CENTER_OF_REGINOS[idx][3],
          CENTER_OF_REGINOS[idx][2],
        );
        map.setCenter(moveCenter);
        map.setLevel(CENTER_OF_REGINOS[idx][1]);

        setChangePlace(idx);
      });

      // polygon 집합을 Polygons에 저장
      setPolygon((PreState) => [...PreState, polygon]);
      polygon.setMap(map);
    });
  }

  useEffect(() => {
    makePolygon();
  }, [map])

  return null;
}

export default Polygon;
