import React from 'react';
import styled from 'styled-components';
import { FiSend } from 'react-icons/fi'; // Import the send icon

const InputWrapper = styled.div`
  position: relative;
  width: 350px;
  height: 93px;
  background: #161616;
`;

const StyledInput = styled.textarea`
  background: #161616;
  border-radius: 15px;
  border: 1px solid #757575;
  width: 100%;
  height: 100%;
  padding: 10px 40px 10px 10px; // Make space for the button
  box-sizing: border-box;

  color: #757575;
  font-family: 'SF Pro Text';
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.4px;
  vertical-align: top; // Makes the text start at the top
`;

const StyledButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 50%; // Makes the button circular
  width: 30px; // Set the width and height to make it a perfect circle
  height: 30px;
  display: flex; // Using flexbox to center the icon in the button
  align-items: center;
  justify-content: center;
`;

const SendComment = ({ buttonText, onButtonClick, ...inputProps }) => {
  return (
    <InputWrapper>
      <StyledInput {...inputProps} />
      <StyledButton onClick={onButtonClick}>
        <FiSend />
      </StyledButton>
    </InputWrapper>
  );
};

export default SendComment;
