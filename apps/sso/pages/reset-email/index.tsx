import styled from 'styled-components';
import ResetEmailCard from '../../components/reset-card/reset-email-card';
import Head from 'next/head';
import { getWebTitle } from '@hibiscus/metadata';

export function Index() {
  return (
    <MainPageWrapper>
      <Head>
        <title>{getWebTitle('Reset your email')}</title>
      </Head>
      <ResetEmailCard />
    </MainPageWrapper>
  );
}
export default Index;

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background: white;
  background-position: fixed;
  background-attachment: local;
  background-repeat: no-repeat;
  background-size: 100%;
  top: 0;
  left: 0;
  z-index: -1;
`;
