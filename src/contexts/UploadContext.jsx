import React, { useContext, createContext, useState, useEffect } from 'react';
import moment from 'moment';

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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startFormattedDate, setStartFormattedDateDate] = useState(new Date());
  const [endFormattedDate, setEndFormattedDate] = useState(new Date());
  const [location, setLocation] = useState('');

  const [error, setError] = useState('');

  // moment로 formating 하기
  useEffect(() => {
    const format = 'YYYY/MM/DD';
    setStartFormattedDateDate(moment(startDate).format(format));
    setEndFormattedDate(moment(endDate).format(format));
  }, [startDate, endDate]);

  // step에 따라 보여주는 컴포넌트를 바꿈
  useEffect(() => {
    ContentList.forEach((item) => {
      if (item.step === step) SetCurrentSection(item.content);
    });
  }, [step]);

  /* 업로드 완료시 데이터 초기화 */
  const resetUploadDate = () => {
    setImages([]);
    setTitle('');
    setStartDate(new Date());
    setEndDate(new Date());
    setStartFormattedDateDate(new Date());
    setEndFormattedDate(new Date());
    setLocation('');
    setError('');
  }

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
      if (!startDate) {
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
      const names = images.map((image) => image.id);
      if (names.includes(getFile[i].name)) {
        console.log('똑같은 이미지가 있습니다.'); // eslint-disable-line
      } else {
        setImages((prevState) => [
          ...prevState,
          { id: getFile[i].name, image: getFile[i] },
        ]);
        const imageURL = URL.createObjectURL(getFile[i]);
        setPreviewURL((prevState) => [
          ...prevState,
          { id: getFile[i].name, url: imageURL },
        ]);
      }
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
        startDate,
        startFormattedDate,
        endDate,
        endFormattedDate,
        location,
        error,

        setImages,
        setTitle,
        setStartDate,
        setEndDate,
        setLocation,

        setPreviewURL,
        setStep,
        onChangeFileInput,
        onClickBeforeStep,
        onClickNextStep,
        resetUploadDate,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUploadContext = () => useContext(UploadContext);

export default UploadProvider;
