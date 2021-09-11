import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 20%;
`;

const Background = styled.img`
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const Title = styled.div`
  position: absolute;
  font-weight: bold;
  top: 0;
  left: 0;
  padding: 10px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const DateText = styled.span`
color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
`;

const LocationText = styled.span`
color: rgba(255, 255, 255, 1);
  font-size: 20px;
`;

const AllImageText = styled.span`
  color: rgba(255, 255, 255,0.4);
  font-size: 12px;
`;

const List = ({ id, title, startDate, endDate, location, images }) => {
  const [isHover, setIsHover] = useState(false);

  const onMouseEnterContainer = useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseLeaveContainer = useCallback(() => {
    setIsHover(false);
  }, []);

  const DescriptionContent = () => {
    const splittedLocation = location.split(' ');
    return (
      <Description>
        <DateText>
          {startDate} - {endDate}
        </DateText>
        <LocationText>
          {splittedLocation[0]} {splittedLocation[1]}
        </LocationText>
        <AllImageText>
          총 이미지 {images.length}장
        </AllImageText>
      </Description>
    )
  }

  return (
    <Container
      id={id}
      onMouseEnter={onMouseEnterContainer}
      onMouseLeave={onMouseLeaveContainer}
    >
      <Background src={images[0].url} draggable={false} />
      <Title>{title}</Title>

      {isHover ? <DescriptionContent /> : ''}
    </Container>
  )
} 

export default List;
