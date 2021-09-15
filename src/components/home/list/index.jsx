import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import List from 'components/home/list/List';
import Modal from 'components/modal';
import { useExperienceContext } from 'contexts/ExperienceContext';

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.01);
`;

const ListContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  overflow-y: scroll;
`;

const ProgressContainer = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoadingText = styled.span`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


const ExperienceListContainer = () => {
  const { experiences, isDataLoading } = useExperienceContext();

  return (
    <Container>
      <ListContainer>
        {isDataLoading 
        ? (
          <>
            <ProgressContainer>
              <CircularProgress />
            </ProgressContainer>
            <LoadingText>
              우리의 추억을 불러오는중...
            </LoadingText>
          </>
        ) 
        : (
          experiences.map((experience) => {
            const { id, title, startDate, endDate, location, images } = experience;
            return (
              <List
                key={id}
                id={id}
                title={title}
                startDate={startDate}
                endDate={endDate}
                location={location}
                images={images}
              />
            );
          })
        )
      }
        <Modal />
      </ListContainer>
    </Container>
  );
}

export default ExperienceListContainer;
