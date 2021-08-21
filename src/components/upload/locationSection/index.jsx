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

const LocationSection = () => {
  const { location, setLocation, error } = useUploadContext();

  const onChangeLocation = (e) => {
    setLocation(e.target.value);
  };

  return (
    <Container>
      <Input
        error={error.length !== 0}
        helperText={error}
        label="시녕아 우리의 여행에 위치를 붙여줘!"
        variant="outlined"
        value={location}
        onChange={onChangeLocation}
        fullWidth
      />
    </Container>
  );
};

export default LocationSection;
