import { useState } from 'react';
import styled from 'styled-components';
import { H3, Text } from '@hibiscus/ui';
import { useRouter } from 'next/router';
import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';
import { Colors2023 } from '@hibiscus/styles';
import { Button, ColorSpanBold } from '@hibiscus/ui-kit-2023';
import { StyledAuthCard } from '../auth-components/styled-card';
import { Input } from '../auth-components/styled-input';
import { BackgroundShapes } from '../colored-shapes/background-shapes';
import Link from 'next/link';
// import { Input } from '../auth-components/styled-input';

/* eslint-disable-next-line */
export interface ResetCardProps {}

export function ResetCard(props: ResetCardProps) {
  const router = useRouter();
  const [hideErrorMessage, setHideErrorMessage] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { supabase } = useHibiscusSupabase();

  async function handleSubmit(event) {
    event.preventDefault();

    const newPassword = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (!(newPassword === confirmPassword)) {
      setErrorMessage('Confirm password does not match!');
      setHideErrorMessage(false);
      return;
    }

    const { data, error } = await supabase.updatePassword(newPassword);

    if (error) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        const message = error.message;
        setErrorMessage(message);
        setHideErrorMessage(false);
      }
    }

    if (data.user) {
      console.log(data.user);
      router.push('/login');
    }
  }

  return (
    <>
      <BackgroundShapes />
      <StyledAuthCard>
        <HeadingContainer>
          <h2 className="m-0 mb-[10px] text-4xl">Reset Password</h2>
        </HeadingContainer>
        <StyledForm onSubmit={handleSubmit}>
          <Input
            placeholder="new password"
            type="password"
            name="password"
            required
          />
          <Input
            placeholder="re-enter password"
            type="password"
            name="confirmPassword"
            style={{ marginBottom: '10px' }}
            required
          />
          <StyledErrorText
            style={{ display: !hideErrorMessage ? 'block' : 'none' }}
          >
            {errorMessage}
          </StyledErrorText>
          <button
            type="submit"
            className="py-[8px] w-[278px] rounded-[8px] border-[1px] bg-red-300 hover:bg-theme-redward"
          >
            Reset Password
          </button>
        </StyledForm>
        <Link href="/login" className="text-sm underline font-light">
          Back to Sign In
        </Link>
      </StyledAuthCard>
    </>
  );
}

export default ResetCard;

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
  display: flex;
  justify-content: center;
  align-items: flex-end;
  > h1 {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 48px;
    font-weight: 500;
    line-height: 62.54px;
    text-align: left;
  }
`;

const HackSCTag = styled.div`
  min-width: 7%;
  min-height: 7%;
  background: #429fee;
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
