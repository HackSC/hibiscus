import styled from 'styled-components';
import { useState } from 'react';
import { GradientSpan, Text } from '@hacksc-platforms/ui';
import { TrademarkColors } from '@hacksc-platforms/styles';
import { setCookie } from 'cookies-next';
import Image from 'next/image';
import { HibiscusSupabaseClient } from '@hacksc-platforms/hibiscus-supabase-client';
import GrayLink from '../gray-link/gray-link';
import axios from 'axios';

export interface LoginCardProps {
  callback: string;
}

export function LoginCard(props: LoginCardProps) {
  const [hideErrorMessage, setHideErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const { data, error } = await HibiscusSupabaseClient.signInWithPassword(
        email,
        password
      );

      if (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
          const message = error.message;
          setErrorMessage(message);
          setHideErrorMessage(true);
        }
      }

      if (data.user) {
        const token = data.session.access_token;
        const res = await axios.get(props.callback, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setCookie(process.env.NEXT_PUBLIC_HIBISCUS_COOKIE_NAME, token, {
          path: '/',
          maxAge: 86400,
          secure: process.env.NODE_ENV === 'production',
        });
        window.location.replace(res.data?.redirect ?? '/');
      }
    } catch (e) {
      // console.log(e);
    }
  }

  return (
    <StyledLoginCard>
      <Image
        src="/images/Logo.svg"
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
          style={{ display: hideErrorMessage ? 'block' : 'none' }}
        >
          {errorMessage}
        </StyledErrorText>
        <GradientButton type="submit">SIGN IN</GradientButton>
      </StyledForm>
      <GrayLink href="/reset-email">Forgot Password?</GrayLink>
      <GrayLink href="/signup">Create a HackSC account</GrayLink>
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

const StyledForm = styled.form`
  width: 140%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const StyledText = styled(Text)`
  font-size: 24px;
  padding-top: 1rem;
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
