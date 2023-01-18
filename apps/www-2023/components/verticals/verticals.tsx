/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import Flippy, { BackSide, FrontSide } from 'react-flippy';
import { H2, H3, Text, Label, ItalicText } from '@hibiscus/ui';
import { ColorSpan, GlowSpan } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';

/* eslint-disable-next-line */
export interface VerticalsProps {}

export function Verticals(props: VerticalsProps) {
  const data: {
    verticalImg: string;
    verticalName: string;
    verticalSlogan: string;
    verticalDesc: string;
    verticalQuestion: string;
  }[] = [
    {
      verticalImg: './img/graphics/puzzle.svg',
      verticalName: 'Global Connections',
      verticalSlogan: 'Expanding your World Wide Web',
      verticalDesc:
        'Global interconnectivity is essential to all spheres of our modern lives, from social media to travel. Projects in this vertical should highlight and improve our global connections.',
      verticalQuestion: 'In what ways can you help connect people worldwide?',
    },
    {
      verticalImg: './img/graphics/heart.svg',
      verticalName: 'Global Impact',
      verticalSlogan: 'The World is in Your Hands',
      verticalDesc:
        'The past few years revealed humanity’s goodwill, with people worldwide helping one another in trying times. Projects in this vertical should make a global impact, one that will provide aid to fellow humans around the globe.',
      verticalQuestion:
        'How can you be the change you want to see in this world?',
    },
    {
      verticalImg: './img/graphics/coin.svg',
      verticalName: 'Global Economy',
      verticalSlogan: 'Money Makes the World Go ‘Round',
      verticalDesc:
        'Global economies are now a part of a larger multifaceted and growing network. Projects in this vertical should contribute to the global economy, reflecting a spirit of enterprise and innovation. ',
      verticalQuestion: 'Can you re-imagine how we spend money?',
    },
    {
      verticalImg: './img/graphics/planet.svg',
      verticalName: 'Beyond the Globe',
      verticalSlogan: 'Shoot for the Stars!',
      verticalDesc:
        'At HackSC, the sky is not the limit. Projects in this vertical should look beyond our planet and into the cosmos, contributing to space exploration.',
      verticalQuestion: 'What is your moonshot?',
    },
  ];

  return (
    <StyledVerticals>
      <H2>
        <GlowSpan
          color={Colors2023.GRAY.LIGHT}
          shadowColor={Colors2023.YELLOW.STANDARD}
        >
          Verticals
        </GlowSpan>
      </H2>
      <Text>
        <ColorSpan color={Colors2023.GRAY.SHLIGHT}>
          Click on any card to learn more about each vertical
        </ColorSpan>
      </Text>
      {[0, 2, 4].map((i) => (
        <VerticalsContainer key={i}>
          {data
            .slice(i, i + 2)
            .map(
              (
                {
                  verticalDesc,
                  verticalImg,
                  verticalName,
                  verticalQuestion,
                  verticalSlogan,
                },
                index
              ) => (
                <StyledFlippy
                  flipOnHover={false}
                  flipOnClick={true}
                  flipDirection="horizontal"
                  key={index}
                >
                  <FlipFront
                    style={{ backgroundColor: Colors2023.GRAY.STANDARD }}
                  >
                    <FrontDiv>
                      <VerticalImg>
                        <img
                          src={verticalImg}
                          alt={verticalName + ' Graphic'}
                        />
                      </VerticalImg>
                      <Label>
                        <GlowSpan
                          color={Colors2023.GRAY.LIGHT}
                          shadowColor={Colors2023.BLUE.STANDARD}
                        >
                          {verticalName}
                        </GlowSpan>
                      </Label>
                      <H3>{verticalSlogan}</H3>
                    </FrontDiv>
                  </FlipFront>
                  <FlipBack
                    style={{ backgroundColor: Colors2023.GRAY.STANDARD }}
                  >
                    <BackDiv>
                      <Text>{verticalDesc}</Text>
                      <Question>
                        <HorizontalLine />
                        <ItalicText>
                          <ColorSpan color={Colors2023.BLUE.STANDARD}>
                            {verticalQuestion}
                          </ColorSpan>
                        </ItalicText>
                      </Question>
                    </BackDiv>
                  </FlipBack>
                </StyledFlippy>
              )
            )}
        </VerticalsContainer>
      ))}
    </StyledVerticals>
  );
}

export default Verticals;

const StyledVerticals = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VerticalImg = styled.div`
  width: 10vw;
  > img {
    width: 10vw;
    height: 10vw;
    object-fit: fit;
  }
  @media (max-width: 800px) {
    width: 25vw;
    > img {
      width: 25vw;
      height: 25vw;
      object-fit: contain;
    }
  }
`;

const VerticalsContainer = styled.div`
  margin-top: 2rem;
  justify-content: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const FlipFront = styled(FrontSide)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 6px;
  border: 2px ${Colors2023.GRAY.SHLIGHT} solid;
  text-align: center;
`;

const FrontDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3vw;
`;

const FlipBack = styled(BackSide)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 6px;
  border: 2px ${Colors2023.GRAY.SHLIGHT} solid;
`;

const BackDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 3vw;
`;

const Question = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HorizontalLine = styled.hr`
  margin: 2vw 0;
  width: 40%;
  border-color: ${Colors2023.BLUE.STANDARD};
`;

const StyledFlippy = styled(Flippy)`
  height: 30vw;
  width: 27vw;
  border-radius: 20px;
  margin: 2rem 2rem 0 2rem;
  cursor: pointer;
  @media (max-width: 1080px) {
    height: 45vw;
    width: 35vw;
  }
  @media (max-width: 800px) {
    height: 55vw;
    width: 60vw;
  }
`;
