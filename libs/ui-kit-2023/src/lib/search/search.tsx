import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { FormEvent, useRef } from 'react';

/* eslint-disable-next-line */
export interface searchProps {
  placeholder: string;
  onInput: (value: string) => void;
}

export function Search({ placeholder, onInput }: searchProps) {
  const ref = useRef<HTMLInputElement>(null);
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!ref.current) return;
    onInput(ref.current.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <OuterDiv>
        <BiSearch
          style={{
            color: 'black',
            position: 'relative',
            // top: '6px',
            right: '8px',
            fontSize: '1em',
          }}
        />
        <Input ref={ref} placeholder={placeholder} />
      </OuterDiv>
    </form>
  );
}

export default Search;

const Input = styled.input`
  all: unset;
  width: 90%;
  font-size: 12px;
  color: black;

  ::placeholder {
    color: black;
  }
`;

const OuterDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  // background: #313131;
  /* gray/light */
  width: 250px;
  height: 35px;
  border: 1.5px solid black;
  border-radius: 5px;
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
