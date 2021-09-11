import React, { useCallback } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

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
  const { title, startDate, endDate, location, images } = useUploadContext();
  const history = useHistory();

  const onClickButton = useCallback(async () => {
    const promises = [];
    const newURLs = [];
    const experienceData = {
      title,
      location,
      startDate,
      endDate,
      images: [],
    };

    const collectionRef = firestore.collection('experiences');
    const docRef = await collectionRef.add(experienceData);

    images.forEach((item, index) => {
      const uploadTask = storage
        .ref(`images/${docRef.id}/${item.image.name}`)
        .put(item.image);

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
            .child(item.image.name)
            .getDownloadURL();

          // 새로운 데이터
          const newData = {
            index,
            url,
          };

          newURLs.push(newData);

          if (newURLs.length === images.length) {
            // Document Image에 방금 업로드 된 URL 추가
            newURLs.sort((a, b) => a.index - b.index);

            collectionRef
              .doc(docRef.id)
              .set({ images: newURLs }, { merge: true });
          }
        },
      );
    });

    Promise.all(promises)
      .then(() => {
        console.log('업로드 완료!');
        history.replace('/');
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <Container onClick={onClickButton} variant="contained" color="primary">
      등록하기
    </Container>
  );
};
export default SubmitButton;
