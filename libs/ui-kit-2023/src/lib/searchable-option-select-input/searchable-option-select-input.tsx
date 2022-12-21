import { Colors2023 } from '@hacksc-platforms/styles';
import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import OneLineText from '../one-line-text/one-line-text';
import { Text } from '@hacksc-platforms/ui';
import Fuse from 'fuse.js';
import { Option } from '@hacksc-platforms/types';

/* eslint-disable-next-line */
export interface OptionSelectProps
  extends InputHTMLAttributes<HTMLInputElement> {
  options: Option[];
  onClickChooseOption?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    option: Option
  ) => void;
}
const fuse = new Fuse<Option>([], { keys: ['displayName'] });

export function SearchableOptionSelectInput(props: OptionSelectProps) {
  fuse.setCollection(props.options ?? []);
  const [displayedOptions, setDisplayedOptions] = useState<Option[] | null>(
    props.options ?? null
  );
  const [showOptions, setShowOptions] = useState(false);
  const [textInput, setTextInput] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleShowOptionsOnClick = useCallback((e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      // clicked outside
      setShowOptions(false);
    } else {
      setShowOptions(true);
    }
  }, []);

  const getOptionClickHandler = (option: Option) => {
    return ((e) => {
      e.preventDefault();
      setTextInput(option.displayName);
      setShowOptions(false);
      if (props.onClickChooseOption) props.onClickChooseOption(e, option);
    }) as React.MouseEventHandler<HTMLButtonElement>;
  };

  const handleTypeSearchInput: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const input = e.target.value;
    setTextInput(input);
    if (props.onChange) props.onChange(e);
  };

  // binding show options on click
  useEffect(() => {
    document.addEventListener('mousedown', handleShowOptionsOnClick);
    return () => {
      document.removeEventListener('mousedown', handleShowOptionsOnClick);
    };
  }, [handleShowOptionsOnClick, wrapperRef]);

  // when event cause show options or on input, search
  useEffect(() => {
    if (!showOptions) return;
    const searchText = textInput.trim(); // process the text
    if (searchText.length === 0) {
      setDisplayedOptions(props.options ?? null); // show full options if no input
      return;
    }
    const res = fuse.search(searchText);
    const items = res.map(({ item }) => item);
    setDisplayedOptions(items);
  }, [props.options, showOptions, textInput]);

  const OptionsDropdown = () => (
    <Dropdown>
      {displayedOptions?.map((item, i) => (
        <DropdownItem onClick={getOptionClickHandler(item)} key={i}>
          <Text>{item.displayName}</Text>
        </DropdownItem>
      ))}
    </Dropdown>
  );

  return (
    <Wrapper ref={wrapperRef}>
      <OneLineText
        {...props}
        value={textInput}
        onChange={handleTypeSearchInput}
      />
      {showOptions && <OptionsDropdown />}
    </Wrapper>
  );
}

export default SearchableOptionSelectInput;

const Wrapper = styled.div`
  position: relative;
  width: max-content;
`;

const Dropdown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  width: 100%;
`;

const DropdownItem = styled.button`
  font-family: 'Inter';
  cursor: pointer;
  background-color: ${Colors2023.GRAY.SCHEMDIUM};
  text-align: left;
  padding: 11px;
  border: none;
  border-radius: 5px;
  color: ${Colors2023.GRAY.LIGHT};
  :hover {
    background-color: ${Colors2023.GRAY.SHLIGHT};
  }
  :focus {
    background: ${Colors2023.GRAY.MEDIUM};
    border: 1.5px solid ${Colors2023.PURPLE.STANDARD};
  }
`;
