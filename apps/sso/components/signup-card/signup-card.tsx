/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { useState } from 'react';
import { H3, Text } from '@hibiscus/ui';
import { Colors2023 } from '@hibiscus/styles';
import { useRouter } from 'next/router';
import Image from 'next/image';
import GrayLink from '../gray-link/gray-link';
import { MutatingDots } from 'react-loader-spinner';
import {
  OneLineText,
  Button,
  ColorSpanBold,
  OneLinePassword,
} from '@hibiscus/ui-kit-2023';
import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';
import { Input } from '../auth-components/styled-input';
import { StyledAuthCard } from '../auth-components/styled-card';

/* eslint-disable-next-line */
export interface SignUpProps {}

export function SignUpCard(props: SignUpProps) {
  const router = useRouter();
  const { supabase } = useHibiscusSupabase();
  const [hideErrorMessage, setHideErrorMessage] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [signUpState, setSignUpState] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const firstname = event.target.firstname.value;
    const lastname = event.target.lastname.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (firstname == null || firstname === '') {
      setErrorMessage('First name cannot be empty');
      setHideErrorMessage(false);
      return;
    }

    if (lastname == null || lastname === '') {
      setErrorMessage('Last name cannot be empty');
      setHideErrorMessage(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Confirm password doesn't match");
      setHideErrorMessage(false);
      return;
    }

    const { data, error } = await supabase.signUp(email, password);

    if (error) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        const message = error.message;
        setErrorMessage(message);
        setHideErrorMessage(false);
        return;
      }
    }

    if (data.user) {
      setSignUpState('signing up');
      router.push({
        pathname: '/verify',
        query: { email, firstname, lastname },
      });
    }
  };

  return (
    <StyledAuthCard>
      <Image
        src="/static/images/logo-2023.svg"
        alt="HackSC Logo"
        width={100}
        height={100}
      />
      <H3>
        Create a{' '}
        <ColorSpanBold color={Colors2023.BLUE.STANDARD}>
          HackSC Account
        </ColorSpanBold>
      </H3>
      <StyledForm onSubmit={handleSubmit}>
        <Input placeholder="first name" type="text" name="firstname" required />
        <Input placeholder="last name" type="text" name="lastname" required />
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
        <Input
          placeholder="re-enter password"
          type="password"
          name="confirmPassword"
          required
        />
        <StyledErrorText
          style={{ display: !hideErrorMessage ? 'block' : 'none' }}
        >
          {errorMessage}
        </StyledErrorText>
        <Button color="blue">SIGN UP</Button>
      </StyledForm>
      <GrayLink href="/login">Have an account? Login</GrayLink>

      {signUpState === 'signing up' ? (
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

export default SignUpCard;

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
