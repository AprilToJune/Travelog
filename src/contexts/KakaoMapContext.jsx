import React, { createContext, useState, useContext } from "react";

const KakaoMapStateContext = createContext(null);
const KakaoMapDispatchContext = createContext(null);

const KakaoMapProvider = ({ children }) => {
  const [map, setMap] = useState(null);
  const [polygon, setPolygon] = useState([]);
  const [numberOfmarkers, setNumberOfmarkers] = useState([]);
  const [markers, setMarkers] = useState([]);

  const [preLevelPolygon, setPreLevelPolygons] = useState(13);
  const [preLevelNumberOfMarkers, setPreLevelNumberOfMarkers] = useState(12);

  const [changePlace, setChangePlace] = useState(16);

  return (
    // state provider
    <KakaoMapStateContext.Provider value={{ 
        map,
        polygon,
        numberOfmarkers,
        markers,
        preLevelPolygon,
        preLevelNumberOfMarkers,
        changePlace,
    }}>
      {/* function provider */}
      <KakaoMapDispatchContext.Provider value={{ 
        setMap,
        setPolygon,
        setNumberOfmarkers,
        setMarkers,
        setPreLevelPolygons,
        setPreLevelNumberOfMarkers,
        setChangePlace,
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
