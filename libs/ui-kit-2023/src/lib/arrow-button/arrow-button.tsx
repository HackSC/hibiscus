import { Colors2023 } from '@hibiscus/styles';
import styled from 'styled-components';
import React from 'react';
import { ChevronRightIcon } from '@hibiscus/icons';

/* eslint-disable-next-line */
export interface ArrowButtonProps extends React.ButtonHTMLAttributes<any> {
  orientation?: 'right' | 'left' | 'up' | 'down';
}

export function ArrowButton(props: ArrowButtonProps) {
  return (
    <StyledArrowButton {...props} orientation={props.orientation}>
      <ChevronRightIcon
        alt={`Arrow if pressed will go to the ${
          props.orientation === 'right' || props.orientation === 'down'
            ? 'next'
            : 'previous'
        } question`}
      />
    </StyledArrowButton>
  );
}

export default ArrowButton;

const StyledArrowButton = styled.button<{
  disabled?: boolean;
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
  color: ${(props) =>
    props.disabled ? Colors2023.GRAY.MEDIUM : Colors2023.BLUE.STANDARD};
  border: 1.5px solid
    ${(props) =>
      props.disabled ? Colors2023.GRAY.MEDIUM : Colors2023.BLUE.STANDARD};
  border-radius: 8px;
  padding: 8px
    ${({ orientation }) =>
      orientation === 'up' || orientation === 'down' ? '8px' : '9px'};
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    border: 1.5px solid
      ${(props) =>
        props.disabled ? Colors2023.GRAY.MEDIUM : Colors2023.BLUE.STANDARD};
    background: ${(props) =>
      props.disabled ? Colors2023.GRAY.MEDIUM : '#307c93b2'};
    box-shadow: 0px 0px 5px
      ${(props) =>
        props.disabled ? Colors2023.GRAY.MEDIUM : 'rgba(118, 211, 239, 0.5)'};
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
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;
