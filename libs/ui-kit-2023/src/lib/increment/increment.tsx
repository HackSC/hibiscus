import { relative } from 'path';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export interface IncrementProps {
  onInput: (value: number) => void;
}

export function Increment({ onInput }: IncrementProps) {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState('00');

  useEffect(() => {
    onInput(5);
  }, [count]);

  function handleMinus() {
    if (count > 0) {
      setCount(count - 1);

      const myNumber = count - 1;
      if (count < 99) {
        const formattedNumber = ('0' + myNumber).slice(-2);
        setNumber(formattedNumber);
      } else {
        const formattedNumber = String(myNumber);
        setNumber(formattedNumber);
      }
    }
  }
  function handlePlus() {
    if (count < 99) {
      setCount(count + 1);
      const myNumber = count + 1;
      const formattedNumber = ('0' + myNumber).slice(-2);
      setNumber(formattedNumber);
    } else {
      setCount(count + 1);
      const myNumber = count + 1;
      const formattedNumber = String(myNumber);
      setNumber(formattedNumber);
    }
  }
  return (
    <StyledIncrement>
      <Minus>
        <p
          onClick={handleMinus}
          style={{ position: 'relative', bottom: '2px' }}
        >
          -
        </p>
      </Minus>
      <Count>{number}</Count>
      <Plus>
        <p onClick={handlePlus} style={{ position: 'relative', bottom: '2px' }}>
          +
        </p>
      </Plus>
    </StyledIncrement>
  );
}
export default Increment;

const StyledIncrement = styled.div`
  display: flex;
  align-items: center;
`;
const Minus = styled.button`
  all: unset;
  cursor: pointer;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: #565656;
  border: 1px solid #307c93;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #76d3ef;
  font-size: 40px;
  font-weight: 250;
  :hover {
    /* background-color: #ccc; */
    filter: drop-shadow(0px 0px 15px #c2c2c2);
  }
`;
const Plus = styled.button`
  all: unset;
  cursor: pointer;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: #565656;
  border: 1px solid #307c93;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #76d3ef;
  font-size: 30px;
  font-weight: 250;
  :hover {
    filter: drop-shadow(0px 0px 15px #c2c2c2);
  }
`;
const Count = styled.p`
  width: 42px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  text-align: center;
  /* identical to box height */
  margin: 0 10px;
  font-feature-settings: 'zero' on, 'ss01' on, 'cv08' on, 'cv04' on, 'cv05' on;
  font-feature-settings: 'zero' 1;
  color: white;
  /* border: 1px solid red; */
`;
