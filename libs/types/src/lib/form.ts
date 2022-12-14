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
}

export enum FormQuestionType {
  ShortText = 'short-text',
  LongText = 'long-text',
  Email = 'email',
  Number = 'number',
  Date = 'date',
  SingleOptionDropdown = 'single-option-dropdown',
}

export interface HackformResponse {
  responses: {
    question: FormQuestion;
    textInput?: string; // for text-based questions
    numberInput?: number; // for number-based questions e.g age
    multipleChoicesInput?: number[]; // indexes of the choices; if it's a single choice, size=1
    booleanInput?: boolean;
  }[];
}
