/* eslint-disable */
import React, { useCallback } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { storage, firestore } from 'firebaseInit';
import { useUploadContext } from 'contexts/UploadContext';

const Container = styled(Button)`
  position: absolute;
  width: 50%;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
`;

const SubmitButton = () => {
  const { title, date, location, images } = useUploadContext();

  const onClickButton = useCallback(async () => {
    const promises = [];
    const experienceData = {
      title,
      location,
      date,
      images: [],
    };

    const collectionRef = firestore.collection('experiences');
    const docRef = await collectionRef.add(experienceData);

    images.forEach((image) => {
      const uploadTask = storage
        .ref(`images/${docRef.id}/${image.name}`)
        .put(image);

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
          // URL 받아오기
          const url = await storage
            .ref(`images/${docRef.id}`)
            .child(image.name)
            .getDownloadURL();

          // Document Image 데이터 받아오기
          const { images } = await firestore
            .collection('experiences')
            .doc(docRef.id)
            .get()
            .then((doc) => {
              return doc.data();
            });

          // Document Image에 방금 업로드 된 URL 추가
          collectionRef
            .doc(docRef.id)
            .set({ images: [...images, url] }, { merge: true });
        },
      );
    });

    Promise.all(promises)
      .then(() => alert('다 됐어요'))
      .catch((err) => alert(err));
  }, []);

  return (
    <Container onClick={onClickButton} variant="contained" color="primary">
      등록하기
    </Container>
  );
};
export default SubmitButton;
