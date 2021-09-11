import React from 'react';
import styled from 'styled-components';

import { useUploadContext } from 'contexts/UploadContext';

const Container = styled.div`
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
`;

const Upload = () => {
  const { currentSection } = useUploadContext();
  return <Container>{currentSection}</Container>;
};

export default Upload;
