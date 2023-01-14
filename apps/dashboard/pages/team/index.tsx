import React from 'react';
import styled from 'styled-components';
import TeamHeader from '../../components/team/team-header';
import TeamMembersWidget from '../../components/team/team-members-widget';
import NoTeamPlaceholder from '../../components/team/no-team-placeholder';
import { useTeam } from '../../hooks/use-team/use-team';

const Index = () => {
  const { team } = useTeam();

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
      {team !== null ? <TeamView /> : <NoTeamPlaceholder />}
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
