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

const MapLocationCount = [
  { location: '강원', count: 0 },
  { location: '경기', count: 0 },
  { location: '경남', count: 0 },
  { location: '경북', count: 0 },
  { location: '광주', count: 0 },
  { location: '대구', count: 0 },
  { location: '대전', count: 0 },
  { location: '부산', count: 0 },
  { location: '서울', count: 0 },
  { location: '세종', count: 0 },
  { location: '울산', count: 0 },
  { location: '인천', count: 0 },
  { location: '전남', count: 0 },
  { location: '전북', count: 0 },
  { location: '제주', count: 0 },
  { location: '충남', count: 0 },
  { location: '충북', count: 0 },
];

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
  const [mapLocationCount, setMapLocationCount] = useState([]);

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

      const dis = data.location.split(' ')[0];
      MapLocationCount.forEach((val) => {
        if (val.location === dis) {
          val.count += 1;
          setMapLocationCount((prevState) => [...prevState, val]);
        }
      });
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
