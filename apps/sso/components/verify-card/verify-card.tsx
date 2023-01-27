import styled from 'styled-components';
import { H3, ItalicText, Text } from '@hibiscus/ui';
import { Colors2023 } from '@hibiscus/styles';
import OTPInput from '../otp-input/otp-input';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { container } from 'tsyringe';
import Image from 'next/image';
import { MutatingDots } from 'react-loader-spinner';
import { Button } from '@hibiscus/ui-kit-2023';

export function VerifyCard() {
  const router = useRouter();
  const [verifyState, setVerifyState] = useState('');
  const [hideErrorMessage, setHideErrorMessage] = useState(false);
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);
  const MAX_CODE_LENGTH = 6;

  const handleOTP = async () => {
    const email = String(router.query.email);

    const supabase = container.resolve(HibiscusSupabaseClient);
    const { data, error } = await supabase.verifyOtp(email, code, 'signup');
    if (error) {
      console.log(error);
      setHideErrorMessage(true);
    }
    if (data.user) {
      setVerifyState('verifying');
      // Create user profile in database
      await supabase.createUserProfile(
        router.query.firstname.toString(),
        router.query.lastname.toString(),
        data.session.access_token,
        data.session.refresh_token
      );

      HibiscusSupabaseClient.setTokenCookieClientSide(
        data.session.access_token,
        data.session.refresh_token
      );

      router.push('/');
    }
  };

  const handleKeyDown = (e) => {
    //it triggers by pressing the enter key
    console.log(e.target.value);
    if (e.keyCode === 13) {
      handleOTP();
    }
  };

  return (
    <StyledVerifyCard>
      <Image
        src="/static/images/logo-2023.svg"
        alt="HackSC Logo"
        width={100}
        height={100}
      />
      <StyledText>
        We&apos;ve sent you an email containing a unique 6-digit PIN code.
      </StyledText>
      <ItalicText>
        This email may take up to 2 minutes to arrive. Do not share this code
        with anyone else.
      </ItalicText>
      <OTPInput
        setPinReady={setPinReady}
        code={code}
        setCode={setCode}
        maxLength={MAX_CODE_LENGTH}
        handleKeyDown={handleKeyDown}
      />
      <StyledErrorText style={{ display: hideErrorMessage ? 'block' : 'none' }}>
        Token is expired or incorrect.
      </StyledErrorText>
      <Button
        color="blue"
        onClick={handleOTP}
        disabled={!pinReady}
        style={{
          opacity: !pinReady ? 0.5 : 1,
          cursor: 'pointer',
          transitionDuration: '0.5s',
        }}
      >
        SUBMIT
      </Button>

      <Text>If you did not receive your email, please sign up again</Text>

      {verifyState === 'verifying' ? (
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
    </StyledVerifyCard>
  );
}

export default VerifyCard;

const StyledVerifyCard = styled.div`
  min-width: 55vw;
  max-width: 90vw;
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  border-radius: 20px;
  border: 5px solid ${Colors2023.BLUE.STANDARD};
  box-shadow: 0px 0px 10px ${Colors2023.BLUE.LIGHT};
  gap: 15px;
  > p {
    text-align: center;
  }
  @media (max-width: 400px) {
    padding: 2rem;
  }
`;

const StyledText = styled(H3)`
  text-align: center;
`;

const StyledErrorText = styled(Text)`
  font-size: 20px;
  padding-top: 1rem;
  color: red;
`;
