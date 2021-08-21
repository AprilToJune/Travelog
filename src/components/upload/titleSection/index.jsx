import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TitleSection = () => <Container>타이틀을 쓰세요</Container>;

export default TitleSection;
