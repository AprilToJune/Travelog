import React, { createContext, useReducer, useContext } from "react";

const KakaoMapStateContext = createContext(null);
const KakaoMapDispatchContext = createContext(null);

// 리듀서
function reducer(state, action) {
  switch (action.type) {
    case 'SET_COUNT':
      return {
        ...state,
        count: action.count // count가 자동완성되며, number 타입인걸 알 수 있습니다.
      };
    default:
      throw new Error('Unhandled action');
  }
}

const KakaoMapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    map: null,
  });
  
  return (
    <KakaoMapStateContext.Provider value={state}>
      <KakaoMapDispatchContext.Provider value={dispatch}>
        {children}
      </KakaoMapDispatchContext.Provider>
    </KakaoMapStateContext.Provider>
  );
}

export default KakaoMapProvider;

export function useKakaoMapState() {
  const state = useContext(KakaoMapStateContext);
  if (!state) throw new Error('Cannot find SampleProvider'); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useKakaoMapDispatch() {
  const dispatch = useContext(KakaoMapDispatchContext);
  if (!dispatch) throw new Error('Cannot find SampleProvider'); // 유효하지 않을땐 에러를 발생
  return dispatch;
}
