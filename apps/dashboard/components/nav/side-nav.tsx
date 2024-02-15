import styled from 'styled-components';
import Image from 'next/image';
import hibiscusIcon from '../../../../images/hibiscus-platform-logo-hi.png';
import { BsFolder2Open, BsPersonFill } from 'react-icons/bs';
import { BsCalendarCheck } from 'react-icons/bs';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { useMediaQuery } from 'react-responsive';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import { useMemo } from 'react';
import { HibiscusRole } from '@hibiscus/types';
import { useRouter } from 'next/router';
import { Colors } from '@hacksc/sctw-ui-kit';
import { BiFolder } from 'react-icons/bi';
import { FaFolderOpen } from 'react-icons/fa';

// #CEA00C

const MainWrapper = styled.div`
  height: 100%;

  flex: 0 0 200px;
`;

const StyledH1 = styled.h1`
  font-family: 'Neue Haas Unica', sans-serif;
  font-weight: 500;
  font-size: 18px;
  display: inline;
  margin-left: 5px;
`;

const HeadingContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-left: 10px;
  margin-bottom: 100px;
  align-items: center;
`;

const ButtonContainer = styled.div<{ hoverColor: string }>`
  height: 50px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;

  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.hoverColor};
    border-left: 8px solid white;
  }
`;

const ButtonH1 = styled.h1`
  font-family: 'Neue Haas Unica', sans-serif;
  font-weight: 310;
  font-size: 18px;
  display: inline;
  margin-left: 20px;
`;

const Ellipse = styled.div`
  width: 40px;
  height: 40px;
  background-color: #ecb400;
  border-radius: 50%;
  position: fixed;
  top: 0;
  margin-left: 180px;
`;

const PersonIcon = styled(BsPersonFill)`
  margin-left: 20px;
`;

const CalendarIcon = styled(BsCalendarCheck)`
  margin-left: 20px;
`;

const SquaresIcon = styled(HiOutlineSquares2X2)`
  margin-left: 20px;
`;

const FileIcon = styled(FaFolderOpen)`
  margin-left: 20px;
`;

const BoothIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 48 48"
    style={{ marginLeft: '20px' }}
  >
    <path
      fill="none"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="4"
      d="M4 5h40v8l-1.398.84a7 7 0 0 1-7.203 0L34 13l-1.398.84a7 7 0 0 1-7.203 0L24 13l-1.398.84a7 7 0 0 1-7.204 0L14 13l-1.399.84a7 7 0 0 1-7.202 0L4 13V5Zm2 20h36v18H6zm3-9v9m30-9v9"
    />
  </svg>
);

const JUDGE_NAVBAR = [
  { label: 'Events', icon: CalendarIcon, url: '/events' },
  { label: 'Leaderboard', icon: SquaresIcon, url: '/leaderboard' },
  { label: 'Team Matching', icon: SquaresIcon, url: '/team-matching' },
  // { label: 'Profile', icon: PersonIcon, url: '/profile' },
];

const SPONSOR_NAVBAR = [
  { label: 'My Booth', icon: BoothIcon, url: '/sponsor-booth' },
  {
    label: 'Representative Packet',
    icon: FileIcon,
    url: '/representative-packet.pdf',
  },
];

function StyledSideNav() {
  // Media query hook
  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });

  const router = useRouter();

  const { user } = useHibiscusUser();
  const items = useMemo(() => {
    if (user == null) return [];
    if (user.role === HibiscusRole.HACKER) return JUDGE_NAVBAR;
    if (user.role === HibiscusRole.SPONSOR) return SPONSOR_NAVBAR;
    return [];
  }, [user]);
  const hoverColor = useMemo(() => {
    if (user == null) return Colors.Yellow.Yuhlow;
    if (user.role === HibiscusRole.HACKER) return Colors.Yellow.Yuhlow;
    if (user.role === HibiscusRole.SPONSOR) return Colors.Red.Redward;
    return Colors.Yellow.Yuhlow;
  }, [user]);

  return (
    <>
      {isSmallScreen ? null : (
        <MainWrapper>
          <HeadingContainer>
            <Image
              src={hibiscusIcon}
              alt="HackSC Logo"
              width={40}
              height={40}
            />
            <StyledH1> HackSC X </StyledH1>
          </HeadingContainer>

          {items.map((it) => (
            <ButtonContainer
              key={it.label}
              onClick={() => router.push(it.url)}
              hoverColor={hoverColor}
            >
              <it.icon size={25} />
              <ButtonH1> {it.label} </ButtonH1>
            </ButtonContainer>
          ))}
        </MainWrapper>
      )}
    </>
  );
}

export default StyledSideNav;
