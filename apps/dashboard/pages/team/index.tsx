import React, { useEffect } from 'react';
import styled from 'styled-components';
import TeamHeader from '../../components/team/team-header';
import TeamMembersWidget from '../../components/team/team-members-widget';
import NoTeamPlaceholder from '../../components/team/no-team-placeholder';
import { useTeam } from '../../hooks/use-team/use-team';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import { TeamServiceAPI } from '../../common/api';
import { Text } from '@hibiscus/ui';

const Index = () => {
  const { updateTeam, isLoading, noTeam, setNoTeam } = useTeam();
  const { user } = useHibiscusUser();

  useEffect(() => {
    if (!user) return;
    if (!user.teamId) {
      setNoTeam();
      return;
    }
    TeamServiceAPI.getTeamById(user.teamId).then(({ data, error }) => {
      if (error) {
        console.error(error.message);
        setNoTeam();
        return;
      }
      updateTeam({
        id: data.id,
        name: data.name,
        description: data.description,
        invites: data.invites,
        members: data.members,
      });
    });
  }, [user]);

  return (
    <PageContainer>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : !noTeam ? (
        <>
          <TeamHeader />
          <TeamMembersWidget />
        </>
      ) : (
        <NoTeamPlaceholder />
      )}
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
