import { Link } from '@hibiscus/ui';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ApplyNowProps {}

export function ApplyNow(props: ApplyNowProps) {
  return (
    <StyledApplyNow>
      <StyledLabel>february 3-5</StyledLabel>
      <Link href={'https://dashboard.hacksc.com/apply-2023'}>
        <StyledButton color="black">
          <GlowSpan color={Colors2023.RED.LIGHT}>A</GlowSpan>
          <GlowSpan color={Colors2023.BLUE.LIGHT}>P</GlowSpan>
          <GlowSpan color={Colors2023.YELLOW.LIGHT}>P</GlowSpan>
          <GlowSpan color={Colors2023.PINK.LIGHT}>L</GlowSpan>
          <GlowSpan color={Colors2023.RED.LIGHT}>Y</GlowSpan> &nbsp;
          <GlowSpan color={Colors2023.GREEN.LIGHT}>N</GlowSpan>
          <GlowSpan color={Colors2023.YELLOW.LIGHT}>O</GlowSpan>
          <GlowSpan color={Colors2023.BLUE.LIGHT}>W</GlowSpan>
        </StyledButton>
      </Link>
    </StyledApplyNow>
  );
}

export default ApplyNow;

const StyledApplyNow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  position: absolute;
  top: 57vh;
  left: 57vw;
  text-align: center;
  @media screen and (max-width: 1600px) {
    top: 52vh;
    left: 51vw;
  }
  @media screen and (max-width: 1280px) {
    top: 53vh;
    left: 50vw;
  }
  @media screen and (max-width: 980px) {
    top: 56vh;
    left: 45vw;
  }
  @media screen and (max-width: 768px) {
    top: 57vh;
    left: 37vw;
  }
  @media screen and (max-width: 450px) {
    top: 57vh;
    left: 25vw;
  }
  @media screen and (max-width: 340px) {
    top: 63vh;
    left: 24vw;
  }
  @media screen and (max-width: 290px) {
    top: 63vh;
    left: 21vw;
  }
`;

const StyledLabel = styled.p`
  color: #765f52;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
`;

const StyledButton = styled.button`
  width: fit-content;
  height: 55px;
  border: 4px solid ${Colors2023.GRAY.LIGHT};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 30px;
  gap: 5px;
  background: ${Colors2023.GRAY.DARK};
  border-radius: 10px;
  -moz-box-shadow: 0px 0px 10px #765f52;
  -webkit-box-shadow: 0px 0px 10px #765f52;
  box-shadow: 0px 0px 10px #765f52;
  //fonts
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 46px;
  :hover {
    border: 1.5px solid ${Colors2023.GRAY.LIGHT};
    background: ${Colors2023.GRAY.STANDARD};
    cursor: pointer;
    transition: 0.1s;
    padding: 10px 32.5px;
  }
  :active {
    border: 1.5px solid ${Colors2023.GRAY.STANDARD};
    background: ${Colors2023.GRAY.LIGHT};
    border-radius: 10px;
  }
`;
