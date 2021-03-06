import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
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

const BackButton = () => (
  <Link to="/">
    <Container>
      <ArrowBackIcon />
    </Container>
  </Link>
);

export default BackButton;
