import React, { useContext } from 'react';
import styled from 'styled-components';
import HackformIntroduction from '../hackform-introduction/hackform-introduction';
import HackformQuestionComponent from '../hackform-question/hackform-question';
import { HackformMetadata } from '@hibiscus/types';
import HackformEnding from '../hackform-end/hackform-end';
import { useHackform } from '../../../hooks/use-hackform/use-hackform';
import { container } from 'tsyringe';
import { getCookie } from 'cookies-next';
import { getEnv } from '@hibiscus/env';
import { SupabaseContext } from '@hibiscus/hibiscus-supabase-client';

/* eslint-disable-next-line */
export interface HackerformProps {
  formMetadata: HackformMetadata;
}

export function Hackerform({ formMetadata }: HackerformProps) {
  const { currentQuestionIndex: cqi, ...hackformUtils } = useHackform();
  const { supabase } = useContext(SupabaseContext);

  const handleClick = async () => {
    hackformUtils.goNextQuestion();

    const client = supabase.getClient();
    const accessToken = getCookie(
      getEnv().Hibiscus.Cookies.accessTokenName
    ).toString();
    const refreshToken = getCookie(
      getEnv().Hibiscus.Cookies.refreshTokenName
    ).toString();
    const user = await supabase.getUserProfile(accessToken, refreshToken);
    await client
      .from('user_profiles')
      .update({ application_status: 2 })
      .eq('user_id', user.user_id);
  };

  // get page to show based on question index etc...
  const getHackformPage = () => {
    if (cqi === -1) {
      return (
        <HackformIntroduction
          formMetadata={formMetadata}
          onClick={handleClick}
        />
      );
    } else if (cqi === formMetadata.questions.length) {
      // get the first one with an error and go back to it
      const entry = hackformUtils.getFirstError();
      if (entry !== null) {
        const [firstErrorQI] = entry;
        hackformUtils.jumpQuestion(firstErrorQI);
        return <HackformQuestionComponent />;
      }
      return <HackformEnding formMetadata={formMetadata} />;
    }
    return <HackformQuestionComponent />;
  };

  return <HackformWrapper>{getHackformPage()}</HackformWrapper>;
}

export default Hackerform;

const HackformWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
