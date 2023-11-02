import styled from 'styled-components';
import { Colors2023 } from '@hibiscus/styles';
import Image from 'next/image';
import hibiscusIcon from '../../../../images/hibiscus-platform-logo.png';
import { BsPersonFill } from 'react-icons/bs';
import { BsCalendarCheck } from 'react-icons/bs';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { useMediaQuery } from 'react-responsive';

// #CEA00C

const MainWrapper = styled.div`
  height: 100%;
  width: 200px;
  position: absolute;
  left: 0;
  background-color: #ecb400;
  margin-right: 200px;
  border-radius: 0 22px 22px 0;
  z-index: 1;
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
  align-items: center;
`;

const ButtonContainer = styled.div`
  height: 50px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #cea00c;
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

function StyledSideNav() {
  // Media query hook
  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });

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
            <StyledH1> HackSC 2023 </StyledH1>
          </HeadingContainer>
          <ButtonContainer style={{ marginTop: '100px' }}>
            <CalendarIcon size={25} />
            <ButtonH1> Events </ButtonH1>
          </ButtonContainer>
          <ButtonContainer>
            <SquaresIcon size={25} style={{ marginLeft: '18px' }} />
            <ButtonH1> Leaderboard </ButtonH1>
          </ButtonContainer>
          <ButtonContainer>
            <PersonIcon size={25} />
            <ButtonH1> Profile </ButtonH1>
          </ButtonContainer>
        </MainWrapper>
      )}
    </>
  );
}

export default StyledSideNav;
