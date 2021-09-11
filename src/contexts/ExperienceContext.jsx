/* eslint-disable */
import React, { useContext, createContext, useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import { firestore } from '../firebaseInit';

const ExperienceContext = createContext({});

const ExperienceProvider = ({ children }) => {
  const [experiences, setExperiences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalContent, setCurrentModalContent] = useState({});

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
          startDate: moment.unix(data.startDate.seconds).format('YYYY년 MM월 DD일'),
          endDate: moment.unix(data.endDate.seconds).format('YYYY년 MM월 DD일'),
          images: data.images,
        }
        setExperiences((prevState) => [...prevState, exp]);
      });
    })();
  }, []);

  return (
    <ExperienceContext.Provider
      value={{
        experiences,
        isModalOpen,
        currentModalContent,

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
