import { InputHTMLAttributes, useRef } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface OneLineTextProps
  extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

export function OneLineText(props: OneLineTextProps) {
  return <Input {...props} type="text" />;
}

export default OneLineText;

const Input = styled.input`
  all: unset;
  background: #565656;
  /* gray/light */
  width: 250px;
  height: 42px;
  border: 1.5px solid #f4f4f4;
  border-radius: 11px;
  padding-left: 20px;

  //font
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 42px;
  font-feature-settings: 'cv05' on;

  /* gray/light */

  color: #f4f4f4;
  :hover {
    filter: drop-shadow(0px 0px 15px #c2c2c2);
  }
  :focus {
    /* gray/medium */

    background: #565656;
    /* purple/standard */

    border: 1.5px solid #7a65fd;
    border-radius: 11px;
  }
`;
