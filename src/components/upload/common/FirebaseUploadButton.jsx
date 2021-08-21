import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { storage } from 'firebaseInit';
import { useUploadContext } from 'contexts/UploadContext';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 5;
  padding: 10px;
  margin: 5px;
`;

const FirebaseUploadButton = () => {
  const { images } = useUploadContext();
  const promises = [];

  const onClickButton = () => {
    images.forEach((image) => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        'stage_changed',
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
            });
          console.log('업로드 끝');
        },
      );
    });
    Promise.all(promises)
      .then(() => alert('다 됐어요'))
      .catch((err) => alert(err));
  };

  return (
    <Container>
      <Button onClick={onClickButton} variant="contained" color="secondary">
        파이어베이스 업로드
      </Button>
    </Container>
  );
};

export default FirebaseUploadButton;
