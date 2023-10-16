import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import Image from 'next/image';
import { Colors2023 } from '@hibiscus/styles';
import { BoldText, H1 } from '@hibiscus/ui';
import Clock from 'react-live-clock';
import { Text } from '@hibiscus/ui';
import { HackerTab } from '../../components/sponsor-portal/hacker-tab';
import HackerProfile from '../../components/sponsor-portal/hacker-profile';
import { useRouter } from 'next/router';
import { Attendee } from '../../common/mock-sponsor';
import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';
import { HibiscusRole } from '@hibiscus/types';
import { Button, ParagraphText } from '@hibiscus/ui-kit-2023';
import { getWordCount } from '../../common/utils';
import { SponsorServiceAPI } from '../../common/api';
import { MutatingDots } from 'react-loader-spinner';

// add button


const Index = () => {
  const { user } = useHibiscusUser();
  const [COMPANY_ID, setCompnayId] = useState('');
  const [EVENT_ID, setEventId] = useState('');
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [savedAttendees, setSavedAttendees] = useState<Attendee[] | null>(null);
  const [currentAttendee, setCurrentAttendee] = useState<Attendee>(null);
  const [modalActive, setModalActive] = useState(false);
  const [attendeeName, setAttendeeName] = useState('');
  const [textInput, setInput] = useState('');
  const [savedSpinner, setSavedSpinner] = useState(false);
  const [checkInSpinner, setCheckInSpinner] = useState(false);

  const router = useRouter();
  const supabase = useHibiscusSupabase().supabase.getClient();

  useEffect(() => {
    SponsorServiceAPI.getCompanyIdAndEventId(user.id)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        }
        setCompnayId(data.data.company_id);
        setEventId(data.data.event_id);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchData();

    getSavedAttendees(COMPANY_ID, EVENT_ID);

    const events = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'event_log',
          filter: `event_id=eq.${EVENT_ID}`,
        },
        (payload) => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(events);
    };
  }, [COMPANY_ID, EVENT_ID]);

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
    setAttendeeName(`${attendee.full_name}`);
  };

  async function fetchData() {
    setCheckInSpinner(true);
    SponsorServiceAPI.getCheckInAttendee(COMPANY_ID, EVENT_ID)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        }
        setAttendees(data.data as Attendee[]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setCheckInSpinner(false));
  }

  const getAttendees = () => {
    if (attendees.length) {
      return attendees.map((attendee, index) => (
        <HackerTabContainer
          key={index}
          onClick={() => {
            setCurrentAttendee(attendee);
          }}
        >
          <HackerTab
            user={attendee}
            showNoteButton={true}
            showSaveButton={true}
            onNoteClick={() => openQuickNote(attendee)}
            onSaveClick={() => toggleSaveAttendee(COMPANY_ID, attendee)}
          />
        </HackerTabContainer>
      ));
    }
    return checkInSpinner ? (
      <div
        style={{
          marginTop: '2rem',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MutatingDots
          height="100"
          width="100"
          color={Colors2023.BLUE.LIGHT}
          secondaryColor={Colors2023.BLUE.LIGHT}
          radius="12.5"
          ariaLabel="mutating-dots-loading"
        />
      </div>
    ) : (
      <SavedAttendeeContainer>
        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            marginTop: '3rem',
            fontSize: '20px',
          }}
        >
          No recently saved
        </Text>
      </SavedAttendeeContainer>
    );
  };

  const showSavedAttendees = () => {
    if (savedAttendees) {
      if (savedAttendees.length)
        return savedAttendees.map((savedAttendee, index) => (
          <SavedAttendeeContainer
            key={index}
            onClick={() => {
              setCurrentAttendee(savedAttendee);
            }}
          >
            <HackerTab
              user={savedAttendee}
              showNoteButton={true}
              onNoteClick={() => openQuickNote(savedAttendee)}
            />
          </SavedAttendeeContainer>
        ));
    }
    return savedSpinner ? (
      <div
        style={{
          marginTop: '2rem',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MutatingDots
          height="100"
          width="100"
          color={Colors2023.BLUE.LIGHT}
          secondaryColor={Colors2023.BLUE.LIGHT}
          radius="12.5"
          ariaLabel="mutating-dots-loading"
        />
      </div>
    ) : (
      <SavedAttendeeContainer>
        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            marginTop: '3rem',
            fontSize: '20px',
          }}
        >
          No recently saved
        </Text>
      </SavedAttendeeContainer>
    );
  };

  async function getSavedAttendees(companyId: string, eventId: string) {
    setSavedSpinner(true);
    SponsorServiceAPI.getFilteredAttendee(
      companyId,
      eventId,
      null,
      null,
      null,
      true,
      2
    )
      .then(({ data, error }) => {
        if (error) {
          setSavedAttendees([]);
          console.log(error);
        }
        setSavedAttendees(data.data as Attendee[]);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setSavedSpinner(false));
  }

  async function setAttendeeNote(
    companyId: string,
    attendeeId: string,
    note: string
  ) {
    SponsorServiceAPI.setAttendeeNote(companyId, attendeeId, note)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        }
        console.log(`Updated note: ${data.data.note}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function toggleSaveAttendee(companyId: string, attendee: Attendee) {
    if (!attendee.saved) {
      SponsorServiceAPI.saveAttendee(companyId, attendee.id)
        .then(({ data, error }) => {
          if (error) {
            console.log(error);
          }
          getSavedAttendees(COMPANY_ID, EVENT_ID);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      SponsorServiceAPI.unsaveAttendee(companyId, attendee.id)
        .then(({ data, error }) => {
          if (error) {
            console.log(error);
          }
          getSavedAttendees(COMPANY_ID, EVENT_ID);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

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
            <>
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
              {showSavedAttendees()}
            </>
          </SavedSection>
          <ViewAllButton
            style={
              currentAttendee !== null ? { width: '100%' } : { width: '70%' }
            }
            onClick={() =>
              router.push({
                pathname: '/participant-database',
                query: {
                  viewSaved: true,
                  companyId: COMPANY_ID,
                  eventId: EVENT_ID,
                },
              })
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
          <StyledScrollBar>{getAttendees()}</StyledScrollBar>
          <ViewAllButton
            style={
              currentAttendee !== null ? { width: '100%' } : { width: '70%' }
            }
            onClick={() =>
              router.push({
                pathname: '/participant-database',
                query: {
                  companyId: COMPANY_ID,
                  eventId: EVENT_ID,
                },
              })
            }
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
                    setInput('');
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
                    <Button
                      color={'black'}
                      onClick={() => {
                        setAttendeeNote(
                          COMPANY_ID,
                          currentAttendee.id,
                          textInput
                        );
                        setModalActive(false);
                        setInput('');
                      }}
                    >
                      SAVE
                    </Button>
                  </div>
                </div>
              </QuickNoteContainer>
            </ModalContainer>
          )}
        </MiddleContainer>

        <RightContainer
          style={
            // currentAttendee !== null ? { display: 'flex' } : { display: 'none' }
            currentAttendee !== null
              ? { visibility: 'visible', maxWidth: '35%' }
              : { visibility: 'hidden', maxWidth: '0%' }
          }
        >
          <CloseButton
            onClick={() => {
              setCurrentAttendee(null);
            }}
          >
            <BoldText
              style={{
                fontSize: '20px',
                color: Colors2023.GREEN.STANDARD,
                letterSpacing: '0.2rem',
              }}
            >
              HACKER
            </BoldText>
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
                companyId={COMPANY_ID}
                noteOnClick={() => openQuickNote(currentAttendee)}
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
  /* width: 24%; */
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
  height: 230px;
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
  border-bottom: solid 1px ${Colors2023.GRAY.SHLIGHT};
  cursor: pointer;
`;

const MiddleContainer = styled.div`
  flex-grow: 2;
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
  width: 35%;
  padding: 30px;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${Colors2023.GRAY.STANDARD};
  border-radius: 10px;
  border: 4px solid ${Colors2023.GRAY.MEDIUM};
  box-shadow: 1px 2px 15px ${Colors2023.GRAY.MEDIUM};
  margin-top: -3rem;
  transition: max-width 0.5s;
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
  transition: all 0.5s;

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

const StyledScrollBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 602px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
    background-color: ${Colors2023.GRAY.MEDIUM};
    border-radius: 50px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${Colors2023.GREEN.DARK};
    border-radius: 50px;
  }
`;
