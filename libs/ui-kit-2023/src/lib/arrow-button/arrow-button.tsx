import { Colors2023 } from '@hacksc-platforms/styles';
import styled from 'styled-components';
import Image from 'next/image';
import arrow from '../../assets/chevron-down.svg';
import React from 'react';

/* eslint-disable-next-line */
export interface ArrowButtonProps extends React.ButtonHTMLAttributes<any> {
  orientation?: 'right' | 'left' | 'up' | 'down';
}

export function ArrowButton(props: ArrowButtonProps) {
  return (
    <StyledArrowButton {...props} orientation={props.orientation}>
      <Image
        src={arrow}
        alt={`Arrow if pressed will go to the ${
          props.orientation === 'right' || props.orientation === 'down'
            ? 'next'
            : 'previous'
        } question`}
        width={20}
        height={20}
      />
    </StyledArrowButton>
  );
}

export default ArrowButton;

const StyledArrowButton = styled.button<{
  orientation: ArrowButtonProps['orientation'];
}>`
  transform: ${({ orientation }) =>
    orientation === 'left'
      ? 'rotate(180deg)'
      : orientation === 'down'
      ? 'rotate(90deg)'
      : orientation === 'up'
      ? 'rotate(-90deg)'
      : 'rotate(0)'};
  background: transparent;
  color: ${Colors2023.BLUE.STANDARD};
  border: 1.5px solid ${Colors2023.BLUE.STANDARD};
  border-radius: 8px;
  padding: 8px
    ${({ orientation }) =>
      orientation === 'up' || orientation === 'down' ? '8px' : '9px'};
  display: flex;
  align-items: center;
  justify-content: center;
`;
