import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FiSend } from 'react-icons/fi'; // Import the send icon

const InputWrapper = styled.div`
  position: relative;
  width: 350px;
  height: 93px;
  background: white;
`;

const StyledInput = styled.textarea`
  background: white;
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

const SendComment = ({
  buttonText,
  onButtonClick,
  fetchData,
  ...inputProps
}) => {
  const userId = '566a7ced-02c7-4715-8342-bafd4af289b7';
  const projectId = '1f6e3db9-1976-4f33-bf04-7df9d1e03a71';
  const [commentText, setCommentText] = useState('');
  const handleSubmit = async () => {
    console.log(commentText);
    const endpoint = `https://iegz97vdvi.execute-api.us-west-1.amazonaws.com/api/comments/${projectId}/user/${userId}`;
    try {
      const response = await axios.post(endpoint, { comment: commentText });
      console.log(response.data);
      //refresh page
      fetchData();
      setCommentText('');
    } catch (error) {
      console.error('There was an error submitting the comment:', error);
    }
  };
  return (
    <InputWrapper>
      <StyledInput
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <StyledButton onClick={handleSubmit}>
        <FiSend />
      </StyledButton>
    </InputWrapper>
  );
};

export default SendComment;
