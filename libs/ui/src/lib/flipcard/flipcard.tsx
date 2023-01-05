import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  front: string;
  back: string;
};

const FlipCard: React.FC<Props> = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Card onClick={() => setIsFlipped(!isFlipped)} isFlipped={isFlipped}>
      <CardInner>
        <CardFront>{front}</CardFront>
        <CardBack>{back}</CardBack>
      </CardInner>
    </Card>
  );
};

const Card = styled.div<{ isFlipped: boolean }>`
  perspective: 1000px;
  height: 200px;
  width: 300px;
  margin: 0 auto;
  transform: ${(props) => `rotateY(${props.isFlipped ? 180 : 0}deg)`};
`;

const CardInner = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
`;

const CardFront = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
  background-color: #f1f1f1;
  color: #333;
  padding: 20px;
`;

const CardBack = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
  background-color: #333;
  color: #fff;
  transform: rotateY(180deg);
  padding: 20px;
`;

export default FlipCard;
