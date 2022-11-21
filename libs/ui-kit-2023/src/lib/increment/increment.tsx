import { relative } from 'path';
import { useState } from 'react';
import styled from 'styled-components';


export function Increment() {
    const [count, setCount] = useState(0);
    const [zero,setZero]=useState('0');


    function handleMinus() {
        if (count>0){
            setCount(count - 1);
        }
        if (count<11){
            setZero('0');
        } else {
            setZero('');
        }
      }
    function handlePlus (){
        setCount(count + 1)
        if (count<9){
            setZero('0');
        } else {
            setZero('');
        }
    }
    return (
        <StyledIncrement>
            <Minus>
                <p onClick={handleMinus} style={{position:"relative", bottom: "2px"}}>-</p>
            </Minus>
            <Count>{zero}{count}</Count>
            <Plus>
                <p onClick={handlePlus} style={{position:"relative", bottom: "2px"}}>+</p>
            </Plus>
        </StyledIncrement>
        
    );
  }
  export default Increment;

  const StyledIncrement = styled.div`
    display: flex;
    align-items: center;
  `
  const Minus = styled.button`
    all: unset;
  cursor: pointer;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: #565656;
    border: 1px solid #307C93;
    display: flex;
    align-items: center;
    justify-content:center;
    color:#76D3EF;
    font-size: 40px;
    font-weight: 250;
    :hover {
        /* background-color: #ccc; */
        filter: drop-shadow(0px 0px 15px #C2C2C2);
    }
    
  `
  const Plus = styled.button`
    all: unset;
    cursor: pointer;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: #565656;
    border: 1px solid #307C93;
    display: flex;
    align-items: center;
    justify-content:center;
    color:#76D3EF;
    font-size: 30px;
    font-weight: 250;
    :hover {
        filter: drop-shadow(0px 0px 15px #C2C2C2);
    }
  `
  const Count = styled.p`
    width: 35px;
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
  `