import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
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

const LoadingContainer = styled.div`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 10;
`;

const LinearProgressBarContaienr = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50vw;
  z-index: 10;
`;

const Count = styled.div`
  color: white;
  font-size: 32px;
  font-weight: bold;
`;

const SubmitButton = () => {
  const { title, startDate, endDate, location, images, resetUploadDate } = useUploadContext();
  const history = useHistory();
  const [uploadProgressCount, setUploadProgressCount] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const onClickButton = useCallback(async () => {
    setIsUploading(true);
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
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgressCount(progress);
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
        setIsUploading(false);
        alert('업로드 완료!');
        resetUploadDate();
        history.replace('/');
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <>
      <Container onClick={onClickButton} variant="contained" color="primary">
        등록하기
      </Container>
      {isUploading && (
        <LoadingContainer>
          <LinearProgressBarContaienr>
            <Count>{uploadProgressCount}%</Count>
            <LinearProgress variant="determinate" color="secondary" value={uploadProgressCount} />
          </LinearProgressBarContaienr>
        </LoadingContainer>
      )}
    </>
  );
};
export default SubmitButton;
