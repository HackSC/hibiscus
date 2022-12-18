import styled from 'styled-components';
import Image from 'next/image';
import { Link } from '@hacksc-platforms/ui';

/* eslint-disable-next-line */
export interface TopBarProps {
  userTag: string;
  role: string; // TODO: replace this with role type/enum
}

const StyledTopBar = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export function TopBar(props: TopBarProps) {
  return (
    <StyledTopBar>
      <Image
        style={{ margin: '5px 0 0 30px' }}
        width="200"
        height="100"
        src="/hacksc-logo.svg"
        alt=""
      />
      <UserText>
        {props.userTag}&nbsp;&nbsp;&nbsp;<Emphasis>{props.role}</Emphasis>
        &nbsp;&nbsp;
        <LogoutButton>
          <Image
            style={{ position: 'relative', top: 3 }}
            width="18"
            height="18"
            src="/log-out.svg"
            alt="Log out of Hibiscus"
          />
        </LogoutButton>
      </UserText>
    </StyledTopBar>
  );
}

export default TopBar;

const UserText = styled.p`
  margin: 30px;
`;
const Emphasis = styled.span`
  color: #ffa295;
  text-shadow: 0px 0px 15px #fe5139;
`;

const LogoutButton = styled.button`
  cursor: pointer;
  background: none;
  padding: 0;
`;
