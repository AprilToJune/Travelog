import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from "react-slick";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { useExperienceContext } from 'contexts/ExperienceContext';

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  z-index: 10;

  .slick-track {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slick-slide div img {
    width: 100vw;
    height: 80vh;
    object-fit: contain;
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  column-gap: 4px;
  align-items: baseline;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  right: 0;
  bottom: 0;
  padding: 6px;
  z-index: 15;
`;

const IndexContainer = styled.div`
  display: flex;
  column-gap: 4px;
  align-items: baseline;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 10px;
  z-index: 15;
`;

const Index = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 20px;
`;

const Title = styled.span`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const Date = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
`;

const Location = styled.span`
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
`;

const Slash = styled.span`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
`;

const LeftArrowContainerWithIcon = styled.div`
  position: fixed;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  z-index: 15;
  padding: 10px;
  transition: all 0.3s ease;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

const RightArrowContainerWithIcon = styled.div`
  position: fixed;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  z-index: 15;
  padding: 10px;
  transition: all 0.3s ease;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <LeftArrowContainerWithIcon
      onClick={onClick}
    >
      <ArrowLeftIcon />
    </LeftArrowContainerWithIcon>
  );
}

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <RightArrowContainerWithIcon
      onClick={onClick}
    >
      <ArrowRightIcon />
    </RightArrowContainerWithIcon>
  );
}

const ModalContent = () => {
  const { currentModalContent } = useExperienceContext();
  const { title, location, startDate, endDate, images } = currentModalContent;
  const [currentIndex, setCurrentIndex] = useState(1);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_, next) => setCurrentIndex(next + 1),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      <DescriptionContainer>
        <Date>{startDate === endDate ? startDate : `${startDate} - ${endDate}`}</Date>
        <Slash>/</Slash>
        <Location>{location}</Location>
        <Slash>/</Slash>
        <Title>{title}</Title>
      </DescriptionContainer>
      <IndexContainer>
        <Index>{currentIndex}</Index>
        <Slash>/</Slash>
        <Index>{images.length}</Index>
      </IndexContainer>
      <Container>
        {/* eslint-disable-next-line */}
        <Slider {...settings}>
          {images.map((image) => (
              <div key={image.index}>
                <img src={image.url} alt="my-experiences" />
              </div>
            ),
          )}
        </Slider>
      </Container>
    </>
  );  
};

export default ModalContent;
