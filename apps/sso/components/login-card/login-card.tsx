/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import {GradientSpan, Link, Text} from "@hacksc-platforms/ui";
import { TrademarkColors } from '@hacksc-platforms/styles';

/* eslint-disable-next-line */
export interface LoginCardProps {}

export function LoginCard(props: LoginCardProps) {
  return (
    <StyledLoginCard>
      <img src="/images/Logo.svg" alt='HackSC Logo' width="100px"/>
      <StyledText>Login to your <GradientSpan>HackSC Account</GradientSpan></StyledText>
      <Input placeholder='enter your email' type="email"/>
      <Input placeholder='enter your password' type="password"/>
      <GradientButton>SUBMIT</GradientButton>
      <StyledLink href="/reset">Forgot password?</StyledLink>
      <StyledLink href="/signup">Create a HackSC account</StyledLink>

    </StyledLoginCard>
  );
}

export default LoginCard;

const StyledLoginCard = styled.div`
  color: #2B2B2B;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 5rem;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  border-radius: 20px;
  border: 2px white solid;
`;

const StyledText = styled(Text)`
  font-size: 24px;
  padding-top: 2rem;
`;



const Input = styled.input`
  border: solid 0.1rem #bcbcbc;
  background-color: #f8f8f8;
  border-radius: 0.3rem;
  padding: 10px;
  padding-left: 25px;
  font-family: InterVariable, sans-serif;
  font-size: 1.1rem;
  color: #676767;
  width: 120%;
  margin-top: 2rem;
`;

const GradientButton = styled.button`
background: linear-gradient(
    90deg,
    ${TrademarkColors.LIGHT_BLUE} 0%,
    ${TrademarkColors.LIGHT_PURPLE} 100%
  );
  color: white;
  font-family: Intervariable, sans-serif;
  padding: 5px 10px ;
  margin-top: 2rem;

`;

const StyledLink = styled(Link)`
  color: #939393;
  text-decoration: underline;
`;