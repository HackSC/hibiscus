import { Text } from '@hibiscus/ui';
import styled from 'styled-components';

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Radio(props: RadioProps) {
  return (
    <StyledRadio>
      <Text>{props.label}</Text>
      <input {...props} type="radio" />
      <span className="checkmark"></span>
    </StyledRadio>
  );
}

const StyledRadio = styled.label`
  color: white;
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  font-family: 'Inter';
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #565656;
    border: 1px solid #307c93;
    border-radius: 50%;
  }

  :hover input ~ .checkmark {
    /* background-color: #ccc; */
    filter: drop-shadow(0px 0px 15px #c2c2c2);
  }
  /* input:checked ~ .checkmark {
        background-color: #76D3EF;
    } */
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }
  input:checked ~ .checkmark:after {
    display: block;
  }
  .checkmark:after {
    top: 5px;
    left: 5px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #76d3ef;
  }
`;
