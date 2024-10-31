import styled from 'styled-components';
import { useState } from 'react';
import { H3, Text } from '@hibiscus/ui';
import { Colors2023 } from '@hibiscus/styles';
import Image from 'next/image';
import * as SSOClient from '@hibiscus/sso-client';
import GrayLink from '../gray-link/gray-link';
import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';
import { MutatingDots } from 'react-loader-spinner';
import { StyledAuthCard } from '../auth-components/styled-card';
import { Input } from '../auth-components/styled-input';
import { Button, ColorSpanBold } from '@hibiscus/ui-kit-2023';
import { AuthError, Session, User } from '@supabase/supabase-js';
import useLoadGoogle from '../../hooks/useLoadGoogle';

type SupabaseRes =
  | {
      user: User;
      session: Session;
    }
  | {
      user: null;
      session: null;
    };

export function LoginCard() {
  const [hideErrorMessage, setHideErrorMessage] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedInState, setLoggedInState] = useState('');
  const { supabase } = useHibiscusSupabase();

  const GoogleCard = useLoadGoogle();

  window.handleSignInWithGoogle = async (response) => {
    console.log(response);
    const { data, error } = await supabase.getClient().auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
    });

    console.log(data, error);

    const email = data.user.email!;
    const name = data.user.user_metadata.full_name;
    const first_name = name.split(' ')[0];
    const last_name = name.split(' ')[1] ? name.split(' ')[1] : '';

    if (!email) {
      setErrorMessage('Email not found');
      setHideErrorMessage(false);
    }
    console.log(email);

    const { data: profileData, error: profileError } = await supabase
      .getClient()
      .from('user_profiles')
      .select()
      .eq('email', email);

    if (profileError) {
      console.error(profileError);
    }

    if (profileData && profileData.length === 0) {
      console.log('inserting');
      const res = await fetch('/api/googleSignUp', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          first_name: first_name,
          last_name: last_name,
          user_id: data.user.id,
        }),
      });
      if (res.status !== 200) {
        console.error('Failed to insert user profile');
      }
    }

    await signIn(data, error);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const { data, error } = await supabase.signInWithPassword(email, password);

    await signIn(data, error);
  }

  async function signIn(data: SupabaseRes, error: AuthError) {
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
    <StyledAuthCard>
      <Image
        src="/static/images/logo-2023.svg"
        alt="HackSC Logo"
        width={100}
        height={100}
      />
      <H3>
        Log in to your{' '}
        <ColorSpanBold color={Colors2023.BLUE.STANDARD}>
          HackSC Account
        </ColorSpanBold>
      </H3>
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
        <Button color="blue">SIGN IN</Button>
      </StyledForm>
      <GoogleCard />
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
    </StyledAuthCard>
  );
}

export default LoginCard;

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
