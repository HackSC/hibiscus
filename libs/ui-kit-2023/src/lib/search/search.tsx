import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { useRef } from 'react';

/* eslint-disable-next-line */
export interface searchProps {
  onInput: (value: string) => void;
}

export function Search({ onInput }: searchProps) {
  const ref = useRef<HTMLInputElement>(null);
  function handleSubmit() {
    if (!ref.current) return;
    onInput(ref.current.value);
  }
  return (
    <OuterDiv>
      <BiSearch
        style={{
          color: 'gray',
          position: 'relative',
          top: '6px',
          right: '8px',
          fontSize: '1.5em',
        }}
      />
      <Input ref={ref} onSubmit={handleSubmit} placeholder="Search..." />
    </OuterDiv>
  );
}

export default Search;

const Input = styled.input`
  all: unset;
  width: 90%;
`;

const OuterDiv = styled.div`
  background: #313131;
  /* gray/light */
  width: 250px;
  height: 42px;
  border: 1.5px solid #f4f4f4;
  border-radius: 11px;
  padding-left: 20px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 42px;
  font-feature-settings: 'cv05' on;

  /* gray/light */

  color: #ffffff;
  :hover {
    filter: drop-shadow(0px 0px 15px #c2c2c2);
  }
  :focus {
    /* gray/medium */

    background: #313131;
    /* purple/standard */

    border: 1.5px solid #7a65fd;
    border-radius: 11px;
  }
  ::placeholder {
    color: #979797;
  }
`;
