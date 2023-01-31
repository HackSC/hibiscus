import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Colors2023 } from '@hibiscus/styles';

/* eslint-disable-next-line */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'blue' | 'black' | 'purple' | 'red' | 'yellow' | 'grey';
  disabled?: boolean;
}

export function Button(props: ButtonProps) {
  if (props.disabled) {
    return <DisabledButton>{props.children}</DisabledButton>;
  }
  if (props.color === 'blue') {
    return <BlueButton {...props}>{props.children}</BlueButton>;
  } else if (props.color === 'black') {
    return <BlackButton {...props}>{props.children}</BlackButton>;
  } else if (props.color === 'purple') {
    return <PurpleButton {...props}>{props.children}</PurpleButton>;
  } else if (props.color === 'yellow') {
    return <YellowButton {...props}>{props.children}</YellowButton>;
  } else if (props.color === 'grey') {
    return <GreyButton {...props}>{props.children}</GreyButton>;
  } else {
    return <RedButton {...props}>{props.children}</RedButton>;
  }
}

export default Button;
const GreyButton = styled.button`
  width: fit-content;
  height: 45px;
  border: 1.5px solid ${Colors2023.GRAY.SHLIGHT};
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
  color: ${Colors2023.GRAY.SHLIGHT};
  :hover {
    border: 1.5px solid ${Colors2023.GRAY.MEDIUM};
    background: #777;
    box-shadow: 0px 0px 5px ${Colors2023.GRAY.DARK};
    cursor: pointer;
    transition: 0.1s;
  }
  :active {
    border: 1.5px solid ${Colors2023.GRAY.SHLIGHT};
    background: ${Colors2023.GRAY.SHLIGHT};
    color: ${Colors2023.GRAY.DARK};
    box-shadow: 0px 0px 5px #777;
    border-radius: 10px;
  }
`;
const YellowButton = styled.button`
  width: fit-content;
  height: 45px;
  border: 1.5px solid ${Colors2023.YELLOW.STANDARD};
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
  color: ${Colors2023.YELLOW.STANDARD};
  :hover {
    border: 1.5px solid ${Colors2023.YELLOW.STANDARD};
    background: #958141;
    box-shadow: 0px 0px 5px ${Colors2023.YELLOW.DARK};
    cursor: pointer;
    transition: 0.1s;
  }
  :active {
    border: 1.5px solid ${Colors2023.YELLOW.STANDARD};
    background: ${Colors2023.YELLOW.STANDARD};
    color: ${Colors2023.YELLOW.DARK};
    box-shadow: 0px 0px 5px #958141;
    border-radius: 10px;
  }
`;

const PurpleButton = styled.button`
  width: fit-content;
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
  width: fit-content;
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
    box-shadow: 0px 0px 5px rgba(118, 211, 239, 0.5);
    cursor: pointer;
    transition: 0.1s;
  }
  :active {
    border: 1.5px solid ${Colors2023.BLUE.STANDARD};
    background: ${Colors2023.BLUE.STANDARD};
    color: ${Colors2023.BLUE.DARK};
    box-shadow: 0px 0px 5px rgba(118, 211, 239, 0.5);
    border-radius: 10px;
  }
`;

const BlueButton = styled.button`
  width: fit-content;
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
    border: 1.5px solid ${Colors2023.BLUE.STANDARD};
    background: #307c93b2;
    color: ${Colors2023.BLUE.STANDARD};
    box-shadow: 0px 0px 5px rgba(118, 211, 239, 0.5);
    cursor: pointer;
    transition: 0.1s;
  }
  :active {
    border: 1.5px solid ${Colors2023.BLUE.STANDARD};
    background: #307c93b2;
    color: white;
    box-shadow: 0px 0px 5px rgba(118, 211, 239, 0.5);
    border-radius: 10px;
  }
`;

const RedButton = styled.button`
  width: fit-content;
  height: 45px;
  border: 1.5px solid ${Colors2023.RED.STANDARD};
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
  color: ${Colors2023.RED.STANDARD};
  :hover {
    border: 1.5px solid ${Colors2023.RED.STANDARD};
    background: #933030b1;
    box-shadow: 0px 0px 5px ${Colors2023.RED.DARK};
    cursor: pointer;
    transition: 0.1s;
  }
  :active {
    border: 1.5px solid ${Colors2023.RED.STANDARD};
    background: ${Colors2023.RED.STANDARD};
    color: ${Colors2023.RED.DARK};
    box-shadow: 0px 0px 5px rgba(239, 118, 118, 0.5);
    border-radius: 10px;
  }
`;

const DisabledButton = styled.button`
  width: fit-content;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 30px;
  gap: 10px;
  background: rgb(151, 151, 151);
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
  color: #cecece;
  border: 1.5px solid #cecece;
`;
