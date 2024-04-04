import { Colors2023 } from '@hibiscus/styles';
import React from 'react';
import styled from 'styled-components';

interface Props {
  rangeMinPoint: number;
  rangeMaxPoint: number;
  currentPoint: number;
  minLabel?: React.ReactNode;
  maxLabel?: React.ReactNode;
}

function BattlepassPointsBar(props: Props) {
  const progress = Math.min(
    Math.max(
      (props.currentPoint - props.rangeMinPoint) /
        (props.rangeMaxPoint - props.rangeMinPoint),
      0
    ),
    1
  );

  return (
    <Container>
      <BarBack>
        <BarFront progress={progress} />
      </BarBack>
      <BottomDiv>
        <div style={{ color: '#ecb400' }}>{props.minLabel}</div>
        <div style={{ color: '#ce0c0a' }}>{props.maxLabel}</div>
      </BottomDiv>
    </Container>
  );
}

export default BattlepassPointsBar;

const Container = styled.div`
  width: 26rem;
  max-width: 100%;
`;

const BarBack = styled.div`
  position: relative;
  width: 100%;
  height: 1.3rem;
  border: 3px solid #ff514f;
  border-radius: 100px;
  box-shadow: 0px 0px 10px 0px #fe513980;
`;

const BarFront = styled.div<{ progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.progress * 100}%;
  height: 100%;
  border-radius: inherit;
  background-color: #ff514f;
  text-shadow: 0px 0px 10px #ffffff;
`;

const BottomDiv = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
`;
