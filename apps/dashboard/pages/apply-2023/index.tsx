import React, { useEffect } from 'react';
import Hackerform from '../../components/hackerform/hackform/hackform';
import { formMetadata2023HackerApps } from '../../common/hackform.metadata';
import { useHackform } from '../../hooks/use-hackform/use-hackform';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import { H3, Link } from '@hibiscus/ui';
import { Button } from '@hibiscus/ui-kit-2023';
import styled from 'styled-components';

NProgress.configure({ showSpinner: false, trickle: false, minimum: 0.05 });

export function Index() {
  const { currentQuestionIndex: cqi, ...hackformUtils } = useHackform();
  const { user } = useHibiscusUser();

  useEffect(() => {
    const numQuestionsTotal =
      hackformUtils.getHackformMetadata().questions.length;
    if (cqi === -1) {
      NProgress.remove();
      return;
    }
    const progress = (cqi + 1) / (numQuestionsTotal + 1);
    NProgress.set(progress);
  }, [cqi]);

  if (user?.applicationId !== null) {
    return (
      <AppliedContainer>
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
      </AppliedContainer>
    );
  }

  return <Hackerform formMetadata={formMetadata2023HackerApps} />;
}

export default Index;

const AppliedContainer = styled.div`
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
