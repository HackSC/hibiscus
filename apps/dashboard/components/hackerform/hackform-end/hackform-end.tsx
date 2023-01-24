import { Colors2023 } from '@hibiscus/styles';
import { HackformMetadata } from '@hibiscus/types';
import { H1, H3, Link } from '@hibiscus/ui';
import { Button, GlowSpan } from '@hibiscus/ui-kit-2023';
import { useHackform } from '../../../hooks/use-hackform/use-hackform';
import Image from 'next/image';
import styled from 'styled-components';
import APIService from '../../../common/api';
import useHibiscusUser from '../../../hooks/use-hibiscus-user/use-hibiscus-user';
import { useContext } from 'react';
import { SupabaseContext } from '@hibiscus/hibiscus-supabase-client';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HackformEndingProps {
  formMetadata: HackformMetadata;
}

export const HackformEnding = ({ formMetadata }: HackformEndingProps) => {
  const hackformUtils = useHackform();
  const { user } = useHibiscusUser();
  const TIME_BEFORE_FORMSTATE_RESET = 2000; // wait this much ms before we do reset
  const { supabase } = useContext(SupabaseContext);

  const handleSubmit = async () => {
    const submission = hackformUtils.getSubmission();
    await APIService.submitHackform(user.id, submission);
    setTimeout(() => {
      hackformUtils.reset();
    }, TIME_BEFORE_FORMSTATE_RESET);

    const client = supabase.getClient();
    await client
      .from('user_profiles')
      .update({ application_status: 3 })
      .eq('user_id', user.id);
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
      <Link
        href="/"
        anchortagpropsoverride={{ target: '_self' }}
        onClick={handleSubmit}
      >
        <Button color="blue">SUBMIT YOUR APPLICATION</Button>
      </Link>
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
