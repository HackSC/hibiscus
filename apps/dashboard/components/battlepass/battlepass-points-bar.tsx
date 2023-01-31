import { Colors2023 } from '@hibiscus/styles';
import React from 'react';
import styled from 'styled-components';

interface Props {
  rangeMinPoint: number;
  rangeMaxPoint: number;
  currentPoint: number;
  minLabel?: string;
  maxLabel?: string;
}

function BattlepassPointsBar(props: Props) {
  const progress =
    (props.currentPoint - props.rangeMinPoint) /
    (props.rangeMaxPoint - props.rangeMinPoint);

  return (
    <BarBack>
      <BarFront progress={progress} />
    </BarBack>
  );
}

export default BattlepassPointsBar;

const BarBack = styled.div`
  position: relative;
  width: 30rem;
  height: 1rem;
  border: 1px solid ${Colors2023.BLUE.STANDARD};
  border-radius: 6px;
  box-shadow: 0px 0px 10px -3px #ffffff;
`;

const BarFront = styled.div<{ progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.progress * 100}%;
  height: 100%;
  border-radius: inherit;
  background-color: ${Colors2023.BLUE.STANDARD};
  text-shadow: 0px 0px 10px #ffffff;
`;
