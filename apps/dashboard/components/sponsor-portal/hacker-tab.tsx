import styled from 'styled-components';
import { Text } from '@hibiscus/ui';
import { Colors2023 } from '@hibiscus/styles';
import Image from 'next/image';
import { Attendee } from '../../common/mock-sponsor';
import { useState } from 'react';

interface Props {
  user: Attendee;
  showYear?: boolean;
  showMajor?: boolean;
  showSchool?: boolean;
  showNoteButton?: boolean;
  showSaveButton?: boolean;
  onNoteClick;
  onSaveClick;
}

export function HackerTab({
  user,
  showYear,
  showMajor,
  showSchool,
  showNoteButton,
  showSaveButton,
  onNoteClick,
  onSaveClick,
}: Props) {
  const [isSaved, setSave] = useState(user.saved);

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
          {user.full_name}
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
          <StyledButton style={{ marginRight: '1rem' }} onClick={onNoteClick}>
            <Image width="35" height="35" src={'/note.svg'} alt="note.svg" />
          </StyledButton>
        )}
        {showSaveButton && (
          <StyledButton
            onClick={() => {
              isSaved ? setSave(false) : setSave(true);
              onSaveClick();
            }}
          >
            {isSaved ? (
              <Image
                width="35"
                height="35"
                src={'/save-green.svg'}
                alt="save.svg"
              />
            ) : (
              <Image width="35" height="35" src={'/save.svg'} alt="save.svg" />
            )}
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
