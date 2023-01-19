/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { useState } from 'react';
import { GradientSpan, Text } from '@hibiscus/ui';
import { TrademarkColors, Colors2023 } from '@hibiscus/styles';
import { useRouter } from 'next/router';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import Image from 'next/image';
import GrayLink from '../gray-link/gray-link';
import { container } from 'tsyringe';
import { MutatingDots } from 'react-loader-spinner';

/* eslint-disable-next-line */
export interface SignUpProps {}

export function SignUpCard(props: SignUpProps) {
  const router = useRouter();
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

    const supabase = container.resolve(HibiscusSupabaseClient);
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
    <Wrapper>
      <Image
        src="/static/images/Logo.svg"
        alt="HackSC Logo"
        width={100}
        height={100}
      />
      <StyledText>
        Create a <GradientSpan>HackSC Account</GradientSpan>
      </StyledText>
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
        <GradientButton type="submit">SIGN UP</GradientButton>
      </StyledForm>
      <GrayLink href="/login">Have an account? Login</GrayLink>

      {signUpState === 'signing up' ? (
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
    </Wrapper>
  );
}

export default SignUpCard;

const Wrapper = styled.div`
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
  font-family: Intervariable, sans-serif;
  padding: 10px 15px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 50%;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
`;
