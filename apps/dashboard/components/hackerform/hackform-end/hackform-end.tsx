import { Colors2023 } from '@hibiscus/styles';
import { HackformMetadata } from '@hibiscus/types';
import { H1, H3 } from '@hibiscus/ui';
import { Button, GlowSpan } from '@hibiscus/ui-kit-2023';
import { useHackform } from '../../../hooks/use-hackform/use-hackform';
import Image from 'next/image';
import styled from 'styled-components';
import APIService from '../../../common/api';
import useHibiscusUser from '../../../hooks/use-hibiscus-user/use-hibiscus-user';
import { container } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Sentry from '@sentry/browser';
import { toast } from 'react-hot-toast';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HackformEndingProps {
  formMetadata: HackformMetadata;
}

export const HackformEnding = ({ formMetadata }: HackformEndingProps) => {
  const [disabledButton, setDisabledButton] = useState(false);
  const hackformUtils = useHackform();
  const { user } = useHibiscusUser();
  const TIME_BEFORE_FORMSTATE_RESET = 2000; // wait this much ms before we do reset
  const router = useRouter();

  const handleSubmit = async () => {
    setDisabledButton(true); // can't clickjack
    const submission = hackformUtils.getSubmission();
    try {
      await APIService.submitHackform(user.id, submission);

      setTimeout(() => {
        hackformUtils.reset();
      }, TIME_BEFORE_FORMSTATE_RESET);

      const supabase = container.resolve(HibiscusSupabaseClient);
      const client = supabase.getClient();
      const { error } = await client
        .from('user_profiles')
        .update({ application_status: 3 })
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }
      router.replace('/');
    } catch (e) {
      toast.error(
        'Oops! Something went wrong with submitting your application; please try again'
      );
      Sentry.captureException(e);
    }
  };

  return (
    <Wrapper>
      <H1>
        <GlowSpan
          color={Colors2023.GRAY.LIGHT}
          shadowColor={Colors2023.BLUE.DARK}
        >
          {formMetadata.end.title}
        </GlowSpan>
      </H1>
      <H3>{formMetadata.end.subtitle}</H3>
      <Image
        src={'/assets/earth-suitcase-moon.svg'}
        width={200}
        height={200}
        alt="Earth-like character wearing shades pulling baggage and a moon"
      />
      <Button color="blue" onClick={handleSubmit} disabled={disabledButton}>
        SUBMIT YOUR APPLICATION
      </Button>
    </Wrapper>
  );
};

export default HackformEnding;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  gap: 20px;
  width: 80%;
`;
