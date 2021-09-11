import React from 'react';
import styled from 'styled-components';
import { useUploadContext } from 'contexts/UploadContext';
import SubmitButton from 'components/upload/resultSection/SubmitButton';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PreviewImage = styled.img`
  width: 20vw;
  height: 20vw;
  object-fit: contain;
`;

const PreviewImageContainer = styled.div`
  width: 83vw;
  overflow: scroll;
  overflow-y: hidden;
  display: flex;
  row-gap: 1vw;
`;

const ResultSection = () => {
  const { previewURL, title, startFormattedDate, endFormattedDate, location } =
    useUploadContext();
  return (
    <Container>
      <div>타이틀: {title}</div>
      <div>여행 시작 날짜: {startFormattedDate}</div>
      <div>여행 종료 날짜: {endFormattedDate}</div>
      <div>여행 위치: {location}</div>
      <PreviewImageContainer>
        {previewURL.map((item) => (
          <PreviewImage key={item.url} alt="preview_image" src={item.url} />
        ))}
      </PreviewImageContainer>
      <SubmitButton />
    </Container>
  );
};

export default ResultSection;
