import React from 'react';
import styled from 'styled-components';
import Hackerform from '../../components/hackerform/hackform/hackform';
import { formMetadata2023HackerApps } from '../../common/hackform.metadata';
import PortalLayout from '../../layouts/portal-layout';

export function Index() {
  return (
    <PortalLayout>
      <MainPageWrapper>
        <Hackerform formMetadata={formMetadata2023HackerApps} />
      </MainPageWrapper>
    </PortalLayout>
  );
}

export default Index;

const MainPageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
