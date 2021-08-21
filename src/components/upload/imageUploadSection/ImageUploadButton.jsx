/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useUploadContext } from 'contexts/UploadContext';

const Container = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  flex-direction: column;
`;

const FileInput = styled.input`
  background-color: rgba(0, 0, 0, 0.1);
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

const Error = styled.div`
  color: #fc1111;
`;

const ImageUploadButton = () => {
  const { previewURL, onChangeFileInput, error } = useUploadContext();

  return (
    <Container>
      <PreviewImageContainer>
        {previewURL.map((url) => {
          return <PreviewImage key={url} src={url} alt="preview_image" />;
        })}
      </PreviewImageContainer>
      <FileInput
        accept="image/jpg,image/png,image/jpeg,image/gif"
        multiple
        type="file"
        onChange={onChangeFileInput}
      />
      <Error>{error ? error : ''}</Error>
    </Container>
  );
};

export default ImageUploadButton;
