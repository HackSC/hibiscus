import { Colors2023 } from '@hibiscus/styles';
import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface OneLineTextProps
  extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export function OneLineText(props: OneLineTextProps) {
  return <Input {...props} type="text" />;
}

export default OneLineText;

const Input = styled.input`
  all: unset;
  background: ${Colors2023.GRAY.MEDIUM};
  min-width: 250px;
  min-height: 42px;
  border: 1.5px solid ${Colors2023.GRAY.LIGHT};
  border-radius: 11px;
  padding: 0 20px;

  // font
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 42px;
  font-feature-settings: 'cv05' on;

  color: ${Colors2023.GRAY.LIGHT};
  :hover {
    filter: drop-shadow(0px 0px 15px #c2c2c2);
  }
  :focus {
    background: ${Colors2023.GRAY.MEDIUM};
    border: 1.5px solid ${Colors2023.PURPLE.STANDARD};
    border-radius: 11px;
  }
`;
