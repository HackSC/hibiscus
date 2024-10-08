import { H3, Link } from '@hibiscus/ui';
import { Button } from '@hibiscus/ui-kit-2023';
import useHibiscusUser from '../../../hooks/use-hibiscus-user/use-hibiscus-user';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export function Index() {
  const { user } = useHibiscusUser();
  const router = useRouter();
  const [appId, setAppId] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady && user !== null) {
      if (!('appId' in router.query)) {
        setAppId(null);
      } else {
        setAppId(router.query.appId.toString());
      }
    }
  }, [router, user]);

  if (user === null || !router.isReady) {
    return (
      <Container>
        <CenterContainer>
          <Heading>Confirming submission...</Heading>
        </CenterContainer>
      </Container>
    );
  }

  if (appId === null) {
    return (
      <Container>
        <CenterContainer>
          <Heading>Sorry, you are not allowed to access this page.</Heading>
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

  if (
    user.applicationId === undefined ||
    user.applicationId === null ||
    appId !== user.applicationId
  ) {
    return (
      <Container>
        <CenterContainer>
          <Heading>
            Your application is submitting! Please wait several minutes for your
            application status to update. You are free to leave this page.
          </Heading>
          <Heading>
            If your application status remains the same after several minutes,
            feel free to contact HackSC support at{' '}
            <a href="mailto:team@hacksc.com">team@hacksc.com</a> for further
            assistance.
          </Heading>
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
    <Container>
      <CenterContainer>
        <Heading>
          Your application has been submitted! Our team is currently reviewing
          applications and will be sending out the acceptances in phases after
          the application period closes.
        </Heading>
        <Link href={'/'} passHref anchortagpropsoverride={{ target: '_self' }}>
          <RedButton>Go back to home</RedButton>
        </Link>
      </CenterContainer>
    </Container>
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
  gap: 2rem;
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
