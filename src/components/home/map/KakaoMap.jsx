/* global kakao */
import React, { useRef, useEffect } from 'react';
import { useKakaoMapState, useKakaoMapDispatch } from 'contexts/KakaoMapContext';

const mapInitialState = {
  center: new kakao.maps.LatLng(35.93450063771281, 127.75854915532611), // 지도의 중심좌표
  level: 13, // 지도의 확대 레벨,

  /* 맵 처음 값
  center LatLng : 중심 좌표 (필수)
  level Number : 확대 수준 (기본값: 3)
  mapTypeId MapTypeId : 지도 종류 (기본값: 일반 지도)
  draggable Boolean : 마우스 드래그, 휠, 모바일 터치를 이용한 시점 변경(이동, 확대, 축소) 가능 여부
  scrollwheel Boolean : 마우스 휠, 모바일 터치를 이용한 확대 및 축소 가능 여부
  disableDoubleClick Boolean : 더블클릭 이벤트 및 더블클릭 확대 가능 여부
  disableDoubleClickZoom Boolean : 더블클릭 확대 가능 여부
  projectionId String : 투영법 지정 (기본값: kakao.maps.ProjectionId.WCONG)
  tileAnimation Boolean : 지도 타일 애니메이션 설정 여부 (기본값: true)
  keyboardShortcuts Boolean | Object : 키보드의 방향키와 +, – 키로 지도 이동,확대,축소 가능 여부 (기본값: false)
  speed Number : 지도 이동 속도
  */
};

const KakaoMap = ({ children }) => {
  const container = useRef(null);
  const { map } = useKakaoMapState();
  const { setMap } = useKakaoMapDispatch();

  useEffect(() => {
    if (!window.kakao) {
      console.warn("kakao map javascript api를 먼저 불러와야 합니다. `https://apis.map.kakao.com/web/guide`");
      return;
    }

    kakao.maps.load(() => {
      kakao.maps.disableHD(); // 고화질이 아닌 저화질로 불러옴 (속도를 위해)
      const kakaoMap = new kakao.maps.Map(container.current, mapInitialState);
      setMap(kakaoMap);
    })
  }, []);

  return (
    <>
      <div ref={container} style={{ width: '100%', height: '100%' }} />
      {map && children}
    </>
  );
}

export default KakaoMap;

