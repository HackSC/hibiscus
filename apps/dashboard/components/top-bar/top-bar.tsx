import styled from 'styled-components';
import Image from 'next/image';
import { Link, Text } from '@hibiscus/ui';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import { HibiscusRole } from '@hibiscus/types';
import { Colors2023 } from '@hibiscus/styles';
import { logout } from '@hibiscus/sso-client';
import HackSCLogo from '../svg/hacksc-logo';

/* eslint-disable-next-line */
export interface TopBarProps {
  userTag: string;
  role: HibiscusRole; // TODO: replace this with role type/enum
}

export function TopBar(props: TopBarProps) {
  const userColors = Colors2023.roleColors[props.role ?? HibiscusRole.HACKER];
  return (
    <StyledTopBar>
      <Link href="/" anchortagpropsoverride={{ target: '_self' }}>
        {/* <Image
          style={{ margin: '5px 0 0 20px' }}
          width="200"
          height="100"
          src="/hacksc-logo.svg"
          alt="HackSC logo"
        /> */}
        <HackSCLogo />
      </Link>
      <RightUtilityContainer>
        <UserText>{props.userTag}</UserText>
        <RoleText style={{ color: '#FF6347' }}>{props.role}</RoleText>
        <LogoutButton onClick={logout}>
          <Image
            style={{ position: 'relative' }}
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
  display: flex;
  justify-content: space-between;
  padding: 2rem 3rem;
  flex-wrap: wrap;
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
