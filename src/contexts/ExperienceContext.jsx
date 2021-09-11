/* eslint-disable */
import React, { useContext, createContext, useState, useEffect } from 'react';
import moment from 'moment';
import { firestore } from '../firebaseInit';

const ExperienceContext = createContext({});

const ExperienceProvider = ({ children }) => {
  const [experiences, setExperiences] = useState([]);

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
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperienceContext = () => useContext(ExperienceContext);

export default ExperienceProvider;
