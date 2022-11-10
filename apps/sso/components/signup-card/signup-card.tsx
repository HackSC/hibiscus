/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { GradientSpan, Text } from '@hacksc-platforms/ui';
import { TrademarkColors } from '@hacksc-platforms/styles';
import { useRouter } from 'next/router';
import supabase from '../../../supabase/specs/supabase';

/* eslint-disable-next-line */
export interface SignUpProps {}

export function SignUpCard(props: SignUpProps) {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email);
    console.log(password);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) console.log(error);

    if (data.user) {
      console.log(data.user);
      router.push({
        pathname: '/verify',
        query: { email: email },
      });
    }
  }

  return (
    <StyledLoginCard>
      <img src="/images/Logo.svg" alt="HackSC Logo" width="100px" />
      <StyledText>
        Create a <GradientSpan>HackSC Account</GradientSpan>
      </StyledText>
      <form onSubmit={handleSubmit}>
        <Input placeholder="sample@email.edu" type="email" name="email" />
        <Input placeholder="password" type="password" name="password" />
        <Input placeholder="re-enter password" type="password" />
        <GradientButton type="submit">SIGN UP</GradientButton>
      </form>
      <a href="/login" rel="noreferrer">
        <StyledLink> Have an account? Login</StyledLink>
      </a>
    </StyledLoginCard>
  );
}

export default SignUpCard;

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
