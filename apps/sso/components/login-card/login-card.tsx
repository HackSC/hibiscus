import styled from 'styled-components';
import { useState } from 'react';
import { H3, Text } from '@hibiscus/ui';
import { Colors2023 } from '@hibiscus/styles';
import Image from 'next/image';
import * as SSOClient from '@hibiscus/sso-client';
import GrayLink from '../gray-link/gray-link';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { container } from 'tsyringe';
import { MutatingDots } from 'react-loader-spinner';
import {
  Button,
  ColorSpanBold,
  OneLinePassword,
  OneLineText,
} from '@hibiscus/ui-kit-2023';

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
        src="/static/images/logo-2023.svg"
        alt="HackSC Logo"
        width={100}
        height={100}
      />
      <H3>
        Login to your{' '}
        <ColorSpanBold color={Colors2023.BLUE.STANDARD}>
          HackSC Account
        </ColorSpanBold>
      </H3>
      <StyledForm onSubmit={handleSubmit}>
        <OneLineText
          placeholder="enter your email"
          type="email"
          name="email"
          required
        />
        <OneLinePassword
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
        <Button color="blue">SIGN IN</Button>
      </StyledForm>
      <GrayLink href="/reset-email">Forgot Password?</GrayLink>
      <GrayLink href="/signup">Create a HackSC account</GrayLink>

      {loggedInState === 'logging in' ? (
        <MutatingDots
          height="100"
          width="100"
          color={Colors2023.BLUE.LIGHT}
          secondaryColor={Colors2023.BLUE.LIGHT}
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
  min-width: 55vw;
  max-width: 90vw;
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: auto;
  align-items: center;
  border-radius: 20px;
  min-height: 55vh;
  > h3 {
    text-align: center;
  }
  border: 4px solid ${Colors2023.BLUE.STANDARD};
  box-shadow: 0px 0px 10px ${Colors2023.BLUE.LIGHT};
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 15px;
`;

const StyledErrorText = styled(Text)`
  font-size: 20px;
  padding-top: 1rem;
  color: red;
`;
