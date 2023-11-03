import styled from 'styled-components';
import Head from 'next/head';
import { getWebTitle } from '@hibiscus/metadata';
import ResetVerifyCard from '../../components/verify-card/reset-verify-card';

export function Index() {
  return (
    <MainPageWrapper>
      <Head>
        <title>{getWebTitle('Reset your password')}</title>
      </Head>

      <ResetVerifyCard />
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
