import { HackformResumeUploadClient } from '@hibiscus/hackform-client';
import { HackformQuestionResponse } from '@hibiscus/types';

export type GetInputResponseCb = () => HackformQuestionResponse['input'];

export type LocalAPIResponses = {
  '/resume': {
    key: string;
    filepath: string;
    meta: Awaited<ReturnType<HackformResumeUploadClient['uploadResume']>>;
  };
};
