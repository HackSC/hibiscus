import { Colors2023 } from '@hibiscus/styles';
import { ApplicationStatus, HackformMetadata } from '@hibiscus/types';
import { H1, H3 } from '@hibiscus/ui';
import { Button, GlowSpan } from '@hibiscus/ui-kit-2023';
import { useHackform } from '../../../hooks/use-hackform/use-hackform';
import Image from 'next/image';
import styled from 'styled-components';
import APIService from '../../../common/api';
import useHibiscusUser from '../../../hooks/use-hibiscus-user/use-hibiscus-user';
import { useContext } from 'react';
import { SupabaseContext } from '@hibiscus/hibiscus-supabase-client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Sentry from '@sentry/browser';
import { toast } from 'react-hot-toast';
import { MutatingDots } from 'react-loader-spinner';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HackformEndingProps {
  formMetadata: HackformMetadata;
}

export const HackformEnding = ({ formMetadata }: HackformEndingProps) => {
  const hackformUtils = useHackform();
  const { user, updateUser } = useHibiscusUser();
  const { supabase } = useContext(SupabaseContext);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true); // can't clickjack
    const submission = hackformUtils.getSubmission();

    try {
      const { formId } = await APIService.submitHackform(
        user.id,
        submission,
        supabase
      );

      const client = supabase.getClient();
      const { error } = await client
        .from('user_profiles')
        .update({ application_status: 3 })
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }
      // update user status
      updateUser({
        applicationStatus: ApplicationStatus.IN_REVIEW,
        applicationId: formId,
      });
      // return user
      toast.success(
        'Application submitted successfully! We will let you know as soon as possible about your status. Keep an eye out for your email inbox!',
        { duration: 5000 }
      );
      router.replace('/');
      hackformUtils.reset();
    } catch (e) {
      toast.error(
        'Oops! Something went wrong with submitting your application; please try again'
      );
      Sentry.captureException(e);
    } finally {
      setSubmitting(false);
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
      <Button color="blue" onClick={handleSubmit} disabled={submitting}>
        {submitting ? 'SUBMITTING...' : 'SUBMIT YOUR APPLICATION'}
      </Button>
      {submitting && (
        <MutatingDots
          height="100"
          width="100"
          color={Colors2023.BLUE.LIGHT}
          secondaryColor={Colors2023.BLUE.LIGHT}
          radius="12.5"
          ariaLabel="mutating-dots-loading"
        />
      )}
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
