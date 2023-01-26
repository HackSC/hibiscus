import APIService from '../../../common/api';
import { useContext, useRef, useState } from 'react';
import { GetInputResponseCb } from '../../../common/types';
import QuestionCreator from '../question-creator/question-creator';
import { ALLOWED_RESUME_FORMATS } from '../../../common/constants';
import mime from 'mime-types';
import { useHackform } from '../../../hooks/use-hackform/use-hackform';
import useHibiscusUser from '../../../hooks/use-hibiscus-user/use-hibiscus-user';
import { Button } from '@hibiscus/ui-kit-2023';
import styled from 'styled-components';
import { Text } from '@hibiscus/ui';
import { Colors2023 } from '@hibiscus/styles';
import { ImCross } from 'react-icons/im';
import { SupabaseContext } from '@hibiscus/hibiscus-supabase-client';

export const FileQuestion = () => {
  const { user } = useHibiscusUser();
  const { currentQuestionIndex: cqi, ...hackformUtils } = useHackform();
  const { supabase } = useContext(SupabaseContext);
  const lastInput = hackformUtils.getCurrentResponse()?.input;
  const [uploaded, setUploaded] = useState<File | null>(null);
  const [response, setResponse] = useState<{
    fileKey: string;
    displayName: string;
  } | null>(lastInput?.file ?? null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const MAX_FILE_SIZE = 5120; // 5MB
  const MAX_FILE_SIZE_MB = 5120 / 1024; // 5MB

  const isFileInSize = (file: File) => {
    const fileSizeKB = file.size / 1024;
    return fileSizeKB <= MAX_FILE_SIZE;
  };

  const getInputResponse: GetInputResponseCb = () => ({
    file: response,
  });

  const handleFileChange = async () => {
    fileInputRef.current.click();
    const file = fileInputRef.current.files.item(0);
    setUploaded(file);
    if (!file) {
      setUploaded(null);
      return;
    }
    if (!isFileInSize(file)) {
      hackformUtils.addErrorForQuestion(
        cqi,
        `Please upload a file size below ${Math.trunc(MAX_FILE_SIZE_MB)} MB`
      );
      setUploaded(null);
      return;
    }
    hackformUtils.resolveError(cqi);
    const fk = APIService.createFileKey(file);
    setResponse({ displayName: file.name, fileKey: fk });
  };

  const handleSubmit = async () => {
    // send into the store
    if (user && uploaded !== null)
      APIService.submitResume(uploaded, response.fileKey, user.id, supabase);
    // call the function with those
    const cb = hackformUtils.createCbSubmitValidate(getInputResponse);
    cb();
  };

  const handleNext = async () => {
    // send into the store
    if (user && uploaded !== null)
      APIService.submitResume(uploaded, response.fileKey, user.id, supabase);
    const cb =
      hackformUtils.createCbGoNextQuestionValidateSilently(getInputResponse);
    cb();
  };

  const handleRemoveFile = () => {
    setUploaded(null);
    setResponse(null);
  };

  const InputComponent = (
    <Container>
      <FileQuestionContainer>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept={ALLOWED_RESUME_FORMATS.map((it) => mime.lookup(it)).join(',')}
          hidden
        />
        <Button color="blue" onClick={handleFileChange}>
          UPLOAD
        </Button>
        {response && (
          <>
            <Text>{response.displayName}</Text>{' '}
            <button
              style={{
                appearance: 'none',
                background: 'none',
                cursor: 'pointer',
              }}
              onClick={handleRemoveFile}
            >
              <ImCross color="red" />
            </button>
          </>
        )}
      </FileQuestionContainer>
      <SmallTextGray>Max size: {Math.trunc(MAX_FILE_SIZE_MB)} MB</SmallTextGray>
    </Container>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FileQuestionContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const SmallTextGray = styled(Text)`
  font-size: 12px;
  color: ${Colors2023.GRAY.SCHEMDIUM};
`;
