import styled from 'styled-components';
import { useState } from 'react';
import { H3, Text } from '@hibiscus/ui';
import { Colors2023 } from '@hibiscus/styles';
import Image from 'next/image';
import * as SSOClient from '@hibiscus/sso-client';
import GrayLink from '../gray-link/gray-link';
import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';
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
    <StyledLoginCard>
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
          placeholder="sample@email.edu"
          type="email"
          name="email"
          required
        />
        <Input
          placeholder="password"
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
  width: 35vw;
  height: 73vh;
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
const Input = styled.input`
  border: solid 0.1rem #bcbcbc;
  background-color: #f8f8f8;
  border-radius: 0.3rem;
  padding: 10px;
  padding-left: 15px;
  font-family: InterVariable, sans-serif;
  font-size: 1.1rem;
  color: #676767;
  width: 75%;
  margin-top: 0.1rem;
  ::placeholder {
    color: #bcbcbc;
  }
  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #bcbcbc;
  }
`;
