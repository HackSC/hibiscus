import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';
import React from 'react';
import { useRouter } from 'next/router'

interface Props {
  name: string;
  image: IconType;
  url: string;
  selectedButton: string;
  setSelectedButton: Dispatch<SetStateAction<string>>;
}

const SideNavButton = ({
  name,
  image,
  selectedButton,
  setSelectedButton,
  url,
}: Props) => {
  const router = useRouter();

  const handleClick = () => {
    setSelectedButton(name);
    router.push(`/${router.pathname}/${url}`);
  };

  return (
    <NavButton
      name={name}
      selectedButton={selectedButton}
      onClick={handleClick}
    >
      <div>{name}</div>
      <div style={{ width: '18px', height: '18px' }}>
        {React.createElement(image)}
      </div>
    </NavButton>
  );
};

export default SideNavButton;

interface NavButtonProps {
  name: string;
  selectedButton: string;
}

const NavButton = styled.button<NavButtonProps>`
  width: 200px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: ${(props) =>
    props.name === props.selectedButton ? '#DDFC75' : 'white'};
  border-radius: 6px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.name === props.selectedButton ? 'black' : 'white'};
  cursor: pointer;

  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) =>
      props.name !== props.selectedButton ? '#efefef' : '#DDFC75'};
  }
`;
