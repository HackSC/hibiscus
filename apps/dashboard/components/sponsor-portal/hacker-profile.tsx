import styled from 'styled-components';
import { BoldText, Link, Text } from '@hibiscus/ui';
import { Colors2023 } from '@hibiscus/styles';
import { H1 } from '@hibiscus/ui';
import Image from 'next/image';
import { Attendee } from '../../common/mock-sponsor';

interface Props {
  hacker: Attendee;
  note?: string;
  noteOnClick;
}

export function HackerProfile({ hacker, note, noteOnClick }: Props) {
  return (
    <Container>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <BoldText style={{ fontSize: '30px' }}>{hacker.full_name}</BoldText>
      </div>
      <Text style={{ fontSize: '15px' }}>School: {hacker.school}</Text>
      <Text style={{ fontSize: '15px' }}>Major: {hacker.major}</Text>
      <Text style={{ fontSize: '15px' }}>
        Grad Year: {hacker.graduation_year}
      </Text>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TitleText style={{ marginTop: '1rem' }}>QUICK NOTES</TitleText>
        <StyledButton style={{ marginTop: '0.5rem' }} onClick={noteOnClick}>
          <Image width="30" height="30" src={'/note.svg'} alt="note-button" />
        </StyledButton>
      </div>
      <NoteContainer>
        <Text>{note !== '' ? note : 'No note found'}</Text>
      </NoteContainer>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '2rem',
        }}
      >
        <TitleText>RESUME</TitleText>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
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
      <NoteContainer>
        {hacker.resume ? (
          <Link href={hacker.portfolio_link}>
            <BoldText style={{ textDecoration: 'underline' }}>
              {hacker.portfolio_link}
            </BoldText>
          </Link>
        ) : (
          <Text>No resume found</Text>
        )}
      </NoteContainer>

      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '2rem',
        }}
      >
        <TitleText>PORTFOLIO</TitleText>
        <NoteContainer>
          {hacker.portfolio_link ? (
            <Link href={hacker.portfolio_link}>
              <BoldText style={{ textDecoration: 'underline' }}>
                {hacker.portfolio_link}
              </BoldText>
            </Link>
          ) : (
            <Text>No portfolio found</Text>
          )}
        </NoteContainer>
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
