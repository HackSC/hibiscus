import React, { FC } from 'react';
import ham from './mobile-navbar.module.css';
import styled from 'styled-components';
import Link from 'next/link';

const MobileNavbar: FC = () => {
  return (
    <MobileNavbarContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <TheBurger />
      </div>
    </MobileNavbarContainer>
  );
};

const TheBurger = () => {
  return (
      <nav role="navigation">
          <div className={`${ham.menuToggle}`}>
              <input type="checkbox" aria-label='Toggle navigation'/>
              <span></span>
              <span></span>
              <span></span>

              <ul className={`${ham.menu}`}>
                  <StyledLink href={'/'}>
                      <a href={``}><li>Overview</li></a>
                  </StyledLink>
                  <StyledLink href={'https://team.hacksc.com'}>
                  <a href={``}><li>Join Us</li></a>

                  </StyledLink>
                  <DropdownMenu>
                    <li>Previous Hackathons ▾</li>
                    <DropdownContent>
                      <DropdownContentItem>
                        <a href='https://2022.hacksc.com' target='_blank' rel='noreferrer'>
                          <DropdownLink>HackSC 2022</DropdownLink>
                        </a>
                      </DropdownContentItem>
                      <DropdownContentItem>
                        <a href='https://2021.hacksc.com' target='_blank' rel='noreferrer'>
                          <DropdownLink>HackSC 2021</DropdownLink>
                        </a>
                      </DropdownContentItem>
                      <DropdownContentItem>
                        <a href='https://2020.hacksc.com' target='_blank' rel='noreferrer'>
                          <DropdownLink>HackSC 2020</DropdownLink>
                        </a>
                      </DropdownContentItem>
                    </DropdownContent>
                  </DropdownMenu>
              </ul>
          </div>
      </nav>
  )
}

export default MobileNavbar;

const MobileNavbarContainer = styled.div `
padding-top: 5vh;
  padding-left: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
`;

const StyledLink = styled(Link)`
  font-family: Inter,sans-serif;
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
`;

const DropdownContentItem = styled.div`
  padding: 0;
  margin: 0.3rem 0;
  background: #fff;
  width: 100%;
  text-align: center;
  border-radius: 0.4rem;
  &:hover {
    background-color: #faf9f9;
  }
`;

const DropdownLink = styled.button`
  font-family: Inter, sans-serif;
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
