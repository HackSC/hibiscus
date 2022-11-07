/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { GradientSpan, Text } from '@hacksc-platforms/ui';
import { TrademarkColors } from '@hacksc-platforms/styles';

/* eslint-disable-next-line */
export interface LoginCardProps {}

export function LoginCard(props: LoginCardProps) {
  return (
    <StyledLoginCard>
      <img src="/images/Logo.svg" alt="HackSC Logo" width="100px" />
      <StyledText>
        Login to your <GradientSpan>HackSC Account</GradientSpan>
      </StyledText>
      <Input placeholder="enter your email" type="email" />
      <Input placeholder="enter your password" type="password" />
      <GradientButton>SIGN IN</GradientButton>
      <a href='/reset' rel='noreferrer'>
        <StyledLink> Forgot Password?</StyledLink>
      </a>
      <a href='/signup' rel='noreferrer'>
        <StyledLink> Create a HackSC account</StyledLink>
      </a>
    </StyledLoginCard>
  );
}

export default LoginCard;

const StyledLoginCard = styled.div`
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

const StyledLink = styled(Text)`
  font-size: 1rem;
  color: #939393;
  text-decoration: underline;
`;
