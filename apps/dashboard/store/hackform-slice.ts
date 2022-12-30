import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import {
  FormMetadata,
  FormQuestion,
  FormQuestionType,
  HackformError,
  HackformQuestionResponse,
  HackformSubmission,
} from '@hibiscus/types';
import { formMetadata2023HackerApps } from '../common/hackform.metadata';

export interface HackformState {
  formMetadata: FormMetadata;
  cqi: number;
  submission: HackformSubmission;
  errors: Record<number, HackformError>;
}

const initialState: HackformState = {
  formMetadata: {
    entry: formMetadata2023HackerApps.entry,
    end: formMetadata2023HackerApps.end,
    questions: formMetadata2023HackerApps.questions.map((q) => ({
      ...q,
      validationFunction: undefined,
    })),
  },
  cqi: -1,
  submission: { responses: {} },
  errors: {},
};

export const hackformSlice = createSlice({
  name: 'hackform',
  initialState,
  reducers: {
    jumpQuestion: (state, action: PayloadAction<number>) => {
      state.cqi = action.payload;
    },
    goNextQuestion: (state) => {
      state.cqi++;
    },
    goPreviousQuestion: (state) => {
      state.cqi--;
    },
    resolveError: (state, action: PayloadAction<number>) => {
      delete state.errors[action.payload];
    },
    putErrorForQuestion: (
      state,
      action: PayloadAction<{ qi: number; error: HackformError }>
    ) => {
      state.errors[action.payload.qi] = action.payload.error;
    },
    putResponse: (state, action: PayloadAction<HackformQuestionResponse>) => {
      const response = action.payload;
      const question = state.formMetadata.questions[state.cqi];
      let input: HackformQuestionResponse['input'] = {};
      switch (question.type) {
        case FormQuestionType.Email:
        case FormQuestionType.ShortText:
        case FormQuestionType.LongText: // they will all fill the text field in the input.
          input = { text: response.input.text };
          break;
        case FormQuestionType.SingleOptionDropdown:
          input = {
            text: response.input.text,
            singleChoiceValue: response.input.singleChoiceValue,
          };
          break;
        default:
          break;
      }
      state.submission.responses[state.cqi] = { input };
    },
    reset: (state) => {
      state.cqi = initialState.cqi;
      state.submission = initialState.submission;
      state.errors = initialState.errors;
    },
  },
});

export const {
  jumpQuestion,
  goNextQuestion,
  goPreviousQuestion,
  resolveError,
  putErrorForQuestion,
  putResponse,
  reset,
} = hackformSlice.actions;

const hackformReducer = hackformSlice.reducer;
export default hackformReducer;

// selectors
const isQuestion = (cqi: number, formMetadata: FormMetadata) =>
  cqi >= 0 && cqi < formMetadata.questions.length;

export const getCQI = ({ hackform }: RootState) => hackform.cqi;
export const getCurrentQuestion = ({
  hackform,
}: RootState): FormQuestion | null =>
  isQuestion(hackform.cqi, hackform.formMetadata)
    ? hackform.formMetadata.questions[hackform.cqi]
    : null;
export const getCurrentResponse = ({
  hackform,
}: RootState): HackformQuestionResponse | null =>
  hackform.submission.responses[hackform.cqi] ?? null;
export const getCurrentError = ({
  hackform,
}: RootState): HackformError | null => hackform.errors[hackform.cqi] ?? null;
