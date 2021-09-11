import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useUploadContext } from 'contexts/UploadContext';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DateText = styled.div``;

const DateSection = () => {
  const {
    startDate,
    startFormattedDate,
    endDate,
    endFormattedDate,
    setStartDate,
    setEndDate,
  } = useUploadContext();

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <Container>
      <DateText>{startDate ? startFormattedDate : '없어요'}</DateText>
      <DateText>{endDate ? endFormattedDate : '없어요'}</DateText>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
    </Container>
  );
};

export default DateSection;
