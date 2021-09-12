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
  const [experiences, setExperiences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalContent, setCurrentModalContent] = useState({});
  const [dataLoading, setDataLoading] = useState(false);

  const [mapLocationCount, setMapLocationCount] = useState([]);

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const getExperiences = async () => {
    setDataLoading(true);
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
        console.log('다 가져옴');
        setDataLoading(false);
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
        dataLoading,

        handleModalOpen,
        handleModalClose,
        setCurrentModalContent,
        getExperiences,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperienceContext = () => useContext(ExperienceContext);

export default ExperienceProvider;
