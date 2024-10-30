import Image from 'next/image';
import HackSCLogo2 from '../../public/hacksc-logo2.svg';
import SideNavButton from './side-nav-button';
import ArrowRight from '../../public/arrow-right.svg';
import { useState } from 'react';
import { IconType } from 'react-icons';
import styled from 'styled-components';

interface Props {
  options: { name: string; url: string; image: IconType }[];
}

const SideNav = ({ options }: Props) => {
  const [selectedButton, setSelectedButton] = useState<string>(''); // currently selected button

  return (
    <div
      style={{
        backgroundColor: 'white',
        width: '250px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'black',
        gap: '5px',
        justifyContent: 'space-between',
        borderRight: '1px solid black',
      }}
    >
      <div
        style={{
          paddingLeft: '40px',
          paddingRight: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <div style={{ margin: '50px 0px 50px 0px' }}>
          <Image src={HackSCLogo2} alt="HackSC" width={150} height={75} />
        </div>

        {options.map((option) => (
          <SideNavButton
            key={option.name}
            name={option.name}
            image={option.image}
            url={option.url}
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
          />
        ))}
      </div>

      <LogoutButton>
        <div>Log out</div>
        <Image src={ArrowRight} alt={'->'} width={20} height={20}></Image>
      </LogoutButton>
    </div>
  );
};

export default SideNav;

const LogoutButton = styled.button`
  width: 100%;
  height: 40px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  cursor: pointer;
  background-color: white;
  border-top: 1px solid black;
  &:hover {
    background-color: #ddfc75;
    transition: background-color 0.3s;
  }
`;
