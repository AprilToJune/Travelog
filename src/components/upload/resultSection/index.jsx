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

const IndexOfImage = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;
  margin: 10px;
  border-radius: 50%;
  color: black;
  font-size: 32px;
  font-weight: bold;
`;

const PreviewImageContainer = styled.div`
  position: relative;
`;

const PreviewImageListContainer = styled.div`
  position: relative;
  display: flex;
  overflow: scroll;
  overflow-y: hidden;
  width: 83vw;
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
      <PreviewImageListContainer>
        {previewURL.map((item, index) => (
          <PreviewImageContainer key={item.url}>
            <IndexOfImage>
              {index}
            </IndexOfImage>
            <PreviewImage alt="preview_image" src={item.url} />
          </PreviewImageContainer>
        ))}
      </PreviewImageListContainer>
      <SubmitButton />
    </Container>
  );
};

export default ResultSection;
