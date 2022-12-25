/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import styled from 'styled-components';
import { GradientSpan, Text } from '@hacksc-platforms/ui';
import { TrademarkColors } from '@hacksc-platforms/styles';
import { useRouter } from 'next/router';
import { container } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hacksc-platforms/hibiscus-supabase-client';

/* eslint-disable-next-line */
export interface ResetCardProps {}

export function ResetCard(props: ResetCardProps) {
  const router = useRouter();
  const [hideErrorMessage, setHideErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const supabase = container.resolve(HibiscusSupabaseClient).getClient();

  async function handleSubmit(event) {
    event.preventDefault();

    const newPassword = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (!(newPassword === confirmPassword)) {
      setHideErrorMessage(true);
      setErrorMessage('Confirm password does not match!');
      return;
    }

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        const message = error.message;
        setErrorMessage(message);
        setHideErrorMessage(true);
      }
    }

    if (data.user) {
      console.log(data.user);
      router.push('/login');
    }
  }

  return (
    <StyledResetCard>
      <img src="/static/images/Logo.svg" alt="HackSC Logo" width="100px" />
      <StyledText>
        Reset your <GradientSpan>HackSC Account</GradientSpan>
      </StyledText>
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
          required
        />
        <StyledErrorText
          style={{ display: hideErrorMessage ? 'block' : 'none' }}
        >
          {errorMessage}
        </StyledErrorText>
        <GradientButton type="submit">SUBMIT</GradientButton>
      </StyledForm>
    </StyledResetCard>
  );
}

export default ResetCard;

const StyledResetCard = styled.div`
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
  width: 120%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
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
