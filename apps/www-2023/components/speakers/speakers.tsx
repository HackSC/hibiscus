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
    name="Michael Hovarth"
    title="CEO and Co-Founder of Strava"
    description="Michael Horvath is CEO and Co-founder of Strava, the leading subscription platform at the center of connected fitness, with more than 100 million active people in 195 countries. The platform offers a holistic view of your active lifestyle, no matter where you live, which sport you love and/or what device you use. Prior to Strava, Michael co-founded Kana Software, an enterprise software firm, and was the CFO and VP of Operations at GlycoFi, a biotech company. He holds a Ph.D. in economics from Northwestern University and an A.B. in economics from Harvard University where he was men’s lightweight crew team captain. In his former life, Michael was an economics professor at Stanford University and an entrepreneurship professor at the Tuck School of Business at Dartmouth College."
    photo="./img/speakers/michael.png"
  />,
  <Card
    key={2}
    name="Cammie Dunway"
    title="ex CMO of Duolingo, ex CMO of Yahoo!"
    description="Cammie Dunaway is an American marketer and one of the lea. Dunaway holds a Bachelor of Science in business administration from the University of Richmond and an M.B.A. from Harvard Business School. She was the Chief Marketing Officer (CMO) for Yahoo! before joining Nintendo of America in 2007 as the company’s executive vice president of sales & marketing. Before retiring, Dunaway served as the CMO of Duolingo for 4 years."
    photo="./img/speakers/cammie.png"
  />,
  <Card
    key={3}
    name="Matt Paterson"
    title="Co-founder of The SpaceLab"
    description="Matt Paterson is a machine learning engineer and a co-founder of The SpaceLab, a 501c3 nonprofit dedicated to providing real-world work experience to students and early-career tech professionals, with a focus on promoting the intersectionality of people of color, women, and folks from the LGBTQ community. Through working in cross-functional teams, SpaceLab participants build transferable skills in areas such as UX/UI Research and Design, Front-end software development, Data Science, Machine Learning, API Development, WebGL 3D Graphics development, and Backend Software Engineering. Several of the SpaceLab participants have already moved on to work at places such as Microsoft, Google, and IBM as well as many other companies. Matt's goal is to secure funding for the SpaceLab in order to fulfill the financial side of its mission statement, and to help participants at the SpaceLab to build an interactive Exoplanet Discovery Application using data from NASA. The SpaceLab also promotes other skill areas including Marketing, Digital Analytics, and Creative Content such as Blogs and Podcasts. Check out http://SpaceLab.space to learn more."
    photo="./img/speakers/matt.png"
  />,
  <Card
    key={4}
    name="Mark Hull"
    title="Chief Product Officer at GoodRX"
    description="Mark Hull is the Chief Product Officer at GoodRx where he leads the product strategy and management of the company’s products and services. Throughout his career, Mark has focused on making the world more open and connected through the creation of social products that bring people together. Before joining GoodRx, Mark was the Senior Director of Product Management for Facebook’s Creation team, leading the production experience of News Feed, Stories and Reels, the primary online destination for more than 2 billion people. Prior to Facebook, Mark was the Senior Director of Product Management for LinkedIn, leading its Messaging products. Mark started his career at Yahoo, creating the company’s first community and social networking products. Mark has an MBA from UC Berkeley’s Haas School of Business and a BA Journalism from Pepperdine University. GoodRx is a leading consumer-focused digital healthcare platform. Our technology delivers strong savings, trusted information and access to care to make healthcare affordable and convenient for all Americans. Since 2011, we have helped consumers save over $40 billion and are one of the most downloaded medical apps over the past decade."
    photo="./img/speakers/mark.png"
  />,
];

function CardCarousel({ cards }) {
  const [currentCard, setCurrentCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((currentCard + 1) % cards.length);
    }, 7000);
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
          shadowColor={Colors2023.RED.STANDARD}
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
  overflow-y: scroll;
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
  overflow-y: scroll;
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
