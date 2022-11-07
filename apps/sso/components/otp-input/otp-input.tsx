/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';

export function OTPInput({ setPinReady, code, setCode, maxLength }) {
  const codeDigitsArray = new Array(maxLength).fill(0);

  // ref for text input
  const textInputRef = useRef(null);

  const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);

  const handleOnPress = () => {
    setInputContainerIsFocused(true);
    textInputRef?.current?.focus();
  };

  const handleOnBlur = () => {
    setInputContainerIsFocused(false);
  };

  const inputHandler = (event) => {
    const enteredCode = event.target.value.slice(0, maxLength);
    setCode(enteredCode);
  };

  const toCodeDigitInput = (_value, index) => {
    const emptyInputChar = ' ';
    const digit = code[index] || emptyInputChar;

    // Showing focused input field
    const isCurrentDigit = index === code.length;
    const isLastDigit = index === maxLength - 1;
    const isCodeFull = code.length === maxLength;

    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const StyledOTPInput =
      inputContainerIsFocused && isDigitFocused
        ? OTPInputFocused
        : OTPInputField;

    return (
      <StyledOTPInput key={index}>
        <OTPInputText>{digit}</OTPInputText>
      </StyledOTPInput>
    );
  };

  useEffect(() => {
    setPinReady(code.length === maxLength);
    return () => setPinReady(false);
  }, [code, maxLength, setPinReady]);

  return (
    <OTPInputSection>
      <OTPInputContainer onClick={handleOnPress}>
        {codeDigitsArray.map(toCodeDigitInput)}
      </OTPInputContainer>
      <HiddenTextInput
        type="number"
        maxLength={maxLength}
        value={code}
        onChange={inputHandler}
        onBlur={handleOnBlur}
        ref={textInputRef}
      />
    </OTPInputSection>
  );
}

export default OTPInput;

export const OTPInputSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`;

export const HiddenTextInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
`;

export const OTPInputContainer = styled.button`
  display: flex;
  justify-content: space-around;
  background-color: transparent;
`;

export const OTPInputField = styled.div`
  width: 60px;
  height: 60px;
  border-color: #bcbcbc;
  border-width: 15%;
  border-width: 2px;
  border-radius: 10px;
  padding-top: 15px;
  margin-right: 10px;
  background-color: #f8f8f8;

  @media (max-width: 400px) {
    width: 40px;
    height: 40px;
    padding-top: 5px;
    margin-right: 5px;
  }
`;

export const OTPInputText = styled.text`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: #2b2b2b;
`;

export const OTPInputFocused = styled(OTPInputField)`
  border-color: #d770c7;
`;
