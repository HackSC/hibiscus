import React, { useEffect } from 'react';
import styled from 'styled-components';
import TeamHeader from '../../components/team/team-header';
import TeamMembersWidget from '../../components/team/team-members-widget';
import NoTeamPlaceholder from '../../components/team/no-team-placeholder';
import { useTeam } from '../../hooks/use-team/use-team';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import { TeamServiceAPI } from '../../common/api';
import { Text } from '@hibiscus/ui';
import Image from 'next/image';

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
        organizerId: data.organizer_id,
      });
    });
  }, [user]);

  return (
    <PageContainer>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : !noTeam ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TeamHeader />
            <TeamMembersWidget />
          </div>
          <StyledImage
            style={{ marginLeft: '100px', marginTop: '100px' }}
            width="350"
            height="250"
            src={'/hackform-illustrations/postcard-world.svg'}
            alt="Illustration"
          />
        </div>
      ) : (
        <div>
          <NoTeamPlaceholder />
          <StyledImage
            style={{ marginTop: '5rem' }}
            width="450"
            height="350"
            src={'/hackform-illustrations/postcard.svg'}
            alt="Illustration"
          />
        </div>
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
  @media (max-width: 400px) {
    margin: 8rem 0rem;
  }
`;

const StyledImage = styled(Image)`
  @media (max-width: 400px) {
    display: none;
  }
`;
