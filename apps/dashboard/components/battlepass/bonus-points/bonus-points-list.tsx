import React from 'react';
import styled from 'styled-components';
import { GrayBox } from '../../gray-box/gray-box';
import BonusPointsItem from './bonus-points-item';
import { BonusPointItem } from './types';

interface Props {
  items: BonusPointItem[];
}

function BattlepassBonusPointsList({ items }: Props) {
  return (
    <Div>
      {items.map((item, i) => (
        <BonusPointsItem data={item} key={i} />
      ))}
    </Div>
  );
}

export default BattlepassBonusPointsList;

const Div = styled(GrayBox)`
  gap: 10px;
`;
