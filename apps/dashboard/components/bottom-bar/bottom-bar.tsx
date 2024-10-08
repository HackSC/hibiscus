import styled from 'styled-components';
import Image from 'next/image';
import { Link, Text } from '@hibiscus/ui';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import { HibiscusRole } from '@hibiscus/types';
import { Colors2023 } from '@hibiscus/styles';
import { logout } from '@hibiscus/sso-client';
import HackSCLogo from '../svg/hacksc-logo';
import HackSCLogoNoWords from '../svg/hacksc-logo-nowords';

export function BottomBar() {
  return (
    <StyledBottomBar>
      <HackSCLogoNoWords />
      <UserText>
        Powered by <span style={{ fontWeight: 700 }}>HackSC</span>
      </UserText>
    </StyledBottomBar>
  );
}

export default BottomBar;

const StyledBottomBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 2rem 3rem;
  gap: 0.5rem;
`;

const UserText = styled(Text)`
  color: #ff6347;
`;
