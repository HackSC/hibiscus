import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, OneLineText } from '@hacksc-platforms/ui-kit-2023';
import { QuestionFormProps } from './question';

const ShortTextInput = ({
  onClickSubmit,
  placeholder,
}: QuestionFormProps & { placeholder: string }) => {
  const [input, setInput] = useState('');
  return (
    <Wrapper>
      <OneLineText
        onInput={(text) => {
          setInput(text);
        }}
        placeholder={placeholder}
      />
      <Button color="blue" onClick={onClickSubmit}>
        OK
      </Button>
    </Wrapper>
  );
};

export default ShortTextInput;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
