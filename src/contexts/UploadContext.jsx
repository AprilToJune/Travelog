import React, { useContext, createContext, useState, useEffect } from 'react';

import ImageUploadSection from 'components/upload/imageUploadSection/';
import TitleSection from 'components/upload/titleSection/';
import DateSection from 'components/upload/dateSection/';
import LocationSection from 'components/upload/locationSection/';
import ResultSection from 'components/upload/resultSection/';

const ContentList = [
  {
    step: 1,
    content: <TitleSection />,
    label: '타이틀',
  },
  {
    step: 2,
    content: <DateSection />,
    label: '날짜',
  },
  {
    step: 3,
    content: <LocationSection />,
    label: '위치',
  },
  {
    step: 4,
    content: <ImageUploadSection />,
    label: '이미지',
  },
  {
    step: 5,
    content: <ResultSection />,
    label: '완성',
  },
];

const UploadContext = createContext({});

const UploadProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [currentSection, SetCurrentSection] = useState(<TitleSection />);
  const [previewURL, setPreviewURL] = useState([]);

  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const [error, setError] = useState('');

  // step에 따라 보여주는 컴포넌트를 바꿈
  useEffect(() => {
    ContentList.forEach((item) => {
      if (item.step === step) SetCurrentSection(item.content);
    });
  }, [step]);

  const validation = () => {
    // title
    if (step === 1) {
      if (!title) {
        setError('타이틀은 필수라구?');
        return false;
      }
      setError('');
      return true;
    }
    // date
    if (step === 2) {
      if (!date) {
        setError('날짜는 필수라구?');
        return false;
      }
      setError('');
      return true;
    }
    // location
    if (step === 3) {
      if (!location) {
        setError('위치는 필수라구?');
        return false;
      }
      setError('');
      return true;
    }
    // image
    if (step === 4) {
      if (!images.length) {
        setError('사진도 필수라고?');
        return false;
      }
      setError('');
      return true;
    }

    return true;
  };

  const onClickNextStep = () => {
    const nextStep = step + 1;
    if (!validation()) return;
    if (nextStep > ContentList.length) return;
    setStep(nextStep);
  };

  const onClickBeforeStep = () => {
    const beforeStep = step - 1;
    setError('');
    if (beforeStep <= 0) return;
    setStep(beforeStep);
  };

  // preview 이미지 파일 생성하는 함수
  const onChangeFileInput = (event) => {
    event.preventDefault();
    const getFile = event.target.files;
    for (let i = 0; i < getFile.length; i += 1) {
      setImages((prevState) => [...prevState, getFile[i]]);
      const imageURL = URL.createObjectURL(getFile[i]);
      setPreviewURL((prevState) => [...prevState, imageURL]);
    }
  };

  return (
    <UploadContext.Provider
      value={{
        previewURL,
        step,
        currentSection,
        ContentList,

        images,
        title,
        date,
        location,
        error,

        setImages,
        setTitle,
        setDate,
        setLocation,

        setPreviewURL,
        setStep,
        onChangeFileInput,
        onClickBeforeStep,
        onClickNextStep,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUploadContext = () => useContext(UploadContext);

export default UploadProvider;
