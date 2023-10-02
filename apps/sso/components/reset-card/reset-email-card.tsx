/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { useState } from 'react';
import { H3, Text } from '@hibiscus/ui';
import { Colors2023 } from '@hibiscus/styles';
import GrayLink from '../gray-link/gray-link';
import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';
import { Button, ColorSpanBold } from '@hibiscus/ui-kit-2023';

/* eslint-disable-next-line */
export interface ResetCardProps {}

export function ResetEmailCard(props: ResetCardProps) {
  const [hideSuccessMessage, setHideSuccessMessage] = useState(false);
  const { supabase } = useHibiscusSupabase();

  async function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const callbackUrl = `${window.location.protocol}//${window.location.host}/reset`;

    const { error } = await supabase.resetPasswordViaEmail(email, callbackUrl);

    if (error) {
      alert(error);
    } else {
      setHideSuccessMessage(true);
    }
  }

  return (
    <StyledResetCard>
      <img src="/static/images/logo-2023.svg" alt="HackSC Logo" width="100px" />
      <StyledText>
        <H3>
          Reset your{' '}
          <ColorSpanBold color={Colors2023.BLUE.STANDARD}>
            HackSC password
          </ColorSpanBold>
        </H3>
      </StyledText>
      <StyledForm onSubmit={handleSubmit}>
        <Input placeholder="Email" type="email" name="email" required />
        <StyledSuccessText
          style={{ display: hideSuccessMessage ? 'block' : 'none' }}
        >
          Successfully sent reset password email!
        </StyledSuccessText>
        <Button type="submit" color="blue">
          Sign In
        </Button>
        <GrayLink href="/login">Login with your email</GrayLink>
      </StyledForm>
    </StyledResetCard>
  );
}

export default ResetEmailCard;

const StyledResetCard = styled.div`
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

const StyledSuccessText = styled(Text)`
  display: none;
  font-size: 20px;
  padding-top: 1rem;
  color: green;
`;

const StyledText = styled(Text)`
  font-size: 24px;
  padding-top: 1rem;
  @media (max-width: 400px) {
    font-size: 20px;
  }
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
