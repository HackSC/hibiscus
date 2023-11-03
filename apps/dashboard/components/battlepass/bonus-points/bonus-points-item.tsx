import { H3, H4, Text } from '@hibiscus/ui';
// import { Button } from '@hibiscus/ui-kit-2023';
import { Button } from '@hacksc/sctw-ui-kit';
import React from 'react';
import styled from 'styled-components';
import { BonusPointsStatus } from '../../../common/apis/battlepass/types';
import { BonusPointItem } from './types';

interface Props {
  data: BonusPointItem;
  handleClick?: () => void;
}

function BonusPointsItem({ data, handleClick }: Props) {
  return (
    <Container>
      <TextDiv>
        <Text style={{ color: 'white' }}>{data.points} pts</Text>
        <H4>{data.title}</H4>
      </TextDiv>
      <div>
        <Button
          color="yellow"
          disabled={data.status !== BonusPointsStatus.VERIFY}
          onClick={handleClick}
        >
          {data.status}
        </Button>
      </div>
    </Container>
  );
}

export default BonusPointsItem;

const TextDiv = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
  padding: 10px;
  gap: 10px;
`;
