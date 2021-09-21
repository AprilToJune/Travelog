import React, { createContext, useState, useContext } from "react";

const KakaoMapStateContext = createContext(null);
const KakaoMapDispatchContext = createContext(null);

const KakaoMapProvider = ({ children }) => {
  const [map, setMap] = useState(null);
  const [mapZoomLevel, setMapZoomLevel] = useState();

  /* 각각의 오브젝트들을 담아줄 배열 */
  const [polygons, setPolygons] = useState([]);
  const [overlays, setOverlays] = useState([]);
  const [markers, setMarkers] = useState([]);

  /* mapZoomLevel에 따라서 바뀌는 변수들 */
  const [isVisiblePolygon, setIsVisiblePolygon] = useState(true);
  const [isVisibleOverlay, setIsVisibleOverlay] = useState(true);
  const [isVisibleMarker, setIsVisibleMarker] = useState(false);

  return (
    /* state provider */
    <KakaoMapStateContext.Provider value={{ 
        map,
        mapZoomLevel,
        polygons,
        overlays,
        markers,
        isVisiblePolygon,
        isVisibleMarker,
        isVisibleOverlay,
    }}>
      {/* function provider */}
      <KakaoMapDispatchContext.Provider value={{ 
        setMap,
        setMapZoomLevel,
        setPolygons,
        setOverlays,
        setMarkers,
        setIsVisiblePolygon,
        setIsVisibleMarker,
        setIsVisibleOverlay,
      }}>
        {children}
      </KakaoMapDispatchContext.Provider>
    </KakaoMapStateContext.Provider>
  );
}

export default KakaoMapProvider;

export function useKakaoMapState() {
  const state = useContext(KakaoMapStateContext);
  if (!state) throw new Error('Cannot find useKakaoMapState'); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useKakaoMapDispatch() {
  const dispatch = useContext(KakaoMapDispatchContext);
  if (!dispatch) throw new Error('Cannot find useKakaoMapDispatch'); // 유효하지 않을땐 에러를 발생
  return dispatch;
}
