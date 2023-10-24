import styled from 'styled-components';
import Image from 'next/image';
import { Link, Text } from '@hibiscus/ui';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import { HibiscusRole } from '@hibiscus/types';
import { Colors2023 } from '@hibiscus/styles';
import { logout } from '@hibiscus/sso-client';

/* eslint-disable-next-line */
export interface TopBarProps {
  userTag: string;
  role: HibiscusRole; // TODO: replace this with role type/enum
}

export function TopBar(props: TopBarProps) {
  const userColors = Colors2023.roleColors[props.role ?? HibiscusRole.HACKER];
  return (
    <StyledTopBar>
      <RightUtilityContainer>
        <UserText>@{props.userTag}</UserText>
        <RoleText>
          <GlowSpan color={'#DCAB0F'} shadowColor={'#DCAB0F'}>
            {props.role}
          </GlowSpan>
        </RoleText>
        <LogoutButton onClick={logout}>
          <Image
            style={{ position: 'relative', top: 3 }}
            width="18"
            height="18"
            src="/log-out.svg"
            alt="Log out of Hibiscus"
          />
        </LogoutButton>
      </RightUtilityContainer>
    </StyledTopBar>
  );
}

export default TopBar;

const StyledTopBar = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: flex-end;
  padding-right: 3rem;
  color: black;
  background-color: white;
  border-top-left-radius: 50px;
`;

const UserText = styled(Text)``;

const LogoutButton = styled.button`
  cursor: pointer;
  background: none;
  padding: 0;
`;

const RoleText = styled(Text)`
  font-weight: bold;
  letter-spacing: 3px;
`;

const RightUtilityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
