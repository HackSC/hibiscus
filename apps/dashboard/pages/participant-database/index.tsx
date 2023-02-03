import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import { BoldText, Text, H1 } from '@hibiscus/ui';
import { Colors2023 } from '@hibiscus/styles';
import { Option } from '@hibiscus/types';
import Image from 'next/image';
import DropDown from '../../components/sponsor-portal/dropdown';
import APIService from '../../common/api';
import { HibiscusRole } from '@hibiscus/types';
import { useRouter } from 'next/router';
import { HackerTab } from '../../components/sponsor-portal/hacker-tab';
import { Attendee } from '../../common/mock-sponsor';
import { Button, ParagraphText } from '@hibiscus/ui-kit-2023';
import { getWordCount } from '../../common/utils';
import HackerProfile from '../../components/sponsor-portal/hacker-profile';
import { SponsorServiceAPI } from '../../common/api';

const Index = () => {
  const [textInput, setInput] = useState('');
  const [chosenYearOption, setYearOption] = useState<Option | null>(null);
  const [chosenMajorOption, setMajorOption] = useState<Option | null>(null);
  const [chosenSchoolOption, setSchoolOption] = useState<Option | null>(null);
  const [chosenParicipantOption, setParticipantOption] =
    useState<Option | null>(null);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [currentAttendee, setCurrentAttendee] = useState<Attendee>(null);
  const [modalActive, setModalActive] = useState(false);
  const [attendeeName, setAttendeeName] = useState('');
  const [currentNote, setNote] = useState('');

  const router = useRouter();
  const COMPANY_ID = '06874651-22cf-4b39-8427-018990cc4fdb'; // Will change later
  const EVENT_ID = '1'; // Will change later

  useEffect(() => {
    async function getFilteredAttendee() {
      SponsorServiceAPI.getFilteredAttendee(
        COMPANY_ID,
        EVENT_ID,
        chosenMajorOption?.value,
        chosenYearOption?.value,
        chosenSchoolOption?.value
      )
        .then(({ data, error }) => {
          if (error) {
            console.log(error);
          }

          console.log(data.data);
          setAttendees(data.data as Attendee[]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getFilteredAttendee();
  }, [chosenMajorOption, chosenYearOption, chosenSchoolOption]);

  const { user } = useHibiscusUser();
  if (user == null) {
    return <>Loading</>;
  }
  // Limit access to only sponsor role
  if (user?.role !== HibiscusRole.SPONSOR) {
    router.push('/');
    return <></>;
  }

  const getSchoolOptions = async () => {
    const schools = await APIService.getSchools();
    const opts: Option[] = schools.map((str, i) => ({
      displayName: str,
      value: i.toString(),
    }));

    return opts;
  };

  const yearOptionsList: Option[] = [
    { value: 'Spring 2023', displayName: 'Spring 2023' },
    { value: 'Fall 2023', displayName: 'Fall 2023' },
    { value: 'Spring 2024', displayName: 'Spring 2024' },
    { value: 'Fall 2024', displayName: 'Fall 2024' },
    { value: 'Spring 2025', displayName: 'Spring 2025' },
    { value: 'Fall 2025', displayName: 'Fall 2025' },
    { value: 'Spring 2026', displayName: 'Spring 2026' },
    { value: 'Fall 2026', displayName: 'Fall 2026' },
    { value: 'Spring 2027', displayName: 'Spring 2027' },
    { value: 'Fall 2027', displayName: 'Fall 2027' },
  ];

  const majorOptionsList: Option[] = [
    {
      value: 'Computer Science',
      displayName: 'Computer science/computer engineering',
    },
    {
      value: 'engineering',
      displayName: `Civil, Electrical, Mechanical, etc. Engineering)`,
    },
    {
      value: 'natural science',
      displayName: `A natural science (such as biology, chemistry, physics, etc.)`,
    },
    {
      value: 'mathematics',
      displayName: `Mathematics or statistics`,
    },
    {
      value: 'web dev',
      displayName: `Web development or web design`,
    },
    {
      value: 'business',
      displayName: `Business discipline (such as accounting, finance, marketing, etc.)`,
    },
    {
      value: 'humanities',
      displayName:
        'Humanities discipline (such as literature, history, philosophy, etc.)',
    },
    {
      value: 'arts',
      displayName: `Fine arts or performing arts (such as graphic design, music, studio art, etc.)`,
    },
  ];

  const participantOptionsList: Option[] = [
    { displayName: 'All', value: 'all' },
    { displayName: 'Saved', value: 'saved' },
  ];

  const clearAllFilter = () => {
    setYearOption(null);
    setMajorOption(null);
    setSchoolOption(null);
    setParticipantOption(null);
  };

  const getAttendees = () => {
    return attendees.map((attendee, index) => (
      <HackerTabContainer
        key={index}
        onClick={() => {
          setCurrentAttendee(attendee);
          getAttendeeNote(COMPANY_ID, attendee.id);
        }}
      >
        <HackerTab
          user={attendee}
          showYear={true}
          showMajor={true}
          showSchool={true}
          showSaveButton={true}
          onNoteClick={() => {
            setCurrentAttendee(attendee);
          }}
          onSaveClick={toggleSaveAttendee(COMPANY_ID, attendee)}
        />
      </HackerTabContainer>
    ));
  };

  const openQuickNote = (attendee: Attendee) => {
    setModalActive(true);
    setAttendeeName(`${attendee.full_name}`);
  };

  async function getAttendeeNote(companyId: string, attendeeId: string) {
    SponsorServiceAPI.getAttendeeNote(companyId, attendeeId)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        }

        console.log(data.data.note);
        setNote(data.data.note as string);
      })
      .catch((error) => {
        console.log(error);
      });
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
        console.log(data);
        setNote(data.data.note as string);
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
          console.log(data);
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
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <Wrapper>
      <StyledButton
        onClick={() => {
          router.replace('/sponsor-booth');
        }}
      >
        <Image width="30" height="30" src={'/arrow.svg'} alt="Illustration" />
      </StyledButton>
      <BoldText
        style={{
          marginTop: '1rem',
          fontSize: '35px',
          color: Colors2023.GREEN.STANDARD,
          textShadow: `0px 0px 10px ${Colors2023.GREEN.DARK}`,
        }}
      >
        HackSC 2023 Participants
      </BoldText>
      <Container>
        <FilterContainer>
          <StyledTitle>Sort by</StyledTitle>
          <DropDownContainer>
            <DropDown
              title={'YEAR'}
              options={yearOptionsList}
              color={'pink'}
              placeholder={'Enter class year'}
              chooseOption={setYearOption}
            />
          </DropDownContainer>
          <DropDownContainer>
            <DropDown
              title={'MAJOR'}
              options={majorOptionsList}
              color={'purple'}
              placeholder={'Enter a major'}
              chooseOption={setMajorOption}
            />
          </DropDownContainer>
          <DropDownContainer>
            <DropDown
              title={'SCHOOL'}
              options={getSchoolOptions}
              color={'yellow'}
              placeholder={'Enter a school'}
              chooseOption={setSchoolOption}
            />
          </DropDownContainer>
          <DropDownContainer>
            <DropDown
              title={'PARTICIPANT'}
              options={participantOptionsList}
              color={'blue'}
              placeholder={'Enter type of participant'}
              chooseOption={setParticipantOption}
            />
          </DropDownContainer>
        </FilterContainer>
        <ChosenFilterContainer>
          {(chosenYearOption ||
            chosenMajorOption ||
            chosenSchoolOption ||
            chosenParicipantOption) && (
            <ClearAllButton onClick={() => clearAllFilter()}>
              <Text>Clear All</Text>
            </ClearAllButton>
          )}

          {chosenYearOption !== null && (
            <FilterPill>
              <Text>{chosenYearOption.displayName}</Text>
              <DeleteFilterButton onClick={() => setYearOption(null)}>
                <Image
                  width="15"
                  height="15"
                  src={'/x-button.svg'}
                  alt="x-button"
                />
              </DeleteFilterButton>
            </FilterPill>
          )}
          {chosenMajorOption !== null && (
            <FilterPill>
              <Text>{chosenMajorOption.displayName}</Text>
              <DeleteFilterButton onClick={() => setMajorOption(null)}>
                <Image
                  width="15"
                  height="15"
                  src={'/x-button.svg'}
                  alt="x-button"
                />
              </DeleteFilterButton>
            </FilterPill>
          )}
          {chosenSchoolOption !== null && (
            <FilterPill>
              <Text>{chosenSchoolOption.displayName}</Text>
              <DeleteFilterButton onClick={() => setSchoolOption(null)}>
                <Image
                  width="15"
                  height="15"
                  src={'/x-button.svg'}
                  alt="x-button"
                />
              </DeleteFilterButton>
            </FilterPill>
          )}
          {chosenParicipantOption !== null && (
            <FilterPill>
              <Text>{chosenParicipantOption.displayName}</Text>
              <DeleteFilterButton onClick={() => setParticipantOption(null)}>
                <Image
                  width="15"
                  height="15"
                  src={'/x-button.svg'}
                  alt="x-button"
                />
              </DeleteFilterButton>
            </FilterPill>
          )}
        </ChosenFilterContainer>

        {/* <FilterContainer style={{ marginTop: '2rem' }}>
          <StyledTitle>Search</StyledTitle>
          <OneLineText
            style={{ marginLeft: '3rem' }}
            value={textInput}
            placeholder={'Name'}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </FilterContainer> */}
      </Container>

      <DatabaseContainer>
        <Container style={{ flex: 2 }}>
          <StyledScrollBar>{getAttendees()}</StyledScrollBar>
        </Container>
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
                note={currentNote}
                noteOnClick={() => openQuickNote(currentAttendee)}
                saveOnClick={{}}
              />
            </div>
          ) : (
            <></>
          )}
        </RightContainer>
      </DatabaseContainer>

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
                    setAttendeeNote(COMPANY_ID, currentAttendee.id, textInput);
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
    </Wrapper>
  );
};

export default Index;

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

const DatabaseContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  width: 95%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 6rem;
  padding-bottom: 30px;
`;

const Container = styled.div`
  width: 100%;
  display: 'flex';
  padding: 15px;
  margin-top: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${Colors2023.GRAY.STANDARD};
  border-radius: 10px;
  border: 4px solid ${Colors2023.GRAY.MEDIUM};
`;

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  padding: 30px;
`;

const StyledTitle = styled(Text)`
  font-size: 25px;
  color: ${Colors2023.GREEN.LIGHT};
`;

const ChosenFilterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 2rem;
`;

const ClearAllButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  color: white;
  font-size: 16px;
  letter-spacing: 0.2rem;
  background-color: ${Colors2023.GRAY.MEDIUM};
  border-radius: 25px;
  border: 2px solid ${Colors2023.GRAY.SCHEMDIUM};
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${Colors2023.GRAY.SCHEMDIUM};
    transition: all 0.3s;
  }
`;

const FilterPill = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 15px;
  color: white;
  font-size: 15px;
  letter-spacing: 0.2rem;
  background-color: ${Colors2023.GRAY.MEDIUM};
  border-radius: 25px;
  border: 2px solid ${Colors2023.GRAY.SCHEMDIUM};
  gap: 10px;
  margin-left: 2rem;
`;

const DeleteFilterButton = styled.button`
  background-color: ${Colors2023.GRAY.MEDIUM};

  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 0.5;
    transition: all 0.3s;
  }
`;

const DropDownContainer = styled.div`
  margin-left: 3rem;
`;

const HackerTabContainer = styled.button`
  width: 100%;
  display: flex;
  padding: 5px 15px;
  margin-top: 0.5rem;
  background-color: ${Colors2023.GRAY.STANDARD};
  border-bottom: 1px solid ${Colors2023.GRAY.MEDIUM};
  color: ${Colors2023.GRAY.LIGHT};
  cursor: pointer;

  :active {
    opacity: 0.5;
  }
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

const RightContainer = styled.div`
  display: flex;
  flex: 1;
  margin-top: 2rem;
  margin-left: 1rem;
  padding: 30px;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${Colors2023.GRAY.STANDARD};
  border-radius: 10px;
  border: 4px solid ${Colors2023.GRAY.MEDIUM};
  box-shadow: 1px 2px 15px ${Colors2023.GRAY.MEDIUM};
  transition: max-width 0.5s;
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

const StyledScrollBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 560px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
    background-color: ${Colors2023.GRAY.MEDIUM};
    border-radius: 50px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${Colors2023.GREEN.DARK};
    border-radius: 50px;
  }
`;
