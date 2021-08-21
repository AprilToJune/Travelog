import React from 'react';
import styled from 'styled-components';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { useUploadContext } from 'contexts/UploadContext';

const Container = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  transition: all 0.3s ease;
  z-index: 5;

  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const LeftStepButton = () => {
  const { onClickNextStep } = useUploadContext();
  return (
    <Container onClick={onClickNextStep}>
      <NavigateNextIcon />
    </Container>
  );
};

export default LeftStepButton;
