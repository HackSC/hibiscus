/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { Link, Text } from '@hacksc-platforms/ui';
import { TrademarkColors } from '@hacksc-platforms/styles';
import OTPInput from '../otp-input/otp-input';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import supabase from 'apps/supabase/specs/supabase';
import { setCookie } from 'cookies-next';

export function VerifyCard() {
  const router = useRouter();
  const [hideErrorMessage, setHideErrorMessage] = useState(false);
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);
  const MAX_CODE_LENGTH = 6;

  async function handleOTP() {
    const email = String(router.query.email);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: String(code),
        type: 'signup',
      });
      if (error) {
        console.log(error);
        setHideErrorMessage(true);
      }
      if (data.user) {
        router.push('/');
        setCookie('user', email);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <StyledVerifyCard>
      <img src="/images/Logo.svg" alt="HackSC Logo" width="100px" />
      <StyledText>
        We’ve sent you an email containing a unique 6-digit PIN code.
      </StyledText>
      <StyledSmallText>
        This email may take up to 2 minutes to arrive. Do not share this code
        with anyone else.
      </StyledSmallText>
      <OTPInput
        setPinReady={setPinReady}
        code={code}
        setCode={setCode}
        maxLength={MAX_CODE_LENGTH}
      />
      <StyledErrorText style={{ display: hideErrorMessage ? 'block' : 'none' }}>
        Token is expired or incorrect.
      </StyledErrorText>
      <GradientButton
        onClick={handleOTP}
        disabled={!pinReady}
        style={{ opacity: !pinReady ? 0.5 : 1 }}
      >
        SUBMIT
      </GradientButton>
      <Link href="/verify">
        <StyledLinkText>Resend confirmation email</StyledLinkText>
      </Link>
    </StyledVerifyCard>
  );
}

export default VerifyCard;

const StyledVerifyCard = styled.div`
  color: #2b2b2b;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 5rem;
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10%;
  margin-right: 10%;
  align-items: center;
  border-radius: 20px;
  border: 5px rgba(255, 255, 255, 0.3) solid;

  @media (max-width: 400px) {
    padding: 2rem;
  }
`;

const StyledText = styled(Text)`
  font-size: 24px;
  padding-top: 3rem;
  color: #2b2b2b;
`;

const StyledErrorText = styled(Text)`
  font-size: 20px;
  padding-top: 1rem;
  color: red;
`;

const StyledSmallText = styled(Text)`
  font-size: 16px;
  padding-top: 1rem;
  color: #939393;
`;

const StyledLinkText = styled(Text)`
  font-size: 16px;
  padding-top: 1rem;
  line-height: 19.36px;
  color: #939393;
  text-decoration: underline;
`;
const GradientButton = styled.button`
  background: linear-gradient(
    90deg,
    ${TrademarkColors.LIGHT_BLUE} 0%,
    ${TrademarkColors.LIGHT_PURPLE} 100%
  );
  color: white;
  font-family: Intervariable, sans-serif;
  font-weight: 700;
  font-size: 22px;
  padding: 15px 70px;
  margin-top: 2rem;
  border-radius: 10px;
  filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.2));
`;
