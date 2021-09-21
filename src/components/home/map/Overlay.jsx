/* global kakao */
import { useEffect } from 'react';
import { useKakaoMapState, useKakaoMapDispatch } from 'contexts/KakaoMapContext';

/* 줌 레벨 9 이상일 때 지역에 몇 개 있는지 띄우는 오버레이 */
const Overlay = ({ lat, lng, level, mapLocationCount }) => {
  const { map, isVisibleOverlay, overlays } = useKakaoMapState();
  const { setOverlays } = useKakaoMapDispatch();

  useEffect(() => {
    const content = document.createElement('div');
    content.style =
      'height: 27px; width: 30px; border-radius: 50%; text-align: center; padding-top:2px; font-weight: bold; background-color: #09f; color: white;';
    content.innerHTML = mapLocationCount;

    content.addEventListener('click', () => {
      const moveCenter = new kakao.maps.LatLng(
        lat,
        lng,
      );
      map.setCenter(moveCenter);
      map.setLevel(level);
    });

    const overlay = new kakao.maps.CustomOverlay({
      map,
      position: new kakao.maps.LatLng(lat, lng),
      content,
      zIndex: 10,
    });

    // numberOfmarker 집합을 numberOfmarkers에 저장
    setOverlays((PreState) => [...PreState, overlay]);
  }, [map, mapLocationCount]);

  /* 
    isVisibleOverlay 바뀔 때마다 동작 
    isVisibleOverlay는 ZoomLevelControler에서 조정
  */
  useEffect(() => {
    if (isVisibleOverlay) overlays.forEach((overlay) => overlay.setMap(map));
    else overlays.forEach((overlay) => overlay.setMap(null));
  }, [isVisibleOverlay]);

  return null;
}

export default Overlay;
