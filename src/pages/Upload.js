import React from 'react';
import styled from 'styled-components';

import UploadContent from 'components/upload';
import BackButton from 'components/upload/common/BackButton';
import Stepper from 'components/upload/common/Stepper';
import LeftStepButton from 'components/upload/common/LeftStepButton';
import RightStepButton from 'components/upload/common/RightStepButton';

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const Upload = () => (
  <Container>
    <BackButton />
    <Stepper />
    <UploadContent />
    <LeftStepButton />
    <RightStepButton />
  </Container>
);

export default Upload;
