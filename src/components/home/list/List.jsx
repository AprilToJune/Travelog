import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { useExperienceContext } from 'contexts/ExperienceContext';
import heart from 'assets/heart.png';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 30%;

  :hover {
    cursor: pointer;
  }
`;

const Background = styled.img`
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const HeartImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px;
  width: 40px;
  height: 40px;
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

const TitleText = styled.span`
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
`;

const AllImageText = styled.span`
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
`;

const List = ({ id, title, startDate, endDate, location, images }) => {
  const [isHover, setIsHover] = useState(false);
  const { handleModalOpen, setCurrentModalContent } = useExperienceContext();

  const onMouseEnterContainer = useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseLeaveContainer = useCallback(() => {
    setIsHover(false);
  }, []);

  const customHandleModalOpen = useCallback(() => {
    setCurrentModalContent({
      id,
      title,
      startDate,
      endDate,
      location,
      images,
    });
    setIsHover(false);
    handleModalOpen();
  }, [handleModalOpen]);

  const DescriptionContent = () => (
    <Description>
      <TitleText>{title}</TitleText>
      <DateText>
        {startDate} - {endDate}
      </DateText>
      <AllImageText>총 이미지 {images.length}장</AllImageText>
    </Description>
  );

  return (
    <Container
      onClick={customHandleModalOpen}
      onMouseEnter={onMouseEnterContainer}
      onMouseLeave={onMouseLeaveContainer}
    >
      <Background src={images[0]?.url} draggable={false} />
      <HeartImage src={heart} />
      {isHover ? <DescriptionContent /> : ''}
    </Container>
  );
};

export default List;
