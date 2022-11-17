/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { GradientSpan, Text } from '@hacksc-platforms/ui';
import { TrademarkColors } from '@hacksc-platforms/styles';

/* eslint-disable-next-line */
export interface ResetCardProps {}

export function ResetCard(props: ResetCardProps) {
  return (
    <StyledResetCard>
      <img src="/images/Logo.svg" alt="HackSC Logo" width="100px" />
      <StyledText>
        Reset your <GradientSpan>HackSC Account</GradientSpan>
      </StyledText>
      <Input placeholder="new password" type="password" />
      <Input placeholder="re-enter your new password" type="password" />
      <GradientButton>SUBMIT</GradientButton>
    </StyledResetCard>
  );
}

export default ResetCard;

const StyledResetCard = styled.div`
  color: #2b2b2b;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: auto;
  align-items: center;
  border-radius: 20px;
  border: 4px solid rgba(255, 255, 255, 0.5);
`;

const StyledText = styled(Text)`
  font-size: 24px;
  padding-top: 1rem;
`;

const Input = styled.input`
  border: solid 0.1rem #bcbcbc;
  background-color: #f8f8f8;
  border-radius: 0.3rem;
  padding: 10px;
  padding-left: 15px;
  font-family: InterVariable, sans-serif;
  font-size: 1.1rem;
  color: #676767;
  width: 120%;
  margin-top: 1rem;
  ::placeholder {
    color: #bcbcbc;
  }
  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #bcbcbc;
  }
`;

const GradientButton = styled.button`
  background: linear-gradient(
    90deg,
    ${TrademarkColors.LIGHT_BLUE} 0%,
    ${TrademarkColors.LIGHT_PURPLE} 100%
  );
  color: white;
  border-radius: 0.3rem;
  font-family: Intervariable, sans-serif;
  padding: 10px 15px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 50%;
  font-size: 1.1rem;
  font-weight: bold;
`;
