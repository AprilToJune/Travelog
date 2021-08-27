import React from 'react';
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';

import { useUploadContext } from 'contexts/UploadContext';

const Container = styled.div`
  position: absolute;
  width: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LocationSection = () => {
  const { location, setLocation, error } = useUploadContext();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setLocation(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  return (
    <Container>
      <div>{error || ''}</div>
      <div>{location || '주소를 입력해줘!'}</div>
      <DaumPostcode onComplete={handleComplete} />
    </Container>
  );
};

export default LocationSection;
