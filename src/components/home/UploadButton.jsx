import React from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 30px;
`;

const Button = styled(Fab)``;

const UploadButton = () => (
  <Container>
    <Link to="/upload">
      <Button color="primary" aria-label="add">
        <AddIcon />
      </Button>
    </Link>
  </Container>
);

export default UploadButton;
