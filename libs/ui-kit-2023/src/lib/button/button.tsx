import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Colors2023 } from '@hibiscus/styles';

/* eslint-disable-next-line */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'blue' | 'black' | 'purple';
}

export function Button(props: ButtonProps) {
  if (props.color === 'blue') {
    return <BlueButton onClick={props.onClick}>{props.children}</BlueButton>;
  } else if (props.color === 'black') {
    return <BlackButton onClick={props.onClick}>{props.children}</BlackButton>;
  } else {
    return (
      <PurpleButton onClick={props.onClick}>{props.children}</PurpleButton>
    );
  }
}

export default Button;

const PurpleButton = styled.button`
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 30px;
  gap: 10px;
  background: #7a65fd;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  cursor: pointer;
  //fonts
  font-family: 'Inter';

  font-weight: 700;
  font-size: 13px;
  line-height: 36px;
  text-align: center;
  letter-spacing: 0.2em;
  border: none;
  color: #313131;
  :hover {
    background: #4130a7;
    cursor: pointer;
  }
  :active {
    background: #7a65fd;
    box-shadow: inset 1.5px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;

const BlackButton = styled.button`
  height: 45px;
  border: 1.5px solid ${Colors2023.BLUE.STANDARD};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 30px;
  gap: 10px;
  background: ${Colors2023.GRAY.DARK};
  border-radius: 10px;
  //fonts
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 36px;
  text-align: center;
  letter-spacing: 0.2em;
  color: ${Colors2023.BLUE.STANDARD};
  :hover {
    border: 1.5px solid ${Colors2023.BLUE.STANDARD};
    background: #307c93b2;
    box-shadow: 0px 2px 15px rgba(118, 211, 239, 0.7);
    cursor: pointer;
    transition: 0.1s;
  }
  :active {
    border: 1.5px solid ${Colors2023.BLUE.STANDARD};
    background: ${Colors2023.BLUE.STANDARD};
    color: ${Colors2023.BLUE.DARK};
    box-shadow: 0px 2px 15px rgba(118, 211, 239, 0.7);
    border-radius: 10px;
  }
`;

const BlueButton = styled.button`
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 30px;
  gap: 0px;
  background: #76d3ef;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  //fonts
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 36px;
  text-align: center;
  letter-spacing: 0.2em;
  border: none;
  color: #313131;
  :hover {
    background: #307c93;
    cursor: pointer;
  }
  :active {
    background: #76d3ef;
    box-shadow: inset 1.5px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;
