import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import ImageUploadSection from 'components/upload/imageUploadSection/';
import TitleSection from 'components/upload/titleSection/';
import DateSection from 'components/upload/dateSection/';
import LocationSection from 'components/upload/locationSection/';

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
];

const UploadContext = createContext({});

const UploadProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [currentSection, SetCurrentSection] = useState(<TitleSection />);
  const [images, setImages] = useState([]);
  const [previewURL, setPreviewURL] = useState([]);

  // step에 따라 보여주는 컴포넌트를 바꿈
  useEffect(() => {
    ContentList.forEach((item) => {
      if (item.step === step) SetCurrentSection(item.content);
    });
  }, [step]);

  const onClickNextStep = useCallback(() => {
    const nextStep = step + 1;
    if (nextStep > ContentList.length) return;
    setStep(nextStep);
  }, [step]);

  const onClickBeforeStep = useCallback(() => {
    const beforeStep = step - 1;
    if (beforeStep <= 0) return;
    setStep(beforeStep);
  }, [step]);

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
        images,
        previewURL,
        step,
        currentSection,
        ContentList,

        setImages,
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
