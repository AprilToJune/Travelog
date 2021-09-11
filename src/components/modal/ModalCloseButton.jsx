import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

import { useExperienceContext } from 'contexts/ExperienceContext';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 10px;
  margin: 10px;
  z-index: 15;
  transition: all 0.3s ease;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

const ModalCloseButton = () => {
  const { handleModalClose } = useExperienceContext();

  return (
    <Container onClick={handleModalClose}>
      <CloseIcon />
    </Container>
  );  
};

export default ModalCloseButton;
