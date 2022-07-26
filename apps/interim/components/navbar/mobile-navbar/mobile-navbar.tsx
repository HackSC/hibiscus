import React, {
  FC,
} from 'react';
import ham from './mobile-navbar.module.css';
import styled from 'styled-components';
import Link from 'next/link';

const MobileNavbar : FC = () => {
  return (
      <MobileNavbarContainer>
          <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              height: '100%'
          }}>
              <TheBurger />
          </div>
        </MobileNavbarContainer>
  )
}

const TheBurger = () => {
  return (
      <nav role="navigation">
          <div className={`${ham.menuToggle}`}>
              <input type="checkbox" aria-label='Toggle navigation'/>
              <span></span>
              <span></span>
              <span></span>
              
              <ul className={`${ham.menu}`}>
                  <Link href={'/'}>
                      <a href={``}><li>Overview</li></a>
                  </Link>
                  <Link href={'/sponsor'}>
                  <a href={``}><li>Sponsor Us</li></a>

                  </Link>
                  <Link href={`https://2021.hacksc.com/`}>
                      <a><li>HackSC 2021</li></a>
                  </Link>
                  <Link href={'https://2020.hacksc.com/'}>
                      <a><li>HackSC 2020</li></a>
                  </Link>
              </ul>
          </div>
      </nav>
  )
}

export default MobileNavbar;

const MobileNavbarContainer = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;