/* global kakao */
import { useEffect } from 'react';
import { useKakaoMapState, useKakaoMapDispatch } from 'contexts/KakaoMapContext';

/* lat, log을 props로 받음 */
const ZoomLevelControler = () => {
  const { map, mapZoomLevel } = useKakaoMapState();
  const { setMapZoomLevel, setIsVisibleOverlay, setIsVisiblePolygon, setIsVisibleMarker } = useKakaoMapDispatch();

  /* 맵이 맨 처음 생성될 때 이벤트 리스너 추가 */ 
  useEffect(() => {
    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      const level = map.getLevel();
      console.log(level);
      setMapZoomLevel(level);
    });
  }, [map]);

  /* 줌 레벨에 따라 마커를 보여줄 지, 오버레이를 보여줄 지 결정 */
  useEffect(() => {
    /* 마커 조정 */
    if (mapZoomLevel <= 9) {
      setIsVisibleMarker(true);
      setIsVisiblePolygon(false);
      setIsVisibleOverlay(false);
    } else {
      setIsVisibleMarker(false);
      setIsVisiblePolygon(true);
      setIsVisibleOverlay(true);
    }
  }, [mapZoomLevel]);

  return null;
}

export default ZoomLevelControler;
