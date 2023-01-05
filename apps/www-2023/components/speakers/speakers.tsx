import styled from 'styled-components';
import { H2, Text } from '@hibiscus/ui';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import React, { useState, useEffect } from 'react';
import { Colors2023 } from '@hibiscus/styles';

/* eslint-disable-next-line */
export interface SpeakersProps {}

const Card = ({ name, title, description, photo }) => {
  return (
    <CardContainer>
      <Photo src={photo} alt={name} />
      <About>
        <Name>{name}</Name>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </About>
    </CardContainer>
  );
};

const cards = [
  <Card
    key={1}
    name="Cammie Dunway"
    title="ex-CMO of Duolingo, ex-CMO of Yahoo!"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    photo="./img/speakers/cammie.png"
  />,
  <Card
    key={2}
    name="Matt Paterson"
    title="Exec Dir of SpaceLab"
    description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    photo="https://picsum.photos/800/800"
  />,
  <Card
    key={3}
    name="Neil Davé"
    title="Founder of TidalX"
    description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    photo="https://picsum.photos/800/800"
  />,
  <Card
    key={4}
    name="Akhil Bhiwal"
    title="Co-Founder and CEO of Phyllo"
    description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    photo="https://picsum.photos/800/800"
  />,
];

function CardCarousel({ cards }) {
  const [currentCard, setCurrentCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((currentCard + 1) % cards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentCard, cards.length]);

  const handleClick = (index) => {
    setCurrentCard(index);
  };

  return (
    <CarouselContainer>
      <Cards style={{ transform: `translateX(-${currentCard * 100}%)` }}>
        {cards.map((card, index) => {
          return (
            <div
              key={index}
              className={`card ${index === currentCard ? 'active' : ''}`}
            >
              {card}
            </div>
          );
        })}
      </Cards>
      <Dots>
        {cards.map((_, index) => {
          return (
            <span
              key={index}
              className={`dot ${index === currentCard ? 'active' : ''}`}
              onClick={() => handleClick(index)}
            ></span>
          );
        })}
      </Dots>
    </CarouselContainer>
  );
}

export function Speakers(props: SpeakersProps) {
  return (
    <StyledSpeakers>
      <H2>
        <GlowSpan
          color={Colors2023.GRAY.LIGHT}
          shadowColor={Colors2023.BLUE.STANDARD}
        >
          Featured Speakers
        </GlowSpan>
      </H2>
      <CardCarousel cards={cards} />
    </StyledSpeakers>
  );
}

export default Speakers;

const StyledSpeakers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CarouselContainer = styled.div`
  width: 70vw;
  height: 45vw;
  overflow: hidden;
  position: relative;
  margin-top: 50px;
  @media (max-width: 800px) {
    width: 65vw;
    border-radius: 10px 10px 0 0;
    height: 140vw;
  }
`;

const Cards = styled.div`
  display: flex;
  width: 70vw;
  height: 35vw;
  transition: transform 0.6s ease-in-out;
  .card.active {
    position: relative;
  }
  @media (max-width: 800px) {
    width: 65vw;
    height: 130vw;
  }
`;

const Dots = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  justify-content: center;

  .dot {
    height: 10px;
    width: 10px;
    margin: 25px 5px;
    border-radius: 50%;
    background-color: ${Colors2023.PINK.LIGHT};
    cursor: pointer;
    @media (max-width: 800px) {
      margin-top: 20px;
    }
  }

  .dot.active {
    background-color: ${Colors2023.PINK.STANDARD};
    box-shadow: 0px 0px 10px #ffffff;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 70vw;
  height: 35vw;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 60%);
  @media (max-width: 800px) {
    width: 65vw;
    flex-direction: column;
    height: 130vw;
  }
`;

const About = styled.div`
  border: 8px solid rgba(255, 255, 255, 25%);
  border-radius: 0 20px 20px 0;
  border-left: 0px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  padding: 2vw;
  @media (max-width: 800px) {
    border-radius: 0 0 20px 20px;
    border-top: 0px;
    border-left: 8px solid rgba(255, 255, 255, 25%);
  }
`;

const Name = styled(Text)`
  font-size: 30px;
  font-weight: 500;
  color: ${Colors2023.GRAY.DARK};
  margin-top: 25px;
`;

const Title = styled(Text)`
  font-size: medium;
  font-style: italic;
  color: ${Colors2023.GRAY.STANDARD};
  margin-top: 25px;
`;

const Description = styled(Text)`
  font-size: medium;
  color: ${Colors2023.GRAY.DARK};
  margin-top: 25px;
`;

const Photo = styled.img`
  flex-basis: 50%;
  border-radius: 10px 0 0 10px;
  width: 35vw;
  height: 35vw;
  @media (max-width: 800px) {
    width: 65vw;
    border-radius: 10px 10px 0 0;
    height: 65vw;
  }
`;
