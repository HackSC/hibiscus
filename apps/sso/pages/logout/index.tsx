import styled from 'styled-components';
import { TrademarkColors } from '@hibiscus/styles';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { getWebTitle } from '@hibiscus/metadata';
import { SupabaseContext } from '@hibiscus/hibiscus-supabase-client';

export function Index() {
  const { supabase } = useContext(SupabaseContext);

  useEffect(() => {
    async function logout() {
      await supabase.logout();
      window.location.replace(`${process.env.NEXT_PUBLIC_SSO_URL}/login`);
    }

    logout();
  }, []);

  return (
    <MainPageWrapper>
      <Head>
        <title>{getWebTitle('Log Out')}</title>
      </Head>
    </MainPageWrapper>
  );
}
export default Index;

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background: linear-gradient(
    45deg,
    ${TrademarkColors.LIGHT_BLUE} 0%,
    ${TrademarkColors.LIGHT_PURPLE} 33%,
    ${TrademarkColors.LIGHT_RED} 66%,
    ${TrademarkColors.YELLOW} 100%
  );
  background-position: fixed;
  background-attachment: local;
  background-repeat: no-repeat;
  background-size: 100%;
  top: 0;
  left: 0;
  z-index: -1;
`;
