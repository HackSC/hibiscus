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
  onClick;
}

export function HackerTab({ user, onClick }: Props) {
  return (
    <Container>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Circle />
        <Text style={{ paddingLeft: '20px', fontSize: '23px' }}>
          {user.first_name} {user.last_name}
        </Text>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <StyledButton style={{ marginRight: '1rem' }} onClick={onClick}>
          <Image width="35" height="35" src={'/note.svg'} alt="Illustration" />
        </StyledButton>
        <StyledButton>
          <Image width="35" height="35" src={'/save.svg'} alt="Illustration" />
        </StyledButton>
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
  background-color: ${Colors2023.BLUE.LIGHT};
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
