import React from 'react';
import styled from 'styled-components';

import List from 'components/home/list/List';
import { useExperienceContext } from 'contexts/ExperienceContext';

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  overflow-y: scroll;
`;

const ExperienceListContainer = () => {
  const { experiences } = useExperienceContext();
  return (
    <Container>
      <ListContainer>
        {experiences.map((experience) => {
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
          )
        })}
      </ListContainer>
    </Container>
  );
}

export default ExperienceListContainer;
