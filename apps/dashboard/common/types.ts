import { PutItemCommandOutput } from '@aws-sdk/client-dynamodb';
import { HackformResumeUploadClient } from '@hibiscus/hackform-client';
import { HackformQuestionResponse } from '@hibiscus/types';

export type GetInputResponseCb = () => HackformQuestionResponse['input'];

export type LocalAPIResponses = {
  '/resume': {
    key: string;
    filepath: string;
    meta: Awaited<ReturnType<HackformResumeUploadClient['uploadResume']>>;
  };
  '/hackform': {
    formId: string;
    res: PutItemCommandOutput;
  };
};

export interface TeamMember {
  id: string;
  name: string;
}

export interface Invite {
  id: string;
  created_at: string;
  user_profiles: {
    email: string;
    first_name: string;
    last_name: string;
  };
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  members: TeamMember[];
  invites: Invite[];
}
