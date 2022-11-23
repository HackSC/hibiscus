import { useEffect, useRef } from 'react';
import styled from 'styled-components';

export interface SwitchProps {
  label: string;
}

export function Switch(props: SwitchProps) {
  return (
    <Div>
      <StyledSwitch>
        <input type="checkbox" />
        <span className="slider round"></span>
      </StyledSwitch>
      <p
        style={{
          color: 'white',
          // position: 'relative',
          // bottom: 15.5,
          // left: 10,
          fontSize: '22px',
          fontFamily: 'Inter',
        }}
      >
        {props.label}
      </p>
    </Div>
  );
}

const Div = styled.div`
  display: inline-flex;
  align-items: center;
  height: 34px;
  gap: 10px;
`;
const StyledSwitch = styled.label`
  color: white;
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  /* Hide default HTML checkbox */
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #307c93;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 2px;
    bottom: 2px;
    background-color: #76d3ef;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #565656;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #565656;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
    border: 2px solid #76d3ef;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;
