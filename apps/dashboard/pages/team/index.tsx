import PortalLayout from '../../layouts/portal-layout';
import React from 'react';
import styled from 'styled-components';
import TeamHeader from '../../components/team/team-header';
import TeamMembersWidget from '../../components/team/team-members-widget';
import NoTeamPlaceholder from '../../components/team/no-team-placeholder';

const Index = () => {
  const hasTeam = false;

  const TeamView = () => {
    return (
      <>
        <TeamHeader />
        <TeamMembersWidget />
      </>
    );
  };

  return (
    <PageContainer>
      {hasTeam ? <TeamView /> : <NoTeamPlaceholder />}
    </PageContainer>
  );
};

export default Index;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 6rem 16rem;
`;
