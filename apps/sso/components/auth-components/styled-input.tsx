import styled from 'styled-components';

export const Input = styled.input`
  font-family: 'IBM Plex Sans', sans-serif;
  border-bottom: 0.95px solid #7e7e7e;
  height: 5vh;
  width: 50%;
  margin-bottom: 5px;
  font-size: 13px;
  ::placeholder {
    color: #bcbcbc;
  }
  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #bcbcbc;
  }

  :focus {
    outline: none;
  }
`;
