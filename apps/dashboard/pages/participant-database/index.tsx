import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import { BoldText, Text } from '@hibiscus/ui';
import { Colors2023 } from '@hibiscus/styles';
import { SearchableOptionSelectInput } from '@hibiscus/ui-kit-2023';
import { Option } from '@hibiscus/types';
import Image from 'next/image';
import DropDown from '../../components/sponsor-portal/dropdown';
import APIService from '../../common/api';

const Index = () => {
  const [textInput, setTextInput] = useState('');
  const [chosenYearOption, setYearOption] = useState<Option | null>(null);
  const [chosenMajorOption, setMajorOption] = useState<Option | null>(null);
  const [chosenSchoolOption, setSchoolOption] = useState<Option | null>(null);
  const [chosenParicipantOption, setParticipantOption] =
    useState<Option | null>(null);
  const [chosenFilterList, setChosenFilterList] = useState<Option[] | null>(
    null
  );

  const getSchoolOptions = async () => {
    const schools = await APIService.getSchools();
    const opts: Option[] = schools.map((str, i) => ({
      displayName: str,
      value: i.toString(),
    }));

    return opts;
  };

  const yearOptionsList: Option[] = [
    { value: '2023', displayName: '2023' },
    { value: '2024', displayName: '2024' },
    { value: '2025', displayName: '2025' },
    { value: '2026', displayName: '2026' },
  ];

  const majorOptionsList: Option[] = [
    {
      value: 'cs',
      displayName:
        'Computer science, computer engineering, or software engineering',
    },
    {
      value: 'eng',
      displayName: `Another engineering discipline (such as civil, electrical, mechanical, etc.)`,
    },
    {
      value: 'natural',
      displayName: `A natural science (such as biology, chemistry, physics, etc.)`,
    },
    {
      value: 'math',
      displayName: `Mathematics or statistics`,
    },
    {
      value: 'web',
      displayName: `Web development or web design`,
    },
    {
      value: 'business',
      displayName: `Business discipline (such as accounting, finance, marketing, etc.)`,
    },
    {
      value: 'human',
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
    { displayName: 'Attended booth', value: 'attended' },
  ];

  const showChosenFilter = () => {
    return (
      // chosenMajorOption && (
      <FilterPill>
        <Text>2025</Text>
        <Image width="20" height="20" src={'/x-button.svg'} alt="x-button" />
      </FilterPill>
      // )
    );
  };

  return (
    <Wrapper>
      <BoldText
        style={{
          fontSize: '35px',
          color: Colors2023.GREEN.STANDARD,
          textShadow: `0px 0px 10px ${Colors2023.GREEN.DARK}`,
        }}
      >
        HackSC 2023 Participants
      </BoldText>
      <SearchContainer>
        <FilterContainer>
          <StyledTitle>Sort by</StyledTitle>
          <DropDown
            title={'YEAR'}
            options={yearOptionsList}
            color={'pink'}
            placeholder={'Enter class year'}
            chooseOption={setYearOption}
          />
          <DropDown
            title={'MAJOR'}
            options={majorOptionsList}
            color={'purple'}
            placeholder={'Enter a major'}
            chooseOption={setMajorOption}
          />
          <DropDown
            title={'SCHOOL'}
            options={getSchoolOptions}
            color={'yellow'}
            placeholder={'Enter a school'}
            chooseOption={setSchoolOption}
          />
          <DropDown
            title={'PARTICIPANT'}
            options={participantOptionsList}
            color={'blue'}
            placeholder={'Enter type of participant'}
            chooseOption={setParticipantOption}
          />
        </FilterContainer>
        <ChosenFilterContainer>
          <ClearAllButton>
            <Text>Clear All</Text>
          </ClearAllButton>
          {chosenYearOption !== null && (
            <FilterPill>
              <Text>{chosenYearOption.value}</Text>
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
              <Text>{chosenMajorOption.value}</Text>
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
      </SearchContainer>
    </Wrapper>
  );
};

export default Index;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 6rem;
`;

const SearchContainer = styled.div`
  width: 80%;
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
  justify-content: space-around;
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
  padding-left: 4rem;
`;

const ClearAllButton = styled.button`
  display: flex;
  justify-content: space-between;
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
  font-size: 16px;
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
