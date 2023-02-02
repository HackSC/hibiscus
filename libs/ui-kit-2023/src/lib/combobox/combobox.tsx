import { Colors2023 } from '@hibiscus/styles';
import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import OneLineText from '../one-line-text/one-line-text';
import { Text } from '@hibiscus/ui';
import Fuse from 'fuse.js';
import { HackformQuestion, Option } from '@hibiscus/types';

/* eslint-disable-next-line */
export interface OptionSelectProps
  extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  limitDropdownItems?: number;
  options: HackformQuestion['options'];
  onClickChooseOption?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    option: Option
  ) => void;
}

export function Combobox(props: OptionSelectProps) {
  const [displayedOptions, setDisplayedOptions] = useState<Option[] | null>(
    null
  );
  const [fuse, setFuse] = useState<Fuse<Option> | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [textInput, setTextInput] = useState(props.value ?? '');
  const wrapperRef = useRef<HTMLDivElement>(null);

  // loading in options depending on whether given loader fn or static array
  useEffect(() => {
    const f = new Fuse<Option>([], { keys: ['displayName'] });
    if (typeof props.options === 'function') {
      props
        .options()
        .then((opts) => {
          const limited = opts.slice(0, props.limitDropdownItems);
          f.setCollection(opts ?? []);
          setDisplayedOptions(limited);
        })
        .catch((e) => {
          console.error(e);
        });
    } else if (Array.isArray(props.options)) {
      const limited = props.options.slice(0, props.limitDropdownItems);
      f.setCollection(props.options ?? []);
      setDisplayedOptions(limited);
    }
    setFuse(f);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      return;
    }
    if (fuse === null) return;
    const res = fuse.search(searchText);
    const items = res
      .map(({ item }) => item)
      .slice(0, props.limitDropdownItems);
    setDisplayedOptions(items);
  }, [props.options, showOptions, textInput, props.limitDropdownItems, fuse]);

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

export default Combobox;

const Wrapper = styled.div`
  position: relative;
  width: max-content;
  z-index: 1;
`;

const Dropdown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 15rem;
  gap: 3px;
  border-radius: 0 0 5px 5px;
  margin-top: -10px;
  padding: 15px 0 5px;
  width: 100%;
  z-index: -1;
  background-color: ${Colors2023.GRAY.MEDIUM};
  border: 1px solid ${Colors2023.GRAY.SCHEMDIUM};
`;

const DropdownItem = styled.button`
  font-family: 'Inter';
  cursor: pointer;
  background: none;
  text-align: left;
  padding: 11px;
  margin: 0 3px;
  border: none;
  border-radius: 5px;
  color: ${Colors2023.GRAY.LIGHT};
  transition: 0.1s;
  :hover {
    background-color: #bff0ff51;
  }
  :focus {
    background: ${Colors2023.GRAY.MEDIUM};
    border: 1.5px solid ${Colors2023.PURPLE.STANDARD};
  }
`;
