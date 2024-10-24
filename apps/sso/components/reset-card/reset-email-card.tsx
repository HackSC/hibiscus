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
import { StyledAuthCard } from '../auth-components/styled-card';
import { Input } from '../auth-components/styled-input';
import { useRouter } from 'next/router';
import { BackgroundShapes } from '../colored-shapes/background-shapes'

/* eslint-disable-next-line */
export interface ResetCardProps {}

export function ResetEmailCard(props: ResetCardProps) {
  const [hideSuccessMessage, setHideSuccessMessage] = useState(false);
  const { supabase } = useHibiscusSupabase();

  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const callbackUrl = `${window.location.protocol}//${window.location.host}/reset`;

    const { error } = await supabase.resetPasswordViaEmail(email, callbackUrl);

    if (error) {
      alert(error);
    } else {
      setHideSuccessMessage(true);
      router.push(`/reset-verify?email=${email}`);
    }
  }

  return (
    <>
    <BackgroundShapes />
    <HackSCTag>HackSC</HackSCTag>
    <StyledAuthCard>
      <HeadingContainer>
        <h1> Reset Email </h1>
      </HeadingContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Input placeholder="Email" type="email" name="email" required />
        <StyledSuccessText
          style={{ display: hideSuccessMessage ? 'block' : 'none' }}
        >
          Successfully sent reset password email!
        </StyledSuccessText>
        <Button type="submit" color="beige">
          SUBMIT
        </Button>
        <GrayLink href="/login">Login with your email</GrayLink>
      </StyledForm>
    </StyledAuthCard>
    </>
  );
}

export default ResetEmailCard;

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


const HeadingContainer = styled.div`
  display:flex; 
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
  background: #429FEE;
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

