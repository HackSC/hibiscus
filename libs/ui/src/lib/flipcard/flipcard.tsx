import React from 'react';
import styled from 'styled-components';
import { GradientSpan } from '../gradient-span/gradient-span';
import { H3 } from '../heading/heading';

/* eslint-disable-next-line */
/**
 * @property titleElement the element on the front where it will open the flip on click event
 */
type Props = React.PropsWithChildren<{
  title: React.ReactNode;
  titleDescription: React.ReactNode; // element on the front
}>;

/**
 * A general purpose flip component
 * @param props
 */
export function FlipItem(props: Props) {
  const [isFlipped, setFlip] = React.useState(false);

  return (
    <FlipContainer>
      <FlipFront
        onClick={() => {
          setFlip((prev) => !prev);
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              marginRight: 5,
            }}
          >
            <GradientSpan>
              {isFlipped ? '−' : '+'}
            </GradientSpan>
          </div>
          {props.title}
        </div>
      </FlipFront>
      <FlipBack>
        {isFlipped && props.children}
      </FlipBack>
    </FlipContainer>
  );
}

export default FlipItem;

const FlipContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0.1rem;
`;

const FlipFront = styled.button`
  border: none;
  background: none;
  text-align: left;
  color: #2b2b2b;
  font-size: 1.6rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: ease-in-out 0.2s;

  &:hover {
    background-color: #f3f3f3;
    border-radius: 0.4rem;
  }
`;


const FlipBack = styled.div`
  margin-top: 0.5rem;
  padding-left: 1.25rem;
  padding-right: 1rem;
  font-size: 1.5rem;
  color: #2b2b2b;
`;
