import API from '../../../common/api';
import { useState } from 'react';
import { GetInputResponseCb } from '../../../common/types';
import QuestionCreator from '../question-creator/question-creator';
import { ALLOWED_RESUME_FORMATS } from '../../../common/constants';
import mime from 'mime-types';

export const FileQuestion = () => {
  const [uploaded, setUploaded] = useState<File | null>(null);
  const [key, setKey] = useState<string | null>(null);
  const [filepath, setFilepath] = useState<string | null>(null);

  const getInputResponse: GetInputResponseCb = () => ({
    file: { displayName: uploaded?.name, fileKey: key },
  });

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const file = e.target.files.item(0);
    setUploaded(file);
    // send into the store
    const { key, filepath } = await API.submitResume(file);
    setKey(key);
    setFilepath(filepath);
  };

  const InputComponent = (
    <input
      defaultValue={filepath}
      type="file"
      onChange={handleFileChange}
      accept={ALLOWED_RESUME_FORMATS.map((it) => mime.lookup(it)).join(',')}
    />
  );

  return (
    <QuestionCreator
      inputComponentChildren={InputComponent}
      getInputResponse={getInputResponse}
    />
  );
};

export default FileQuestion;
