import React from 'react';

export interface FormMetadata {
  entry: {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    estTimeInMinutes?: number;
  };
  questions: FormQuestion[];
  end: {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
  };
}

export interface FormQuestion {
  title: string;
  type: FormQuestionType;
  placeholder?: string;
  required?: boolean;
  validationFunction?: (input: HackformQuestionResponse['input']) => boolean;
  options?: string[];
}

export enum FormQuestionType {
  ShortText = 'short-text',
  LongText = 'long-text',
  Email = 'email',
  Number = 'number',
  Date = 'date',
  SingleOptionDropdown = 'single-option-dropdown',
}

export interface HackformSubmission {
  responses: HackformQuestionResponse[];
}

export interface HackformQuestionResponse {
  question: FormQuestion;
  input?: {
    text?: string; // for text-based questions
    number?: number; // for number-based questions e.g age
    choices?: number[]; // indexes of the choices; if it's a single choice, size=1
    boolean?: boolean;
  };
}
