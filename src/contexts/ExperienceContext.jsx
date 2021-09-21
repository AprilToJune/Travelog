/* eslint-disable */
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import moment from 'moment';
import { firestore } from '../firebaseInit';

const ExperienceContext = createContext({});

const InitialMapLocationCount = {
  '강원': 0,
  '경기': 0,
  '경남': 0,
  '경북': 0,
  '광주': 0,
  '대구': 0,
  '대전': 0,
  '부산': 0,
  '서울': 0,
  '세종': 0,
  '울산': 0,
  '인천': 0,
  '전남': 0,
  '전북': 0,
  '제주': 0,
  '충남': 0,
  '충북': 0,
};

const ExperienceProvider = ({ children }) => {
  // { id: 고유 값, title: 제목, startDate: 시작 날짜, endDate: 끝 날짜, location: 여행 위치, images: 이미지 } = experience;
  const [experiences, setExperiences] = useState([]);
  
  // 모달이 오픈됐는지, 닫혔는지 나타내는 상태 값
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 현재의 모달 컨텐츠가 어떤 것인지 담아줄 상태 갑
  // experiences와 같은 데이터가 들어감 
  const [currentModalContent, setCurrentModalContent] = useState({});
  
  // 데이터가 로딩중인지 확인하는 상태 값 (firebase)
  const [isDataLoading, setIsDataLoading] = useState(false);

  // 현재의 맵에 핀이 어느지역에 몇 개 꽂힐 것인지 확인하는 함수
  const [mapLocationCount, setMapLocationCount] = useState(InitialMapLocationCount);

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // 마커 클릭 시 클릭된 마커의 아이디에 따라 모달을 띄워주는 함수
  const handleMarkerClick = useCallback((getExperienceId) => {
    experiences.forEach((experience) => {
      if (experience.id === getExperienceId) {
        setCurrentModalContent(experience);
        setIsModalOpen(true);
      }
    })
  }, [experiences]);

  const getExperiences = async () => {
    setIsDataLoading(true);
    const collectionRef = await firestore.collection('experiences').get();
    const docRef = collectionRef.docs;
    const promises = [];

    docRef.forEach((doc) => {
      const data = doc.data();
      promises.push(data);
      const exp = {
        id: doc.id,
        title: data.title,
        location: data.location,
        startDate: moment
          .unix(data.startDate.seconds)
          .format('YYYY년 MM월 DD일'),
        endDate: moment.unix(data.endDate.seconds).format('YYYY년 MM월 DD일'),
        images: data.images,
      };

      const region = data.location.split(' ')[0];
      InitialMapLocationCount[region] += 1;
      setMapLocationCount(InitialMapLocationCount);
      setExperiences((prevState) => [...prevState, exp]);
    });

    Promise.all(promises)
      .then(() => {
        setIsDataLoading(false);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getExperiences();
  }, []);

  return (
    <ExperienceContext.Provider
      value={{
        experiences,
        isModalOpen,
        currentModalContent,
        mapLocationCount,
        isDataLoading,

        handleModalOpen,
        handleModalClose,
        setCurrentModalContent,
        getExperiences,
        handleMarkerClick,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperienceContext = () => useContext(ExperienceContext);

export default ExperienceProvider;
