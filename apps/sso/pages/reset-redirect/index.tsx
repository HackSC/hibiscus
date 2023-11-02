import styled from 'styled-components';
import Head from 'next/head';
import { getWebTitle } from '@hibiscus/metadata';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { Button } from '@hibiscus/ui-kit-2023';

export function Index() {
  const router = useRouter();

  // Extract redirect url from the query params
  // This is required due to https://github.com/supabase/gotrue/issues/713
  const redirect = useMemo(() => router?.query?.url?.toString(), [router]);

  return (
    <MainPageWrapper>
      <Head>
        <title>{getWebTitle('Reset your password')}</title>
      </Head>

      <CenterDiv>
        {redirect && (
          <a href={redirect}>
            <Button color="black">Click here to reset your password</Button>
          </a>
        )}
      </CenterDiv>
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

const CenterDiv = styled.div`
  margin: auto;
`;
