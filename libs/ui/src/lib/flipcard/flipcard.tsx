import React from 'react';
import styled from 'styled-components';
import { GradientSpan } from '../gradient-span/gradient-span';
import { Text } from '../text/text';
import { H2, H3 } from '../heading/heading';

/* eslint-disable-next-line */
/**
 * @property titleElement the element on the front where it will open the flip on click event
 */
type Props = React.PropsWithChildren<{
  title: React.ReactNode;
  extendedTitle: React.ReactNode; // element on the front
}>;

/**
 * A general purpose flip component
 * @param props
 */
export function FlipCard(props: Props) {
  return (
    <FlipContainer>
      <FlipInner>
        <FlipFront>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <GradientSpan>
              <StyledH2>{props.title}</StyledH2>
            </GradientSpan>
            <SloganText>{props.children}</SloganText>
          </div>
        </FlipFront>
        <FlipBack>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <GradientSpan>
              <StyledH3>{props.extendedTitle}</StyledH3>
            </GradientSpan>
            <Description>{props.children}</Description>
          </div>
        </FlipBack>
      </FlipInner>
    </FlipContainer>
  );
}

export default FlipCard;

const FlipContainer = styled.div`
  width: 600px;
  height: 500px;
  border: 1px solid #f6f6f6;
  margin-bottom: 0.1rem;
  perspective: 2200px;
  :hover {
    transform: rotateY(180deg);
  }
`;

const FlipInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: rotateY(180deg);
`;

const SloganText = styled(Text)``;

const StyledH2 = styled(H2)`
  font-size: 5rem;
  text-align: center;
`;

const StyledH3 = styled(H3)`
  font-size: 4rem;
  text-align: center;
`;

const Description = styled(Text)``;

const FlipFront = styled.button`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background-color: #bbb;
  color: black;
`;

const FlipBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background-color: dodgerblue;
  color: white;
  transform: rotateY(180deg);
`;
