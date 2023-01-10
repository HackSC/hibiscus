import APIService from '../../../common/api';
import { useState } from 'react';
import { GetInputResponseCb } from '../../../common/types';
import QuestionCreator from '../question-creator/question-creator';
import { ALLOWED_RESUME_FORMATS } from '../../../common/constants';
import mime from 'mime-types';
import { useHackform } from '../../../hooks/use-hackform/use-hackform';

export const FileQuestion = () => {
  const hackformUtils = useHackform();
  const [uploaded, setUploaded] = useState<File | null>(null);
  const [fileKey, setKey] = useState<string | null>(null);

  const getInputResponse: GetInputResponseCb = () => ({
    file: { displayName: uploaded?.name, fileKey },
  });

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const file = e.target.files.item(0);
    setUploaded(file);
    const fk = APIService.createFileKey(file);
    setKey(fk);
  };

  const handleSubmit = async () => {
    // send into the store
    if (uploaded !== null) APIService.submitResume(uploaded, fileKey);
    // call the function with those
    const cb = hackformUtils.createCbSubmitValidate(getInputResponse);
    cb();
  };

  const handleNext = async () => {
    // send into the store
    if (uploaded !== null) APIService.submitResume(uploaded, fileKey);
    const cb =
      hackformUtils.createCbGoNextQuestionValidateSilently(getInputResponse);
    cb();
  };

  const InputComponent = (
    <input
      type="file"
      onChange={handleFileChange}
      accept={ALLOWED_RESUME_FORMATS.map((it) => mime.lookup(it)).join(',')}
    />
  );

  return (
    <QuestionCreator
      inputComponentChildren={InputComponent}
      getInputResponse={getInputResponse}
      handleSubmitWithValidation={handleSubmit}
      goNextQuestion={handleNext}
      submitButtonUnder
    />
  );
};

export default FileQuestion;
