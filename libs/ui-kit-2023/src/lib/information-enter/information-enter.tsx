import styled from 'styled-components';
import Button from '../button/button';
import OneLineText from '../one-line-text/one-line-text';

export interface InformationEnterProps {
  textPlaceholder: string;
  buttonLabel: string;
  onInput: (value: string) => void;
  onSubmit: (value: string) => void;
}

export function InformationEnter(props: InformationEnterProps) {
  return (
    <StyledInformationEnter>
      <OneLineText
        onInput={props.onInput}
        placeholder={props.textPlaceholder}
      />
      <Button color="blue">{props.buttonLabel}</Button>
    </StyledInformationEnter>
  );
}

export default InformationEnter;
const StyledInformationEnter = styled.div`
  display: inline-flex;
  gap: 15px;
`;
