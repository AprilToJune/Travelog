import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DateSection = () => <Container>날짜를 쓰세요</Container>;

export default DateSection;
