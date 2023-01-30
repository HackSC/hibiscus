import React from 'react';
import styled from 'styled-components';
import useHibiscusUser from 'apps/dashboard/hooks/use-hibiscus-user/use-hibiscus-user';
import { HibiscusRole } from '@hibiscus/types';
import { H1, H3 } from '@hibiscus/ui';
import { getColorsForRole } from '../../common/role.utils';

export function Index() {
  const { user } = useHibiscusUser();
  if (user == null) {
    return <>Loading</>;
  }
  const userColors = getColorsForRole(user?.role ?? HibiscusRole.HACKER);

  return (
    <>
      <WelcomeContainer>
        <H1
          style={{
            color: userColors.light,
            fontSize: '30px',
            textShadow: `0px 0px 10px ${userColors.standard}`,
          }}
        >
          Welcome, {user.firstName}
        </H1>
        <H3 style={{ color: '#989898' }}>What would you like to do today?</H3>
      </WelcomeContainer>
    </>
  );
}

export default Index;

const WelcomeContainer = styled.div`
  @media (max-width: 400px) {
    margin-top: 5rem;
  }
`;
