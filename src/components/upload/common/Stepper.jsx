/* eslint-disable */
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const Label = styled.p`
  margin-top: 5px;
  font-size: 12px;
`;

const StepperContainer = () => {
  const { ContentList, step } = useUploadContext();
  return (
    <Stepper>
      {ContentList.map((item) => {
        return step === item.step ? (
          <CurrentStep>
            <Number isSelect={true}>{item.step}</Number>
            <Label>{item.label}</Label>
          </CurrentStep>
        ) : (
          <Step>
            <Number isSelect={false}>{item.step}</Number>
            <Label>{item.label}</Label>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default StepperContainer;
