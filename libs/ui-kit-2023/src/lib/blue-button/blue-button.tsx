import styled from 'styled-components';

/* eslint-disable-next-line */
export interface BlueButtonProps {
  label: string;
}

export function BlueButton(props: BlueButtonProps) {
  return <Button>{props.label}</Button>;
}

export default BlueButton;

const Button = styled.button`
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
  }
  :active {
    background: #76d3ef;
    box-shadow: inset 1.5px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;
