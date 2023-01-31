import styled from 'styled-components';
import ResetCard from '../../components/reset-card/reset-card';
import Head from 'next/head';
import { getWebTitle } from '@hibiscus/metadata';

export function Index() {
  return (
    <MainPageWrapper>
      <Head>
        <title>{getWebTitle('Reset your password')}</title>
      </Head>
      <ResetCard />
    </MainPageWrapper>
  );
}
export default Index;

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;
