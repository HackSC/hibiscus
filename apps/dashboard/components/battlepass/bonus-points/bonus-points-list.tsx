import { H3 } from '@hibiscus/ui';
import React from 'react';
import styled from 'styled-components';
import { GrayBox } from '../../gray-box/gray-box';
import BonusPointsItem from './bonus-points-item';
import { BonusPointItem } from './types';

interface Props {
  items: BonusPointItem[];
}

function BonusPointsList({ items }: Props) {
  return (
    <Div>
      <H3>Bonus Points</H3>
      <GrayBox>
        {items.map((item, i) => (
          <BonusPointsItem data={item} key={i} />
        ))}
      </GrayBox>
    </Div>
  );
}

export default BonusPointsList;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
