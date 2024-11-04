import React, { useEffect } from 'react';
import 'nprogress/nprogress.css';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import { H3, Link } from '@hibiscus/ui';
import { Button } from '@hibiscus/ui-kit-2023';
import styled from 'styled-components';
import { isHackerPostAppStatus } from '../../common/utils';
import { GetServerSideProps } from 'next';
import { get } from '@vercel/edge-config';
import { HackformTally } from '../../components/hackform-tally/hackform-tally';
import { useRouter } from 'next/router';
import { getEnv } from '@hibiscus/env';
import { ParsedUrlQuery } from 'querystring';

function isQueryComplete(query: ParsedUrlQuery): boolean {
  return (
    'hibiscusUserId' in query &&
    'hibiscusUserNameFirst' in query &&
    'hibiscusUserNameLast' in query &&
    'hibiscusUserEmail' in query
  );
}

interface ServerSideProps {
  appsOpen: boolean;
  waitlistOpen: boolean;
}

export function Index({ appsOpen, waitlistOpen }: ServerSideProps) {
  const { user } = useHibiscusUser();

  const router = useRouter();

  useEffect(() => {
    if (router.isReady && user !== null && !isQueryComplete(router.query)) {
      router.replace({
        query: {
          ...router.query,
          hibiscusUserId: user?.id,
          hibiscusUserNameFirst: user?.firstName,
          hibiscusUserNameLast: user?.lastName,
          hibiscusUserEmail: user?.email,
        },
      });
    }
  }, [router, user]);

  if (user === null || !isQueryComplete(router.query)) {
    return (
      <Container>
        <CenterContainer>
          <H3>Loading...</H3>
        </CenterContainer>
      </Container>
    );
  }

  if (router.query.hibiscusUserId !== user.id) {
    return (
      <Container>
        <CenterContainer>
          <H3>Invalid user ID provided!</H3>
        </CenterContainer>
      </Container>
    );
  }

  if (isHackerPostAppStatus(user.applicationStatus)) {
    return (
      <Container>
        <CenterContainer>
          <H3>You have already applied!</H3>
          <Link
            href={'/'}
            passHref
            anchortagpropsoverride={{ target: '_self' }}
          >
            <Button color="black">Go back to home</Button>
          </Link>
        </CenterContainer>
      </Container>
    );
  }

  if (!appsOpen && !waitlistOpen) {
    return (
      <Container>
        <CenterContainer>
          <H3>Apps for HackSC X have closed!</H3>
          <Link
            href={'/'}
            passHref
            anchortagpropsoverride={{ target: '_self' }}
          >
            <Button color="black">Go back to home</Button>
          </Link>
        </CenterContainer>
      </Container>
    );
  }

  return (
    <MarginContainer>
      <HackformTally tallyUrl={getEnv().Hibiscus.Hackform.TallyApps2023XUrl} />
    </MarginContainer>
  );
}

export default Index;

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MarginContainer = styled.div`
  margin: 0 5rem;
`;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const appsOpen = await get('APPS_OPEN_HACKSC_X_2023');
  const waitlistOpen = await get('APPS_WAITLIST_OPEN_HACKSC_X_2023');
  return {
    props: {
      appsOpen: true,
      waitlistOpen,
    } as ServerSideProps,
  };
};
