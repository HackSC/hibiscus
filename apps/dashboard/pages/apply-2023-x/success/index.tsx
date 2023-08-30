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
          <H3>Confirming submission...</H3>
        </CenterContainer>
      </Container>
    );
  }

  if (appId === null) {
    return (
      <Container>
        <CenterContainer>
          <H3>Sorry, you are not allowed to access this page.</H3>
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
          <H3>
            Your application is submitting! Please wait several minutes for your
            application status to update. You are free to leave this page.
          </H3>
          <H3>
            If your application status remains the same after several minutes,
            feel free to contact HackSC support for further assistance.
          </H3>
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
    <Container>
      <CenterContainer>
        <H3>Your application has been submitted!</H3>
        <Link href={'/'} passHref anchortagpropsoverride={{ target: '_self' }}>
          <Button color="black">Go back to home</Button>
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
