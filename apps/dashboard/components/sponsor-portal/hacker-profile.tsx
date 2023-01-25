/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import { Link, Text } from '@hibiscus/ui';
import { Colors2023 } from '@hibiscus/styles';
import { HibiscusUser } from '@hibiscus/types';
import { H1, H2, H3 } from '@hibiscus/ui';
import Image from 'next/image';
import { Attendee } from '../../common/mock-sponsor';

interface Props {
  hacker: Attendee;
}

export function HackerProfile({ hacker }: Props) {
  return (
    <Container>
      <Text style={{ fontSize: '30px' }}>
        {hacker.first_name} {hacker.last_name}
      </Text>
      <Text style={{ fontSize: '18px' }}>School: {hacker.major}</Text>
      <Text style={{ fontSize: '18px' }}>Major: {hacker.major}</Text>
      <Text style={{ fontSize: '18px' }}>
        Grad Year: {hacker.graduation_year}
      </Text>
      <TitleText style={{ marginTop: '1rem' }}>QUICK NOTES</TitleText>
      <NoteContainer>
        <Text>No note added</Text>
      </NoteContainer>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '1rem',
        }}
      >
        <TitleText>RESUME</TitleText>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <StyledButton style={{ marginRight: '0.5rem' }}>
            <Image width="30" height="30" src={'/save.svg'} alt="save-button" />
          </StyledButton>
          <StyledButton>
            <Image
              width="30"
              height="30"
              src={'/download-button.svg'}
              alt="download-button"
            />
          </StyledButton>
        </div>
      </div>
    </Container>
  );
}

export default HackerProfile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px 30px;
`;

const TitleText = styled(H1)`
  font-size: 25px;
  letter-spacing: 0.2rem;
`;

const NoteContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 10px;
  margin-top: 0.5rem;
  background-color: ${Colors2023.GRAY.MEDIUM};
  border-radius: 10px;
  border: 3px solid ${Colors2023.GRAY.SHLIGHT};
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
