import { Colors2023 } from '@hibiscus/styles';
import { BoldText, Modal, Text } from '@hibiscus/ui';
import { ColorSpan, GlowSpan, Search } from '@hibiscus/ui-kit-2023';
import searchUser from '../../../common/search-user';
import { useState } from 'react';
import styled from 'styled-components';

export function Index() {
  return (
    <>
      <Container>
        <ColumnSpacedCenter></ColumnSpacedCenter>

        <ColumnSpacedLeft>
          <Text>Recent check-ins</Text>
        </ColumnSpacedLeft>
      </Container>
    </>
  );
}

export default Index;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  align-items: center;
  justify-items: center;
  min-height: 100%;
`;

const ColumnCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ColumnSpacedCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const ColumnSpacedLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 360px;
  height: 385px;

  padding: 1.5rem 2.5rem;

  background-color: ${Colors2023.GRAY.STANDARD};

  border: thick solid ${Colors2023.GRAY.MEDIUM};
  border-radius: 9px;
`;

const CheckInRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  align-items: end;

  padding: 1rem 0;

  &:not(:last-child) {
    border-bottom: thin solid ${Colors2023.GRAY.MEDIUM};
  }
`;
