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
  object-fit: cover;
`;

const PreviewImageContainer = styled.div`
  width: 83vw;
  overflow: scroll;
  overflow-y: hidden;
  display: flex;
  row-gap: 1vw;
`;

const ResultSection = () => {
  const { previewURL, title, date, location } = useUploadContext();
  return (
    <Container>
      <div>{title}</div>
      <div>{date}</div>
      <div>{location}</div>
      <PreviewImageContainer>
        {previewURL.map((url) => (
          <PreviewImage key={url} alt="preview_image" src={url} />
        ))}
      </PreviewImageContainer>
      <SubmitButton />
    </Container>
  );
};

export default ResultSection;
