/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 84vw;
  height: 100%;
  flex-direction: column;
`;

const FileInput = styled.input`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%);
  background-color: rgba(0, 0, 0, 0.1);
`;

const PreviewImage = styled.img`
  width: 20vw;
  height: 20vw;
  object-fit: cover;
`;

const PreviewImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 1vw;
  column-gap: 1vw;
  align-items: center;
`;

const ImageUploadButton = () => {
  const [files, setFiles] = useState([]);
  const [previewURL, setPreviewURL] = useState([]);

  const onChangeFileInput = (event) => {
    event.preventDefault();
    const getFile = event.target.files;
    for (let i = 0; i < getFile.length; i++) {
      setFiles((prevState) => [...prevState, getFile[i]]);
      const imageURL = URL.createObjectURL(getFile[i]);
      setPreviewURL((prevState) => [...prevState, imageURL]);
    }
  };
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
    </Container>
  );
};

export default ImageUploadButton;
