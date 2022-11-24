import styled from 'styled-components';
import BlueButton from '../blue-button/blue-button';
import OneLineText from '../one-line-text/one-line-text';

export interface InformationEnterProps {
  textLabel: string;
  buttonLabel: string;
  onInput: (value: string) => void;
}

export function InformationEnter(props: InformationEnterProps) {
  return (
    <StyledInformationEnter>
      <OneLineText
        onInput={props.onInput}
        label={props.textLabel}
      ></OneLineText>
      <BlueButton label={props.buttonLabel}></BlueButton>
    </StyledInformationEnter>
  );
}
export default InformationEnter;
const StyledInformationEnter = styled.div`
  display: inline-flex;
  gap: 15px;
`;
