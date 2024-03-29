import { OneLineText, Radio } from '@hibiscus/ui-kit-2023';
import { useHackform } from '../../hooks/use-hackform/use-hackform';
import { ChangeEventHandler, FormEventHandler } from 'react';
import styled from 'styled-components';
import { DEFAULT_OTHERS_FIELD_LABEL } from '../../common/constants';

export interface OtherFieldProps {
  handleChangeValue: ChangeEventHandler<HTMLInputElement>;
  handleInputOther: FormEventHandler<HTMLInputElement>;
  checked: boolean;
  disabledTextInput: boolean;
  valueTextInput: string;
}

export const OtherField = ({
  handleChangeValue,
  handleInputOther,
  checked,
  disabledTextInput,
  valueTextInput,
}: OtherFieldProps) => {
  const hackformUtils = useHackform();
  const question = hackformUtils.getCurrentQuestion();

  return (
    <OtherWrapper>
      <Radio
        value={''} // special for other field
        label={question.otherFieldLabel ?? DEFAULT_OTHERS_FIELD_LABEL}
        onChange={handleChangeValue}
        checked={checked}
      />
      <StyledOneLineText
        onInput={handleInputOther}
        disabled={disabledTextInput}
        value={valueTextInput}
        placeholder={hackformUtils.getCurrentQuestion().placeholder}
      />
    </OtherWrapper>
  );
};

const OtherWrapper = styled.div`
  display: flex;
  @media (max-width: 430px) {
    flex-direction: column;
    padding-bottom: 2rem;
  }
  gap: 10px;
`;

const StyledOneLineText = styled(OneLineText)`
  margin-top: -1rem;
`;
