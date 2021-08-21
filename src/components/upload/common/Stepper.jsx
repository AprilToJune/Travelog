import React from 'react';
import styled from 'styled-components';

import { useUploadContext } from 'contexts/UploadContext';

const Stepper = styled.div`
  position: absolute;
  display: flex;
  column-gap: 10px;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  padding: 10px;
  margin: 5px;
  z-index: 5;
`;

const CurrentStep = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  column-gap: 5px;

  ::after {
    content: ${(props) => (props.isLast ? 'none' : '""')};
    width: 50px;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Step = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;

  ::after {
    content: ${(props) => (props.isLast ? 'none' : '""')};
    width: 50px;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Number = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
  font-size: 14px;
  font-weight: normal;
  color: white;

  background-color: ${(props) =>
    props.isSelect ? 'rgb(8, 107, 255)' : 'rgba(0, 0, 0, 0.3)'};
  border-radius: 50%;
  width: 24px;
  height: 24px;
`;

const Label = styled.span`
  font-size: 12px;
`;

const StepperContainer = () => {
  const { ContentList, step } = useUploadContext();
  return (
    <Stepper>
      {ContentList.map((item, idx) =>
        step === item.step ? (
          <CurrentStep key={item.label} isLast={ContentList.length - 1 === idx}>
            <Number isSelect>{item.step}</Number>
            <Label>{item.label}</Label>
          </CurrentStep>
        ) : (
          <Step key={item.label} isLast={ContentList.length - 1 === idx}>
            <Number isSelect={false}>{item.step}</Number>
            <Label>{item.label}</Label>
          </Step>
        ),
      )}
    </Stepper>
  );
};

export default StepperContainer;
