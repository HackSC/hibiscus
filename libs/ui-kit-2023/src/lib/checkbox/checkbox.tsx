import { Colors2023 } from '@hibiscus/styles';
import { Text } from '@hibiscus/ui';
import { useRef } from 'react';
import styled from 'styled-components';

export interface CheckboxProps {
  label: string;
  color?: string;
  checked?: boolean;
  disabled?: boolean;
  onInput: (value: boolean) => void;
}

export function Checkbox({
  onInput,
  label,
  checked,
  disabled,
  color,
}: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);
  function handleChange() {
    if (!ref.current) {
      return;
    }
    onInput(ref.current.checked);
  }
  if (color === 'yellow') {
    return (
      <StyledYellowCheckbox>
        <TextWrap disabled={disabled}>{label}</TextWrap>
        <input
          ref={ref}
          disabled={disabled}
          onChange={handleChange}
          type="checkbox"
          checked={checked}
        />
        <span className="checkmark"></span>
      </StyledYellowCheckbox>
    );
  }
  return (
    <StyledCheckbox>
      <TextWrap disabled={disabled}>{label}</TextWrap>
      <input
        ref={ref}
        disabled={disabled}
        onChange={handleChange}
        type="checkbox"
        checked={checked}
      />
      <span className="checkmark"></span>
    </StyledCheckbox>
  );
}
const StyledYellowCheckbox = styled.label`
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
    border: 1px solid #ae8c1d;
    border-radius: 5px;
  }

  :hover input ~ .checkmark {
    /* background-color: #ccc; */
    filter: drop-shadow(0px 0px 15px #c2c2c2);
  }
  input:checked ~ .checkmark {
    background-color: #ffe89c;
  }

  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }
  input:checked ~ .checkmark:after {
    display: block;
  }

  .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid #ae8c1d;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  input:disabled ~ .checkmark {
    background-color: #7a7a7a;
  }

  input:disabled ~ .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid #585858;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  :hover input:disabled ~ .checkmark {
    /* background-color: #ccc; */
    filter: none;
    cursor: not-allowed;
  }
`;

const StyledCheckbox = styled.label`
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
    border-radius: 5px;
  }

  :hover input ~ .checkmark {
    /* background-color: #ccc; */
    filter: drop-shadow(0px 0px 15px #c2c2c2);
  }
  input:checked ~ .checkmark {
    background-color: #76d3ef;
  }

  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }
  input:checked ~ .checkmark:after {
    display: block;
  }

  .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid #307c93;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  input:disabled ~ .checkmark {
    background-color: #7a7a7a;
  }

  input:disabled ~ .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid #585858;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  :hover input:disabled ~ .checkmark {
    /* background-color: #ccc; */
    filter: none;
    cursor: not-allowed;
  }
`;

const TextWrap = styled(Text)<{ disabled?: boolean }>`
  color: ${(props) => (props.disabled ? Colors2023.GRAY.MEDIUM : 'white')};
`;
