/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { H2, Text } from '@hibiscus/ui';
import { GlowSpan, ColorSpanBold } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';

/* eslint-disable-next-line */
export interface TopicProps {}

export function Topic(props: TopicProps) {
  return (
    <StyledTopic>
      <Graphic>
        <img src="./img/graphics/earth.svg" alt="Earth on vacation" />
      </Graphic>
      <Information>
        <Heading>
          <GlowSpan
            color={Colors2023.GRAY.LIGHT}
            shadowColor={Colors2023.BLUE.STANDARD}
          >
            Around the Globe
          </GlowSpan>
        </Heading>
        <Text>
          As the world begins to recover from a global pandemic, we&apos;ve
          discovered how interconnected our planet has become. HackSC&apos;s
          theme for 2023 asks participants to consider our global communities,
          be it the{' '}
          <ColorSpanBold color={Colors2023.YELLOW.STANDARD}>
            economy
          </ColorSpanBold>
          ,{' '}
          <ColorSpanBold color={Colors2023.PINK.STANDARD}>
            social media
          </ColorSpanBold>
          ,{' '}
          <ColorSpanBold color={Colors2023.RED.STANDARD}>
            humanitarian issues
          </ColorSpanBold>
          , and even{' '}
          <ColorSpanBold color={Colors2023.BLUE.STANDARD}>
            beyond the globe
          </ColorSpanBold>
          .
        </Text>
      </Information>
    </StyledTopic>
  );
}

export default Topic;

const StyledTopic = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  margin: 10vw;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Graphic = styled.div`
  flex-basis: 30%;
  width: 30vw;
  > img {
    object-fit: contain;
    width: 30vw;
    height: 20vw;
  }
  @media (max-width: 800px) {
    width: 65vw;
    > img {
      width: 65vw;
      height: 35vw;
    }
  }
`;

const Information = styled.div`
  flex-basis: 70%;
  margin-left: 2rem;
  @media (max-width: 800px) {
    margin-top: 2rem;
  }
`;
const Heading = styled(H2)`
  margin-bottom: 2rem;
`;
