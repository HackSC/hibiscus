import API from '../../../common/api';
import { useMemo, useState } from 'react';
import { GetInputResponseCb } from '../../../common/types';
import QuestionCreator from '../question-creator/question-creator';
import { Dashboard } from '@uppy/react';
import Uppy from '@uppy/core';

export const FileQuestion = () => {
  const [uploaded, setUploaded] = useState<File | null>(null);
  const [key, setKey] = useState<string | null>(null);

  const getInputResponse: GetInputResponseCb = () => ({
    file: { displayName: uploaded?.name, fileKey: key },
  });

  const uppy = useMemo(() => {
    return new Uppy();
  }, []);

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const file = e.target.files.item(0);
    setUploaded(file);
    // send into the store
    const res = await API.submitResume(file);
    setKey(res.key);
  };

  const handleDeleteFile = async () => {
    // delete from the store
  };

  const InputComponent = <Dashboard uppy={uppy} />;

  return (
    <QuestionCreator
      inputComponentChildren={InputComponent}
      getInputResponse={getInputResponse}
    />
  );
};

export default FileQuestion;
