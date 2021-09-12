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

const ExperienceProvider = ({ children }) => {
  const [experiences, setExperiences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalContent, setCurrentModalContent] = useState({});

  const count = new Array(17).fill(0);
  const [countExps, setCountExps] = useState([]);
  const mapCenter = [
    '강원',
    '경기',
    '경남',
    '경북',
    '광주',
    '대구',
    '대전',
    '부산',
    '서울',
    '세종',
    '울산',
    '인천',
    '전남',
    '전북',
    '제주',
    '충남',
    '충북',
  ];

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    (async () => {
      const collectionRef = await firestore.collection('experiences').get();
      const docRef = collectionRef.docs;
      docRef.forEach((doc) => {
        const data = doc.data();
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
        mapCenter.forEach((val, idx) => {
          if (val === dis) {
            count[idx] += 1;
          }
        });

        setExperiences((prevState) => [...prevState, exp]);
      });

      count.map((val) => {
        setCountExps((prevState) => [...prevState, val]);
      });
    })();
  }, []);

  return (
    <ExperienceContext.Provider
      value={{
        experiences,
        isModalOpen,
        currentModalContent,
        countExps,

        handleModalOpen,
        handleModalClose,
        setCurrentModalContent,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperienceContext = () => useContext(ExperienceContext);

export default ExperienceProvider;
