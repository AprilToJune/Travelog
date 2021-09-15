import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

import { useExperienceContext } from 'contexts/ExperienceContext';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  padding: 5px;
  margin-left: 15px;
  z-index: 15;
  transition: all 0.3s ease;
  border-radius: 10px;

  :hover {
    background-color: rgba(255, 255, 255, 0.15);
    cursor: pointer;
  }
`;

const ModalCloseButton = () => {
  const { handleModalClose } = useExperienceContext();

  return (
    <Container onClick={handleModalClose}>
      <CloseIcon style={{ color: 'white' }} />
    </Container>
  );
};

export default ModalCloseButton;
