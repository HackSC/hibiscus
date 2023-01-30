/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Text } from '@hibiscus/ui';
import { Colors2023 } from '@hibiscus/styles';
import { HibiscusUser } from '@hibiscus/types';
import Image from 'next/image';
import { Attendee } from '../../common/mock-sponsor';
import ShortTextInput from '../hackerform/short-text-question/short-text-question';

interface Props {
  user: Attendee;
  showYear?: boolean;
  showMajor?: boolean;
  showSchool?: boolean;
  showNoteButton?: boolean;
  showSaveButton?: boolean;
  onClick;
}

export function HackerTab({
  user,
  showYear,
  showMajor,
  showSchool,
  showNoteButton,
  showSaveButton,
  onClick,
}: Props) {
  return (
    <Container>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'flex-start',
        }}
      >
        <Circle />
        <Text style={{ paddingLeft: '20px', fontSize: '20px' }}>
          {user.first_name} {user.last_name}
        </Text>
      </div>
      {showYear && (
        <Text style={{ fontSize: '20px', flex: 1, textAlign: 'left' }}>
          {user.graduation_year}
        </Text>
      )}
      {showMajor && (
        <Text
          style={{
            fontSize: '20px',
            flex: 1,
            textAlign: 'left',
          }}
        >
          {user.major}
        </Text>
      )}
      {showSchool && (
        <Text style={{ fontSize: '20px', flex: 1, textAlign: 'right' }}>
          {user.school}
        </Text>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        {showNoteButton && (
          <StyledButton style={{ marginRight: '1rem' }} onClick={onClick}>
            <Image
              width="35"
              height="35"
              src={'/note.svg'}
              alt="Illustration"
            />
          </StyledButton>
        )}
        {showSaveButton && (
          <StyledButton>
            <Image
              width="35"
              height="35"
              src={'/save.svg'}
              alt="Illustration"
            />
          </StyledButton>
        )}
      </div>
    </Container>
  );
}

export default HackerTab;

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50px;
  background-color: ${Colors2023.GREEN.LIGHT};
  box-shadow: 0px 0px 10px rgba(118, 211, 239, 0.5);
`;

const StyledButton = styled.button`
  display: flex;
  cursor: pointer;
  background-color: ${Colors2023.GRAY.STANDARD};
  z-index: 10;

  :hover {
    opacity: 0.5;
  }

  :active {
    opacity: 0.8;
  }
`;
