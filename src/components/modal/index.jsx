import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useExperienceContext } from 'contexts/ExperienceContext';
import ModalContent from './ModalContent';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
`;

const index = () => {
  const { isModalOpen, handleModalClose } = useExperienceContext();

  const handleOnKeyDonw = (event) => {
    if (event.keyCode === 27) handleModalClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleOnKeyDonw);
  }, []);

  return (
    isModalOpen && (
      <>
        <Container />
        <ModalContent />
      </>
    )
  );
};

export default index;
