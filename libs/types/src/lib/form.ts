import React from 'react';

// a generic option interface for multiple/single choice questions
export interface Option {
  value?: string;
  displayName: string;
}

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
  validationFunction?: (input: HackformQuestionResponse['input']) => {
    valid: boolean;
    errorDescription?: string;
  };
  options?: Option[];
}

export enum FormQuestionType {
  ShortText = 'short-text',
  LongText = 'long-text',
  Email = 'email',
  Number = 'number',
  Date = 'date',
  SingleOptionDropdown = 'single-option-dropdown',
  Boolean = 'boolean',
  SingleChoice = 'single-choice',
}

export interface HackformSubmission {
  responses: Record<number, HackformQuestionResponse>; // question id -> response
}

export interface HackformQuestionResponse {
  input?: {
    text?: string; // for text-based questions
    number?: number; // for number-based questions e.g age
    choices?: number[]; // indexes of the choices; if it's a single choice, size=1
    boolean?: boolean;
    singleChoiceValue?: string; // value associated with the choice
    date?: Date; // value for a date
  };
}

export type HackformError = string;
