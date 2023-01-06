import { OneLineText, Radio } from '@hibiscus/ui-kit-2023';
import { useHackform } from '../../hooks/use-hackform/use-hackform';
import { ChangeEventHandler, FormEventHandler } from 'react';
import styled from 'styled-components';

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

  return (
    <OtherWrapper>
      <Radio
        value={''} // special for other field
        name="Others"
        label="Others"
        onChange={handleChangeValue}
        checked={checked}
      />
      <OneLineText
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
  gap: 10px;
`;
