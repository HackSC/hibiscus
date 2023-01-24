import * as React from 'react';

// a generic option interface for multiple/single choice questions
export interface Option {
  value?: string;
  displayName: string;
}

export interface HackformMetadata {
  entry: {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    estTimeInMinutes?: number;
  };
  questions: HackformQuestion[];
  end: {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
  };
}

export interface HackformQuestion {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  type: HackformQuestionType;
  placeholder?: string;
  required?: boolean;
  hasOtherField?: boolean;
  otherFieldLabel?: string;
  validatorMetadata?: {
    [HackformQuestionType.LongText]?: {
      maxWordCount?: number;
      minWordCount?: number;
    };
  };
  validationFunction?: (input: HackformQuestionResponse['input']) => {
    valid: boolean;
    errorDescription?: HackformError;
  };
  options?: Option[] | (() => Promise<Option[]>);
  limitOptions?: number;
}

export enum HackformQuestionType {
  ShortText = 'short-text',
  LongText = 'long-text',
  Email = 'email',
  Number = 'number',
  Date = 'date',
  SingleOptionDropdown = 'single-option-dropdown',
  Boolean = 'boolean',
  SingleChoice = 'single-choice',
  File = 'file',
  MultipleSelect = 'multi-select',
}

export interface HackformSubmission {
  responses: Record<number, HackformQuestionResponse>; // question id -> response
}

export interface HackformQuestionResponse {
  input?: {
    text?: string; // for text-based questions + date
    number?: number; // for number-based questions e.g age
    choices?: string[]; // indexes of the choices; if it's a single choice, size=1
    boolean?: boolean;
    singleChoiceValue?: string; // value associated with the choice
    file?: {
      displayName: string; // display name to the user
      fileKey: string; // actual filename in file storage
    };
  };
}

export type HackformError = string | string[];
