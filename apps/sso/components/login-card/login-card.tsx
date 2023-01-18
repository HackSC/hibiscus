import styled from 'styled-components';
import { useState } from 'react';
import { GradientSpan, Text } from '@hibiscus/ui';
import { Colors2023, TrademarkColors } from '@hibiscus/styles';
import Image from 'next/image';
import * as SSOClient from '@hibiscus/sso-client';
import GrayLink from '../gray-link/gray-link';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { container } from 'tsyringe';
import { MutatingDots } from 'react-loader-spinner';

export function LoginCard() {
  const [hideErrorMessage, setHideErrorMessage] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedInState, setLoggedInState] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const supabase = container.resolve(HibiscusSupabaseClient);
    const { data, error } = await supabase.signInWithPassword(email, password);

    if (error) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        const message = error.message;
        setErrorMessage(message);
        setHideErrorMessage(false);
      }
    }

    if (data.user) {
      setLoggedInState('logging in');
      const token = data.session.access_token;
      const res = await SSOClient.ssoCallback(
        sessionStorage.getItem('callback'),
        token
      );
      window.location.replace(
        res?.redirect ?? process.env.NEXT_PUBLIC_SSO_DEFAULT_REDIRECT_URL
      );
    }
  }

  return (
    <StyledLoginCard>
      <Image
        src="/static/images/Logo.svg"
        alt="HackSC Logo"
        width={100}
        height={100}
      />
      <StyledText>
        Login to your <GradientSpan>HackSC Account</GradientSpan>
      </StyledText>
      <StyledForm onSubmit={handleSubmit}>
        <Input
          placeholder="enter your email"
          type="email"
          name="email"
          required
        />
        <Input
          placeholder="enter your password"
          type="password"
          name="password"
          required
        />
        <StyledErrorText
          style={{ display: !hideErrorMessage ? 'block' : 'none' }}
        >
          {errorMessage}
        </StyledErrorText>
        <GradientButton type="submit">SIGN IN</GradientButton>
      </StyledForm>
      <GrayLink href="/reset-email">Forgot Password?</GrayLink>
      <GrayLink href="/signup">Create a HackSC account</GrayLink>

      {loggedInState === 'logging in' ? (
        <MutatingDots
          height="100"
          width="100"
          color={Colors2023.PINK.LIGHT}
          secondaryColor={Colors2023.PINK.LIGHT}
          radius="12.5"
          ariaLabel="mutating-dots-loading"
        />
      ) : (
        ''
      )}
    </StyledLoginCard>
  );
}

export default LoginCard;

const StyledLoginCard = styled.div`
  min-width: 35rem;
  max-width: 50rem;
  color: #2b2b2b;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: auto;
  align-items: center;
  border-radius: 20px;
  border: 4px solid rgba(255, 255, 255, 0.5);

  @media (max-width: 400px) {
    min-width: 23rem;
  }
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const StyledText = styled(Text)`
  font-size: 24px;
  padding-top: 1rem;
  @media (max-width: 400px) {
    font-size: 20px;
  }
`;

const StyledErrorText = styled(Text)`
  font-size: 20px;
  padding-top: 1rem;
  color: red;
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
  width: 100%;
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
  padding: 10px 15px;
  cursor: pointer;
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
