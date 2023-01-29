import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import Image from 'next/image';
import { Colors2023 } from '@hibiscus/styles';
import { H1 } from '@hibiscus/ui';
import Clock from 'react-live-clock';
import { Text } from '@hibiscus/ui';
import { HackerTab } from '../../components/sponsor-portal/hacker-tab';
import HackerProfile from '../../components/sponsor-portal/hacker-profile';
import { useRouter } from 'next/router';
import { SponsorAPI, Attendee } from '../../common/mock-sponsor';
import { container } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { HibiscusRole } from '@hibiscus/types';
import { Button, ParagraphText } from '@hibiscus/ui-kit-2023';
import { getWordCount } from '../../common/utils';

const Index = () => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [currentAttendee, setCurrentAttendee] = useState<Attendee>(null);
  const [modalActive, setModalActive] = useState(false);
  const [attendeeName, setAttendeeName] = useState('');
  const [textInput, setInput] = useState('');

  const router = useRouter();
  const supabase = container.resolve(HibiscusSupabaseClient).getClient();

  useEffect(() => {
    async function fetchData() {
      const mockAPI = new SponsorAPI(true);
      const response = (await mockAPI.getAttendees()).data;
      setAttendees(response);
    }
    fetchData();

    const COMPANY_ID = 'a8e21c21-948c-4a04-b231-015434aacc0b'; // Will change later
    const events = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'event_log',
          // filter: `company_id=eq.${COMPANY_ID}`,
        },
        (payload) => {
          console.log('Change received!', payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(events);
    };
  }, []);

  const { user } = useHibiscusUser();
  if (user == null) {
    return <>Loading</>;
  }
  // Limit access to only sponsor role
  if (user?.role !== HibiscusRole.SPONSOR) {
    router.push('/');
    return <></>;
  }

  const openQuickNote = (attendee: Attendee) => {
    setModalActive(true);
    setAttendeeName(`${attendee.first_name} ${attendee.last_name}`);
  };

  const getAttendees = () => {
    return attendees.map((attendee, index) => (
      <HackerTabContainer
        key={index}
        onClick={() => {
          setCurrentAttendee(attendee);
        }}
      >
        <HackerTab user={attendee} onClick={() => openQuickNote(attendee)} />
      </HackerTabContainer>
    ));
  };

  return (
    <Wrapper style={{ position: 'relative' }}>
      <StyledButton
        onClick={() => {
          router.replace('/');
        }}
      >
        <Image width="30" height="30" src={'/arrow.svg'} alt="Illustration" />
      </StyledButton>
      <MainContainer>
        <LeftContainer>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <CompanySection>
              <H1
                style={{
                  color: Colors2023.GRAY.LIGHT,
                  fontSize: '35px',
                  textShadow: `0px 0px 10px ${Colors2023.GREEN.DARK}`,
                }}
              >
                {user.firstName} {user.lastName}
              </H1>
              <ClockContainer>
                <H1
                  style={{
                    color: Colors2023.GRAY.LIGHT,
                    fontSize: '25px',
                    textShadow: `0px 0px 10px ${Colors2023.GRAY.SHLIGHT}`,
                  }}
                >
                  <Clock
                    format={'HH:mma'}
                    ticking={true}
                    timezone={'US/Pacific'}
                    style={{
                      letterSpacing: '0.5rem',
                      textTransform: 'uppercase',
                    }}
                  />
                </H1>
              </ClockContainer>
            </CompanySection>
            <Image
              width="90"
              height="180"
              src={'/hackform-illustrations/stacking-puzzle.svg'}
              alt="Illustration"
            />
          </div>
          <SupportSection>
            <H1
              style={{
                color: Colors2023.GRAY.LIGHT,
                fontSize: '25px',
                textAlign: 'left',
                letterSpacing: '0.3rem',
              }}
            >
              HACKSC SUPPORT
            </H1>
            <Text
              style={{
                color: Colors2023.GRAY.LIGHT,
                fontSize: '20px',
                textAlign: 'left',
              }}
            >
              (213) 513 HACK
            </Text>
            <Text
              style={{
                color: Colors2023.GRAY.LIGHT,
                fontSize: '20px',
                textAlign: 'left',
              }}
            >
              dayof@hacksc.com
            </Text>
            <Text
              style={{
                color: Colors2023.GRAY.LIGHT,
                fontSize: '20px',
                textAlign: 'left',
              }}
            >
              Discord: #sponsors-support
            </Text>
          </SupportSection>
          <SavedSection>
            <H1
              style={{
                color: Colors2023.GRAY.LIGHT,
                fontSize: '25px',
                textAlign: 'left',
                letterSpacing: '0.3rem',
              }}
            >
              RECENTLY SAVED
            </H1>
            <SavedAttendeeContainer></SavedAttendeeContainer>
          </SavedSection>
          <ViewAllButton
            style={
              currentAttendee !== null ? { width: '100%' } : { width: '70%' }
            }
          >
            <H1
              style={{
                color: Colors2023.GREEN.STANDARD,
                fontSize: '25px',
                letterSpacing: '0.4rem',
              }}
            >
              VIEW ALL SAVED
            </H1>
          </ViewAllButton>
        </LeftContainer>

        <MiddleContainer>
          <Text
            style={{
              color: Colors2023.GRAY.LIGHT,
              fontSize: '30px',
            }}
          >
            All Check-Ins
          </Text>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '560px',
              overflow: 'auto',
            }}
          >
            {getAttendees()}
          </div>
          <ViewAllButton
            style={
              currentAttendee !== null ? { width: '100%' } : { width: '70%' }
            }
            onClick={() => router.push('participant-database')}
          >
            <H1
              style={{
                color: Colors2023.GREEN.STANDARD,
                fontSize: '25px',
                letterSpacing: '0.4rem',
              }}
            >
              VIEW ALL ATTENDEES
            </H1>
          </ViewAllButton>
          {modalActive && (
            <ModalContainer>
              <QuickNoteContainer>
                <CloseButton
                  style={{ justifyContent: 'flex-end' }}
                  onClick={() => {
                    setModalActive(false);
                  }}
                >
                  <Image
                    width="20"
                    height="20"
                    src={'/x-button.svg'}
                    alt="x-button"
                  />
                </CloseButton>
                <H1 style={{ fontSize: '30px', letterSpacing: '0.2rem' }}>
                  QUICK NOTES
                </H1>
                <Text style={{ fontSize: '25px', marginTop: '1rem' }}>
                  {attendeeName}
                </Text>
                <TextWrapper>
                  <StyledParagraphText
                    value={textInput}
                    placeholder={'Add quick note . . . '}
                    onChange={(e) => {
                      setInput(e.target.value);
                    }}
                  />
                  <WordCountText>
                    Word count: {getWordCount(textInput)}
                  </WordCountText>
                </TextWrapper>
                <div style={{ marginTop: '1rem', display: 'flex' }}>
                  <Button
                    color={'red'}
                    onClick={() => {
                      setModalActive(false);
                      setInput('');
                    }}
                  >
                    CANCEL
                  </Button>
                  <div style={{ marginLeft: '0.5rem' }}>
                    <Button color={'black'}>SAVE</Button>
                  </div>
                </div>
              </QuickNoteContainer>
            </ModalContainer>
          )}
        </MiddleContainer>

        <RightContainer
          style={
            currentAttendee !== null ? { display: 'flex' } : { display: 'none' }
          }
        >
          <CloseButton
            onClick={() => {
              setCurrentAttendee(null);
            }}
          >
            <Text
              style={{
                fontSize: '20px',
                color: Colors2023.GREEN.STANDARD,
                letterSpacing: '0.2rem',
              }}
            >
              HACKER
            </Text>
            <Image
              width="20"
              height="20"
              src={'/x-button.svg'}
              alt="x-button"
            />
          </CloseButton>
          {currentAttendee !== null ? (
            <div style={{ marginTop: '1.5rem' }}>
              <HackerProfile
                hacker={currentAttendee}
                onClick={() => openQuickNote(currentAttendee)}
              />
            </div>
          ) : (
            <></>
          )}
        </RightContainer>
      </MainContainer>
    </Wrapper>
  );
};

export default Index;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 6rem;
`;

const StyledButton = styled.button`
  width: 60px;
  height: 60px;
  padding-top: 12px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${Colors2023.GRAY.STANDARD};
  border-radius: 15px;
  border: 4px solid ${Colors2023.GRAY.MEDIUM};
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 1px 2px 15px ${Colors2023.GRAY.MEDIUM};

  &:hover {
    background-color: ${Colors2023.GRAY.SHLIGHT};
    transition: all 0.3s;
  }
`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 30px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-grow: 2;
  width: 24%;
  flex-direction: column;
  justify-content: flex-start;
  padding: 30px;
  margin-left: -3.5rem;
  margin-top: -2.5rem;
`;

const CompanySection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ClockContainer = styled.div`
  display: 'flex';
  padding: 15px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${Colors2023.GRAY.STANDARD};
  border-radius: 10px;
  border: 4px solid ${Colors2023.GRAY.MEDIUM};
`;

const SupportSection = styled.div`
  display: 'flex';
  margin-top: 1.5rem;
  padding: 15px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${Colors2023.GRAY.STANDARD};
  border-radius: 10px;
  border: 4px solid ${Colors2023.GRAY.MEDIUM};
`;

const SavedSection = styled.div`
  display: 'flex';
  height: 190px;
  margin-top: 1.5rem;
  padding: 30px 15px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${Colors2023.GRAY.STANDARD};
  border-radius: 10px;
  border: 4px solid ${Colors2023.GRAY.MEDIUM};
`;

const SavedAttendeeContainer = styled.div`
  width: 100%;
  display: flex;
  border-bottom: solid 2px ${Colors2023.GRAY.SHLIGHT};
`;

const MiddleContainer = styled.div`
  display: flex;
  width: 20%;
  flex-grow: 5;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  margin-top: -4rem;
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  border: 4px solid ${Colors2023.GRAY.MEDIUM};
`;

const QuickNoteContainer = styled.div`
  margin: auto;
  margin-top: 10rem;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: ${Colors2023.GRAY.STANDARD};
  border-radius: 10px;
  border: 4px solid ${Colors2023.GRAY.MEDIUM};
  box-shadow: 1px 2px 15px ${Colors2023.GRAY.MEDIUM};
`;

const TextWrapper = styled.div`
  margin-top: 0.5rem;
`;

const WordCountText = styled(Text)`
  color: ${Colors2023.GRAY.SHLIGHT};
  font-size: small;
`;

const StyledParagraphText = styled(ParagraphText)`
  width: 80%;
`;

const RightContainer = styled.div`
  display: flex;
  width: 30%;
  padding: 30px;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${Colors2023.GRAY.STANDARD};
  border-radius: 10px;
  border: 4px solid ${Colors2023.GRAY.MEDIUM};
  box-shadow: 1px 2px 15px ${Colors2023.GRAY.MEDIUM};
  margin-top: -3rem;
`;

const CloseButton = styled.button`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: ${Colors2023.GRAY.STANDARD};
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
  :active {
    opacity: 0.8;
  }
`;

const ViewAllButton = styled.button`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  padding: 10px 0px;
  background-color: ${Colors2023.GRAY.DARK};
  border-radius: 15px;
  border: 3px solid ${Colors2023.GREEN.STANDARD};
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${Colors2023.GREEN.DARK};
    transition: all 0.3s;
  }
`;

const HackerTabContainer = styled.button`
  display: flex;
  margin-top: 10px;
  padding: 5px 15px;
  background-color: ${Colors2023.GRAY.STANDARD};
  border-radius: 10px;
  border: 4px solid ${Colors2023.GRAY.MEDIUM};
  color: ${Colors2023.GRAY.LIGHT};
  cursor: pointer;

  :active {
    opacity: 0.5;
  }
`;
