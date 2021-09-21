/* global kakao */
import { useEffect } from 'react';
import { useKakaoMapState, /* useKakaoMapDispatch */ } from 'contexts/KakaoMapContext';
// import { CENTER_OF_REGINOS } from 'constants/index';

// lat, log을 props로 받음
const Marker = ({ lat, lng }) => {
  const { map } = useKakaoMapState();
  // const { setNumberOfmarkers } = useKakaoMapDispatch();

  useEffect(() => {
    const content = document.createElement('div');
    content.style =
      'height: 27px; width: 30px; border-radius: 50%; text-align: center; padding-top:2px; font-weight: bold; background-color: #09f; color: white;';
    content.innerHTML = 3;
    // content.addEventListener('click', function () {
    //   var moveCenter = new kakao.maps.LatLng(
    //     centerOfRegions[idx][3],
    //     centerOfRegions[idx][2],
    //   );
    //   map.current.setCenter(moveCenter);
    //   map.current.setLevel(centerOfRegions[idx][1]);

    //   setChangePlace(idx);
    // });

    const numberOfmarker = new kakao.maps.CustomOverlay({
      map,
      position: new kakao.maps.LatLng(lat, lng),
      content,
      zIndex: 10,
    });

    numberOfmarker.setMap(map);

    // numberOfmarker 집합을 numberOfmarkers에 저장
    // setNumberOfmarkers((PreState) => [...PreState, numberOfmarker]);
  }, [map]);

  return null;
}

export default Marker;
