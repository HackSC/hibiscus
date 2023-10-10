import { useState } from 'react';
import styled from 'styled-components';
import { H3, Text } from '@hibiscus/ui';
import { useRouter } from 'next/router';
import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';
import { Colors2023 } from '@hibiscus/styles';
import { Button, ColorSpanBold, OneLinePassword } from '@hibiscus/ui-kit-2023';
import { StyledAuthCard } from '../auth-components/styled-card';
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
    <StyledAuthCard>
      <img src="/static/images/logo-2023.svg" alt="HackSC Logo" width="100px" />
      <H3>
        Reset your{' '}
        <ColorSpanBold color={Colors2023.BLUE.STANDARD}>
          HackSC password
        </ColorSpanBold>
      </H3>
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
        <Button color="blue">SUBMIT</Button>
      </StyledForm>
    </StyledAuthCard>
  );
}

export default ResetCard;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
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

const StyledErrorText = styled(Text)`
  font-size: 20px;
  padding-top: 1rem;
  color: red;
`;
