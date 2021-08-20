import React from 'react';
import styled from 'styled-components';

import BackButton from 'components/upload/BackButton';

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Upload = () => (
  <Container>
    <BackButton />
    Upload
  </Container>
);

export default Upload;
