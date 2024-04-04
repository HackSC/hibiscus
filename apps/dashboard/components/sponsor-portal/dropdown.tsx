/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { Text } from '@hibiscus/ui';
import { Colors2023 } from '@hibiscus/styles';
import Image from 'next/image';
import { Option } from '@hibiscus/types';
import { Combobox } from '@hibiscus/ui-kit-2023';
import { Colors as SctwColors } from '@hacksc/sctw-ui-kit';

interface Props {
  title: string;
  options: Option[] | (() => Promise<Option[]>);
  color: string;
  placeholder: string;
  chooseOption;
}

export function DropDown({
  title,
  options,
  color,
  placeholder,
  chooseOption,
}: Props) {
  const [textInput, setTextInput] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTextInput(e.target.value);
  };

  const handleChooseOptionFromDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    option: Option
  ) => {
    setTextInput('');
    chooseOption(option);
    setShowOptions(false);
  };

  const handleShowOptionsOnClick = useCallback((e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      // clicked outside
      setShowOptions(false);
      setTextInput('');
    }
  }, []);

  // binding show options on click
  useEffect(() => {
    document.addEventListener('mousedown', handleShowOptionsOnClick);
    return () => {
      document.removeEventListener('mousedown', handleShowOptionsOnClick);
    };
  }, [handleShowOptionsOnClick, wrapperRef]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} ref={wrapperRef}>
      {color === 'pink' && (
        <PinkFilterButton onClick={() => setShowOptions(true)}>
          <Text>{title}</Text>
          <Image
            width="20"
            height="20"
            src={'/dropdown-arrow.svg'}
            alt="x-button"
          />
        </PinkFilterButton>
      )}
      {color === 'purple' && (
        <PurpleFilterButton onClick={() => setShowOptions(true)}>
          <Text>{title}</Text>
          <Image
            width="20"
            height="20"
            src={'/dropdown-arrow.svg'}
            alt="x-button"
          />
        </PurpleFilterButton>
      )}
      {color === 'yellow' && (
        <YellowFilterButton onClick={() => setShowOptions(true)}>
          <Text>{title}</Text>
          <Image
            width="20"
            height="20"
            src={'/dropdown-arrow.svg'}
            alt="x-button"
          />
        </YellowFilterButton>
      )}
      {color === 'blue' && (
        <BlueFilterButton onClick={() => setShowOptions(true)}>
          <Text>{title}</Text>
          <Image
            width="20"
            height="20"
            src={'/dropdown-arrow.svg'}
            alt="x-button"
          />
        </BlueFilterButton>
      )}
      {color === 'lightblue' && (
        <LightBlueFilterButton onClick={() => setShowOptions(true)}>
          <Text>{title}</Text>
          <Image
            width="20"
            height="20"
            src={'/dropdown-arrow.svg'}
            alt="x-button"
          />
        </LightBlueFilterButton>
      )}
      {color === 'red' && (
        <RedFilterButton onClick={() => setShowOptions(true)}>
          <Text>{title}</Text>
          <Image
            width="20"
            height="20"
            src={'/dropdown-arrow.svg'}
            alt="x-button"
          />
        </RedFilterButton>
      )}
      {showOptions && (
        <SearchContainer>
          <Combobox
            onChange={handleInputChange}
            limitDropdownItems={8}
            onClickChooseOption={handleChooseOptionFromDropdown}
            placeholder={placeholder}
            options={options}
            value={textInput}
          />
        </SearchContainer>
      )}
    </div>
  );
}

export default DropDown;

const SearchContainer = styled.div`
  position: absolute;
  margin-top: 3rem;
  z-index: 999;
`;

const PinkFilterButton = styled.button`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  color: white;
  font-size: 16px;
  letter-spacing: 0.2rem;
  background-color: ${Colors2023.PINK.DARK};
  border-radius: 10px;
  border: 2px solid ${Colors2023.PINK.STANDARD};
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${Colors2023.PINK.STANDARD};
    transition: all 0.3s;
  }
`;

const PurpleFilterButton = styled(PinkFilterButton)`
  background-color: ${Colors2023.PURPLE.DARK};
  border: 2px solid ${Colors2023.PURPLE.STANDARD};

  &:hover {
    background-color: ${Colors2023.PURPLE.STANDARD};
  }
`;

const YellowFilterButton = styled(PinkFilterButton)`
  background-color: #dcab0f; // aardvark sweater
  border: 2px solid ${SctwColors.Yellow.Yuhlow};

  &:hover {
    background-color: ${SctwColors.Yellow.Yuhlow};
  }
`;

const BlueFilterButton = styled(PinkFilterButton)`
  background-color: ${SctwColors.Blue.Bloo};
  border: 2px solid #94b0f8; // Blooberry

  &:hover {
    background-color: #94b0f8; // Blooberry
  }
`;

const LightBlueFilterButton = styled(PinkFilterButton)`
  background-color: #94b0f8; // Blooberry
  border: 2px solid #fef7e5;

  &:hover {
    background-color: #fef7e5;
  }
`;

const RedFilterButton = styled(PinkFilterButton)`
  background-color: ${SctwColors.Red.Redward};
  border: 2px solid #ffacab; // Light Redward

  &:hover {
    background-color: #ffacab; // Light Redward
  }
`;
