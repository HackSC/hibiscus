/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { useState } from 'react';
import { GradientSpan, Text } from '@hibiscus/ui';
import { TrademarkColors } from '@hibiscus/styles';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import GrayLink from '../gray-link/gray-link';
import { container } from 'tsyringe';

/* eslint-disable-next-line */
export interface ResetCardProps {}

export function ResetEmailCard(props: ResetCardProps) {
  const [hideSuccessMessage, setHideSuccessMessage] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const callbackUrl = `${window.location.protocol}//${window.location.host}/reset`;

    const supabase = container.resolve(HibiscusSupabaseClient);
    const { error } = await supabase.resetPasswordViaEmail(email, callbackUrl);

    if (error) {
      alert(error);
    } else {
      setHideSuccessMessage(true);
    }
  }

  return (
    <StyledResetCard>
      <img src="/static/images/Logo.svg" alt="HackSC Logo" width="100px" />
      <StyledText>
        Reset your <GradientSpan>HackSC Account</GradientSpan>
      </StyledText>
      <StyledForm onSubmit={handleSubmit}>
        <Input placeholder="Email" type="email" name="email" required />
        <StyledSuccessText
          style={{ display: hideSuccessMessage ? 'block' : 'none' }}
        >
          Successfully sent reset password email!
        </StyledSuccessText>
        <GradientButton type="submit">SUBMIT</GradientButton>
        <GrayLink href="/login">Login with your email</GrayLink>
      </StyledForm>
    </StyledResetCard>
  );
}

export default ResetEmailCard;

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

const StyledSuccessText = styled(Text)`
  display: none;
  font-size: 20px;
  padding-top: 1rem;
  color: green;
`;

const StyledText = styled(Text)`
  font-size: 24px;
  padding-top: 1rem;
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
