import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import Image from 'next/image';
import { Colors2023 } from '@hibiscus/styles';
import { BoldText, H1 } from '@hibiscus/ui';
import { Text } from '@hibiscus/ui';
import { HackerTab } from '../../components/sponsor-portal/hacker-tab';
import HackerProfile from '../../components/sponsor-portal/hacker-profile';
import { useRouter } from 'next/router';
import { Attendee } from '../../common/mock-sponsor';
import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';
import { HibiscusRole } from '@hibiscus/types';
import { ParagraphText } from '@hibiscus/ui-kit-2023';
import { getWordCount } from '../../common/utils';
import { SponsorServiceAPI } from '../../common/api';
import { MutatingDots } from 'react-loader-spinner';
import {
  Button,
  BodyText,
  BodyTextLarge,
  Colors as SctwColors,
  GlobalStyle,
  Heading,
} from '@hacksc/sctw-ui-kit';

const Index = () => {
  const { user } = useHibiscusUser();
  const [COMPANY_ID, setCompanyId] = useState('');
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
        setCompanyId(data.data.company_id);
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
          color={SctwColors.Red.Rash}
          secondaryColor={SctwColors.Red.Rash}
          radius="12.5"
          ariaLabel="mutating-dots-loading"
        />
      </div>
    ) : (
      <SavedAttendeeContainer>
        <BodyText style={{ color: 'black' }}>No check-ins yet!</BodyText>
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
          color={SctwColors.Red.Rash}
          secondaryColor={SctwColors.Red.Rash}
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
      <GlobalStyle />
      <LeftContainer>
        <LeftWrapper>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <CompanySection>
              <SctwTitle style={{ color: SctwColors.Blue.DarkBloo }}>
                Welcome {user.firstName} {user.lastName}
              </SctwTitle>
              <SctwTextBlack>
                This is your booth! Search through your booth attendees and
                review their qualifications!
              </SctwTextBlack>
            </CompanySection>
          </div>
          <SupportSection>
            <SctwHeading>HACKSC SUPPORT</SctwHeading>
            <SctwUnderlinedText>(213) - 513 - HACK</SctwUnderlinedText>
            <SctwText>dayof@hacksc.com</SctwText>
          </SupportSection>
          <SavedSection>
            <>
              <SctwHeading>RECENTLY SAVED</SctwHeading>
              {showSavedAttendees()}
            </>
          </SavedSection>
        </LeftWrapper>
        <SctwViewAllButton
          fitWidth
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
          VIEW ALL SAVED
        </SctwViewAllButton>
      </LeftContainer>

      <MiddleContainer>
        <SctwHeading
          style={{ fontSize: '30px', color: SctwColors.Blue.DarkBloo }}
        >
          All Check-Ins
        </SctwHeading>
        <StyledScrollBar>{getAttendees()}</StyledScrollBar>
        <SctwViewAllButton
          fitWidth
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
          VIEW ALL ATTENDEES
        </SctwViewAllButton>
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
              <SctwHeading>QUICK NOTES</SctwHeading>
              <BodyText style={{ fontSize: '25px', marginTop: '1rem' }}>
                {attendeeName}
              </BodyText>
              <TextWrapper>
                <StyledInput
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
                  color={'yellow'}
                  onClick={() => {
                    setModalActive(false);
                    setInput('');
                  }}
                >
                  CANCEL
                </Button>
                <div style={{ marginLeft: '0.5rem' }}>
                  <Button
                    color={'yellow'}
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
          currentAttendee !== null
            ? { maxWidth: '33%' }
            : { display: 'none', maxWidth: '0%', padding: 0 }
        }
      >
        <CloseButton
          onClick={() => {
            setCurrentAttendee(null);
          }}
        >
          <SctwHeading style={{ color: SctwColors.Yellow.BabyFood }}>
            HACKER
          </SctwHeading>
          <Image width="20" height="20" src={'/x-button.svg'} alt="x-button" />
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
    </Wrapper>
  );
};

export default Index;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  /* padding-left: 6rem; */
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

const LeftContainer = styled.div`
  display: flex;
  /* flex-grow: 1; */
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  padding: 30px;
  /* margin-left: -3.5rem;
  margin-top: -2.5rem; */
`;

const LeftWrapper = styled.div`
  flex-grow: 1;
`;

const MiddleContainer = styled.div`
  /* flex-grow: 1; */
  flex: 1;
  padding: 30px;
  /* margin-top: -4rem; */
  height: 100%;
`;

const RightContainer = styled.div`
  display: flex;
  /* flex-grow: 1; */
  flex: 1;
  padding: 30px;
  flex-direction: column;
  justify-content: flex-start;
  color: white;
  background-color: ${SctwColors.Blue.BlueIvy};
  border-radius: 10px;
  /* margin-top: -3rem; */
  transition: max-width 0.5s;
`;

const CompanySection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const SupportSection = styled.div`
  display: flex;
  flex-direction: column;

  gap: 15px;
  padding: 20px;
  margin-top: 1.5rem;

  color: white;
  background-color: ${SctwColors.Red.Rash};
  border-radius: 10px;
  border: 4px solid ${SctwColors.Red.Redward};
`;

const SavedSection = styled.div`
  display: flex;
  flex-direction: column;

  gap: 15px;
  padding: 20px;
  margin-top: 1.5rem;

  color: white;
  background-color: ${SctwColors.Red.Redward};
  border-radius: 10px;
  border: 4px solid ${SctwColors.Red.Rash};
`;

const SavedAttendeeContainer = styled.div`
  width: 100%;
  display: flex;
  border-bottom: solid 1px ${SctwColors.Red.Rash};
  cursor: pointer;
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
  color: white;
  margin: auto;
  margin-top: 10rem;
  padding: 20px 20px 40px 40px;
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: ${SctwColors.Blue.BlueIvy};
  border-radius: 10px;
`;

const TextWrapper = styled.div`
  margin-top: 0.5rem;
`;

const WordCountText = styled(Text)`
  color: ${Colors2023.GRAY.SHLIGHT};
  font-size: small;
`;

const StyledInput = styled.textarea`
  background-color: ${SctwColors.Yellow.BabyFood};
  padding: 20px 60px 60px 20px;

  border-radius: 10px;
  width: 80%;

  :focus {
    outline: none;
  }
`;

const SctwTitle = styled(Heading)`
  font-size: 45px;
  letter-spacing: 0.05rem;
`;

const SctwHeading = styled(Heading)`
  font-size: 25px;
  letter-spacing: 0.05rem;
`;

const SctwText = styled(BodyText)`
  font-size: 20px;
  text-align: left;
`;

const SctwTextBlack = styled(BodyText)`
  font-size: 20px;
  text-align: left;
  color: black;
`;

const SctwUnderlinedText = styled(BodyText)`
  font-size: 20px;
  text-align: left;
  text-decoration-line: underline;
  width: fit-content;
`;

const CloseButton = styled.button`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0); // Transpanrent Background
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
  :active {
    opacity: 0.8;
  }
`;

// TODO: Temp Delete When Done;
const ViewAllButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  padding: 10px 0px;
  border-radius: 50px;
  gap: 10px;
`;

const SctwViewAllButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  padding: 3px 20px;
  border-radius: 20px;
  gap: 10px;
`;

const HackerTabContainer = styled.button`
  display: flex;
  margin-top: 10px;
  margin-right: 10px;
  padding: 5px 15px;
  background-color: ${SctwColors.Blue.BlueIvy};
  border-radius: 10px;
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
  height: 600px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
    background-color: ${SctwColors.Red.DonatedBlood};
    border-radius: 50px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${SctwColors.Red.Redward};
    border-radius: 50px;
  }
`;
