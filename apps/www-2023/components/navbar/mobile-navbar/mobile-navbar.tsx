/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import styled from 'styled-components';
import ham from './mobile-navbar.module.css';

const MobileNavbar: FC = () => {
  return (
    <MobileNavbarContainer>
      <LogoContainer>
        <img src="./img/logos/logo.svg" alt="HackSC 2023 Logo" />
      </LogoContainer>
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
          <a href="https://hacksc.com/">
            <li>Overview</li>
          </a>
          <a href="https://team.hacksc.com">
            <li>About our team</li>
          </a>
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
  padding-top: 2vh;
  padding-left: 7%;
  padding-right: 12%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  > img {
    width: 12rem;
  }
`;

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
  background: #313131;
  width: 100%;
  text-align: center;
  border-radius: 0.4rem;
  &:hover {
    background-color: #565656;
  }
`;

const DropdownLink = styled.div`
  font-family: InterVariable;
  font-size: 1.1rem;
  font-weight: 400;
  color: #fff;
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
