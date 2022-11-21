import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ParagraphTextProps {
  label: string;
}

export function ParagraphText(props: ParagraphTextProps) {
  return (
      <Input placeholder={props.label}/>
  );
}

export default ParagraphText;

const Input = styled.textarea`
    all: unset;
    background: #565656;
    /* gray/light */
    width: 250px;
    height: 160px;
    border: 1.5px solid #F4F4F4;
    border-radius: 11px;
    padding: 15px 20px;

    //font
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 20px;
    font-feature-settings: 'cv05' on;

/* gray/light */

    color: #F4F4F4;
    :hover {
        filter: drop-shadow(0px 0px 15px #C2C2C2);
    }
    :focus{
        /* gray/medium */

        background: #565656;
        /* purple/standard */

        border: 1.5px solid #7A65FD;
        border-radius: 11px;
    }
`