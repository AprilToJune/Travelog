/* global kakao */
import { useEffect } from 'react';
import { useKakaoMapState, useKakaoMapDispatch } from 'contexts/KakaoMapContext';
import { useExperienceContext } from 'contexts/ExperienceContext';

// lat, log을 props로 받음
/* 마커 컴포넌트 (클릭 시 경험 모달 띄움) */ 
const Marker = ({ experiences }) => {
  const { map, isVisibleMarker, markers } = useKakaoMapState();
  const { setMarkers } = useKakaoMapDispatch();
  const { handleMarkerClick } = useExperienceContext();

  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder(); // 문자열을 좌표값으로 변환
    experiences.forEach((experience) => {
      geocoder.addressSearch(experience.location, (result, status) => {
        // 정상적으로 검색이 완료
        if (status === kakao.maps.services.Status.OK) {
          const position = new kakao.maps.LatLng(result[0].y, result[0].x);
          const marker = new kakao.maps.Marker({
            position,
            title: experience.id,
          });

          // 마커 클릭 시 모달을 띄우는 로직을 추가해줌
          kakao.maps.event.addListener(marker, 'click', () => {
            const experienceId = marker.Fb;
            handleMarkerClick(experienceId);
          });
          
          // marker 집합을 markers에 저장
          setMarkers((PreState) => [...PreState, marker]);
        }
      });
    });
  }, [map, experiences]);

  /* 
    isVisibleMarker 바뀔 때마다 동작 
    isVisibleMarker는 ZoomLevelControler에서 조정
  */
  useEffect(() => {
    if (isVisibleMarker) markers.forEach((marker) => marker.setMap(map));
    else markers.forEach((marker) => marker.setMap(null));
  }, [isVisibleMarker]);

  return null;
}

export default Marker;
