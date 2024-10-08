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
          <Heading>Loading...</Heading>
        </CenterContainer>
      </Container>
    );
  }

  if (router.query.hibiscusUserId !== user.id) {
    return (
      <Container>
        <CenterContainer>
          <Heading>Invalid user ID provided!</Heading>
        </CenterContainer>
      </Container>
    );
  }

  if (isHackerPostAppStatus(user.applicationStatus)) {
    return (
      <Container>
        <CenterContainer>
          <Heading>You have already applied!</Heading>
          <Link
            href={'/'}
            passHref
            anchortagpropsoverride={{ target: '_self' }}
          >
            <RedButton>Go back to home</RedButton>
          </Link>
        </CenterContainer>
      </Container>
    );
  }

  if (!appsOpen && !waitlistOpen) {
    return (
      <Container>
        <CenterContainer>
          <Heading>Apps for SoCal Tech Week have closed!</Heading>
          <Link
            href={'/'}
            passHref
            anchortagpropsoverride={{ target: '_self' }}
          >
            <RedButton>Go back to home</RedButton>
          </Link>
        </CenterContainer>
      </Container>
    );
  }

  return (
    <MarginContainer>
      <HackformTally tallyUrl={getEnv().Hibiscus.Hackform.TallyApps2024Url} />
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

const Heading = styled(H3)`
  color: #ff6347;
`;

const RedButton = styled.button`
  padding: 12px 40px 12px 40px;
  border-radius: 8px;
  border: 1px solid black;

  width: fit-content;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: #ffb1a3;
  //fonts
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 36px;
  text-align: center;
  color: black;
  :hover {
    background: #ffded9;
    box-shadow: 0px 0px 5px rgba(239, 118, 118, 0.5);
    cursor: pointer;
    transition: 0.1s;
  }
  :active {
    background: #ff6347;
  }
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
