import { H1, H3 } from '@hacksc-platforms/ui';
import { FC } from 'react';
import styled from 'styled-components';
import ham from './mobile-navbar.module.css';

const MobileNavbar: FC = () => {
  return (
    <MobileNavbarContainer>
      <StyledText>HackSC</StyledText>
      <TheBurger />
    </MobileNavbarContainer>
  );
};

const TheBurger = () => {
  return (
    <nav role="navigation">
      <div className={`${ham.menuToggle}`}>
        <input type="checkbox" aria-label="Toggle navigation" />
        <span></span>
        <span></span>
        <span></span>

        <ul className={`${ham.menu}`}>
          <StyledLink>
            <a href="https://hacksc.com/">
              <li>Overview</li>
            </a>
          </StyledLink>
          <StyledLink>
            <a href="https://team.hacksc.com" target="_blank" rel="noreferrer">
              <li>Join Us</li>
            </a>
          </StyledLink>
          <DropdownMenu>
            <li>Previous Hackathons ▾</li>
            <DropdownContent>
              <DropdownContentItem>
                <a
                  href="https://2022.hacksc.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <DropdownLink>HackSC 2022</DropdownLink>
                </a>
              </DropdownContentItem>
              <DropdownContentItem>
                <a
                  href="https://2021.hacksc.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <DropdownLink>HackSC 2021</DropdownLink>
                </a>
              </DropdownContentItem>
              <DropdownContentItem>
                <a
                  href="https://2020.hacksc.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <DropdownLink>HackSC 2020</DropdownLink>
                </a>
              </DropdownContentItem>
            </DropdownContent>
          </DropdownMenu>
        </ul>
      </div>
    </nav>
  );
};

export default MobileNavbar;

const MobileNavbarContainer = styled.div`
  width: 100%;
  padding-top: 5vh;
  padding-left: 10%;
  padding-right: 12%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledText = styled(H1)`
  color: white;
  font-weight: 700;
  letter-spacing: -5%;
  flex: 2;
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const StyledLink = styled(H3)``;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  flex-direction: column;
  align-items: center;
  min-width: 10rem;
  padding: 0.3rem;
  border-radius: 0.5rem;
  margin-left: 7rem;
  margin-top: -0.3rem;
`;

const DropdownContentItem = styled.div`
  padding: 0.3rem 0;
  margin: 0.3rem 0 0;
  background: #fff;
  box-shadow: 5px 5px 10px 3px rgb(172, 172, 172, 0.7);
  width: 100%;
  text-align: center;
  border-radius: 0.4rem;
  &:hover {
    background-color: #faf9f9;
  }
`;

const DropdownLink = styled.div`
  font-family: InterVariable;
  font-size: 1.1rem;
  font-weight: 400;
  color: #2b2b2b;
  text-decoration: none;
  border: none;
  background: none;
  padding: 0.75rem;
  border-radius: 0.4rem;
`;

const DropdownMenu = styled.div`
  font-size: medium;
  cursor: pointer;
  position: relative;

  &:hover ${DropdownContent} {
    display: flex;
  }
`;
