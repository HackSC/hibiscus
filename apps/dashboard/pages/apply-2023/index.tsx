import React, { useEffect } from 'react';
import Hackerform from '../../components/hackerform/hackform/hackform';
import { formMetadata2023HackerApps } from '../../common/hackform.metadata';
import PortalLayout from '../../layouts/portal-layout';
import { useHackform } from '../../hooks/use-hackform/use-hackform';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false, trickle: false, minimum: 0.05 });

export function Index() {
  const { currentQuestionIndex: cqi, ...hackformUtils } = useHackform();

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

  return (
    <PortalLayout>
      <Hackerform formMetadata={formMetadata2023HackerApps} />
    </PortalLayout>
  );
}

export default Index;
