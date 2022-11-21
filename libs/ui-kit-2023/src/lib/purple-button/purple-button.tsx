import styled from 'styled-components';

/* eslint-disable-next-line */
export interface PurpleButtonProps {
  label: string;
}

export function PurpleButton(props: PurpleButtonProps) {
  return (
      <Button>{props.label}</Button>
  );
}

export default PurpleButton;

const Button = styled.button`
    height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 30px;
  gap: 10px;
  background: #7A65FD;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  //fonts
  /* font-family: 'Inter'; */

  font-weight: 700;
  font-size: 13px;
  line-height: 36px;
  text-align: center;
  letter-spacing: 0.2em;
  border: none;
  color: #313131;
  :hover {
    background: #4130A7;
  }
  :active {
    background: #7A65FD;
    box-shadow: inset 1.5px 4px 0px rgba(0, 0, 0, 0.25);
  }
`