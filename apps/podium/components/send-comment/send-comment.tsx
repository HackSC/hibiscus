import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FiSend } from 'react-icons/fi'; // Import the send icon
import { useHibiscusUser } from '@hibiscus/hibiscus-user-context';

const InputWrapper = styled.div`
  position: relative;
  max-width: 350px;
  height: 93px;
`;

const StyledInput = styled.textarea`
  border-radius: 15px;
  border: 1px solid #757575;
  width: 100%;
  height: 100%;
  padding: 10px 40px 10px 10px; // Make space for the button
  box-sizing: border-box;
  color: #757575;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.4px;
  vertical-align: top; // Makes the text start at the top
  position: relative;
`;

const StyledButton = styled.button`
  position: absolute;
  background-color: #002990;
  border: none;
  cursor: pointer;
  border-radius: 50%; // Makes the button circular
  width: 30px; // Set the width and height to make it a perfect circle
  height: 30px;
  bottom: 10px;
  right: 10px;
  padding: 5px 0px 0px 0px;
`;

const HIBISCUS_PODIUM_API_URL = process.env.NEXT_PUBLIC_HIBISCUS_PODIUM_API_URL;

const SendComment = ({
  buttonText,
  onButtonClick,
  fetchData,
  projectId, // check if null!
  ...inputProps
}) => {
  const { user } = useHibiscusUser();

  const [commentText, setCommentText] = useState('');
  const handleSubmit = async () => {
    console.log(commentText);
    const endpoint = `${HIBISCUS_PODIUM_API_URL}/comments/${projectId}/user/${user.id}`;
    try {
      const response = await axios.post(endpoint, { comment: commentText });
      console.log(response.data);
      //refresh page
      fetchData(projectId);
      setCommentText('');
      onButtonClick();
    } catch (error) {
      console.error('There was an error submitting the comment:', error);
    }
  };
  return (
    <InputWrapper {...inputProps}>
      <StyledInput
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      {projectId && user && (
        <StyledButton onClick={handleSubmit}>
          <FiSend color='#FFFFFF' />
        </StyledButton>
      )}
    </InputWrapper>
  );
};

export default SendComment;