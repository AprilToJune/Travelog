import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import { useUploadContext } from 'contexts/UploadContext';

const Container = styled.div`
  position: absolute;
  width: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Input = styled(TextField)``;

const TitleSection = () => {
  const { title, setTitle, error } = useUploadContext();

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  return (
    <Container>
      <Input
        error={error.length !== 0}
        helperText={error}
        label="시녕아 우리의 여행에 제목을 붙여줘!"
        variant="outlined"
        value={title}
        onChange={onChangeTitle}
        fullWidth
      />
    </Container>
  );
};

export default TitleSection;
