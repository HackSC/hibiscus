import styled from 'styled-components'

export interface CheckboxProps {
    label: string;
  }

export function Checkbox(props:CheckboxProps) {
    return (
        <StyledCheckbox>{props.label}
            <input type="checkbox" />
            <span className="checkmark"></span>
        </StyledCheckbox>
        
    );
  }

  const StyledCheckbox = styled.label`
    color: white;
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #565656;
        border: 1px solid #307C93;
        border-radius: 5px;
    }

    :hover input ~ .checkmark {
        /* background-color: #ccc; */
        filter: drop-shadow(0px 0px 15px #C2C2C2);
    }
    input:checked ~ .checkmark {
        background-color: #76D3EF;
    }
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }
    input:checked ~ .checkmark:after {
        display: block;
    }
    .checkmark:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid #307C93;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
  `