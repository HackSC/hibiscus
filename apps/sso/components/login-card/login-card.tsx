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
import { BackgroundShapes } from '../colored-shapes/background-shapes'; 
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
  const { supabase } = useHibiscusSupabase();

  async function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

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
    <>
    {/* Add Styled Shapes for page */}
    <BackgroundShapes></BackgroundShapes>
    <HackSCTag>HackSC</HackSCTag>
    <StyledAuthCard>
      <HeadingContainer>
        <h1>
          HackSC
        </h1>
        <h2>
          Sign-In
        </h2>
      </HeadingContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Input
          placeholder="Enter your email"
          type="email"
          name="email"
          required
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          required
        />
        <StyledErrorText
          style={{ display: !hideErrorMessage ? 'block' : 'none' }}
        >
          {errorMessage}
        </StyledErrorText>
        <Button color="beige">Sign-in</Button>
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
    </StyledAuthCard>
    </>
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


const HeadingContainer = styled.div`
  display:flex; 
  justify-content: center; 
  align-items: flex-end; 
  > h1 {
    font-family: 'Hanken Grotesk', sans-serif; 
    font-size: 48px; 
    font-weight: 700; 
    margin-right: 1px;
  }
  > h2 {
    font-family: 'Hanken Grotesk', sans-serif; 
    font-size: 32px; 
    font-weight: 400; 
    line-height: 70px; 
    margin-left: 1px; 
  }
`;

const HackSCTag = styled.div`
  min-width: 7%; 
  min-height: 7%;
  background: #429FEE;
  display: flex; 
  border: 0.5px solid #000000; 
  justify-content: center; 
  align-items: center; 
  border-radius: 5px;
  position: fixed; 
  right: 3.5%; 
  top: 3%; 
  font-size: 1.5vw;  
  color: black; 
`;