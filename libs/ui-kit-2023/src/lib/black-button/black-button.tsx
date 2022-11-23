import styled from 'styled-components';

/* eslint-disable-next-line */
export interface BlackButtonProps {
  label: string;
}

export function BlackButton(props: BlackButtonProps) {
  return <Button>{props.label}</Button>;
}

export default BlackButton;

const Button = styled.button`
  height: 45px;
  border: 1.5px solid #76d3ef;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 30px;
  gap: 10px;
  background: #222222;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  //fonts
  /* font-family: 'Inter'; */
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 36px;
  text-align: center;
  letter-spacing: 0.2em;
  color: #76d3ef;
  :hover {
    color: #307c93;
    border: 1.5px solid #307c93;
  }
  :active {
    border: 1.5px solid #76d3ef;
    color: #76d3ef;
    box-shadow: inset 1px 2px 0px #76d3ef;
    border-radius: 10px;
  }
`;
