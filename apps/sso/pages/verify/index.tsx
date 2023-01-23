import styled from 'styled-components';
import VerifyCard from '../../components/verify-card/verify-card';
import Head from 'next/head';
import { getWebTitle } from '@hibiscus/metadata';

export function Index() {
  return (
    <MainPageWrapper>
      <Head>
        <title>{getWebTitle('Verify your email')}</title>
      </Head>
      <VerifyCard />
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
