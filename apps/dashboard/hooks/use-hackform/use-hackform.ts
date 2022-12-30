import {
  FormQuestion,
  HackformError,
  HackformQuestionResponse,
} from '@hibiscus/types';
import { GetInputResponseCb } from '../../common/types';
import { formMetadata2023HackerApps } from '../../common/hackform.metadata';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  getCurrentError,
  getCurrentQuestion,
  getCurrentResponse,
  goNextQuestion,
  goPreviousQuestion,
  jumpQuestion,
  putErrorForQuestion,
  putResponse,
  reset,
  resolveError,
} from '../../store/hackform-slice';

export function useHackform(formMetadata = formMetadata2023HackerApps) {
  const dispatch = useAppDispatch();
  const { cqi, errors, submission } = useAppSelector(
    ({ hackform: { cqi, errors, submission } }) => ({ cqi, errors, submission })
  );
  const currentResponse: HackformQuestionResponse | null =
    useAppSelector(getCurrentResponse);
  const currentQuestion: FormQuestion | null =
    useAppSelector(getCurrentQuestion);
  const currentError: HackformError | null = useAppSelector(getCurrentError);

  const getFirstError = (): [number, string] => {
    const entries = Object.entries(errors);
    if (entries.length === 0) return null;
    const qi = entries[0][0];
    return [Number.parseInt(qi), entries[0][1]];
  };

  // reducers
  const createCbSubmitValidate =
    (getInputResponse: GetInputResponseCb) => () => {
      const input = getInputResponse();
      const question = formMetadata.questions[cqi];
      const { valid, errorDescription } = question.validationFunction(input);
      dispatch(putResponse({ input }));
      if (valid) {
        dispatch(resolveError(cqi));
        dispatch(goNextQuestion());
      } else {
        dispatch(putErrorForQuestion({ qi: cqi, error: errorDescription }));
      }
    };

  const createCbGoNextQuestionValidateSilently =
    (getInputResponse: GetInputResponseCb) => () => {
      const input = getInputResponse();
      const question = formMetadata.questions[cqi];
      const { valid, errorDescription } = question.validationFunction(input);
      if (!valid)
        dispatch(putErrorForQuestion({ qi: cqi, error: errorDescription }));
      else dispatch(resolveError(cqi));
      // go next regardless
      dispatch(putResponse({ input }));
      dispatch(goNextQuestion());
    };

  const createCbGoPrevQuestionValidateSilently =
    (getInputResponse: GetInputResponseCb) => () => {
      const input = getInputResponse();
      const question = formMetadata.questions[cqi];
      const { valid, errorDescription } = question.validationFunction(input);
      if (!valid)
        dispatch(putErrorForQuestion({ qi: cqi, error: errorDescription }));
      else dispatch(resolveError(cqi));
      // go previous regardless
      dispatch(putResponse({ input }));
      dispatch(goPreviousQuestion());
    };

  return {
    currentQuestionIndex: cqi,
    responses: submission.responses,
    errors,
    getCurrentResponse: () => currentResponse,
    getCurrentError: () => currentError,
    getCurrentQuestion: () => currentQuestion,
    getFirstError,
    goNextQuestion: () => dispatch(goNextQuestion()),
    goPreviousQuestion: () => dispatch(goPreviousQuestion()),
    resolveError: (qi: number) => dispatch(resolveError(qi)),
    addErrorForQuestion: (qi: number, error: HackformError) =>
      dispatch(putErrorForQuestion({ qi, error })),
    jumpQuestion: (qi: number) => dispatch(jumpQuestion(qi)),
    saveResponse: (response: HackformQuestionResponse) =>
      dispatch(putResponse(response)),
    reset: () => dispatch(reset()),
    createCbSubmitValidate,
    createCbGoNextQuestionValidateSilently,
    createCbGoPrevQuestionValidateSilently,
  };
}
