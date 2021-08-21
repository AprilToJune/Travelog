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

const DateSection = () => {
  const { date, setDate, error } = useUploadContext();

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };

  return (
    <Container>
      <Input
        error={error.length !== 0}
        helperText={error}
        label="시녕아 우리의 여행에 날짜를 붙여줘!"
        variant="outlined"
        value={date}
        onChange={onChangeDate}
        fullWidth
      />
    </Container>
  );
};

export default DateSection;
