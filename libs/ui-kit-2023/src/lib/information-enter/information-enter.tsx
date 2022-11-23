import styled from 'styled-components';
import BlueButton from '../blue-button/blue-button';
import OneLineText from '../one-line-text/one-line-text';

export interface InformationEnterProps {
  label: string;
}

export function InformationEnter(props: InformationEnterProps) {
  return (
    <StyledInformationEnter>
      <OneLineText label="One Line Text"></OneLineText>
      <BlueButton label="UNCLICKED"></BlueButton>
    </StyledInformationEnter>
  );
}
export default InformationEnter;
const StyledInformationEnter = styled.div`
  display: inline-flex;
  gap: 15px;
`;
