import React from 'react';
import styled from 'styled-components';
import { useUploadContext } from 'contexts/UploadContext';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ResultSection = () => {
  const { previewURL, title, date, location } = useUploadContext();
  return (
    <Container>
      <div>{title}</div>
      <div>{date}</div>
      <div>{location}</div>
      {previewURL.map((url) => (
        <div>
          <img alt="preview_image" src={url} />
        </div>
      ))}
    </Container>
  );
};

export default ResultSection;
