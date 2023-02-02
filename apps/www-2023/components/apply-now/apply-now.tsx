import { Text, Label } from '@hibiscus/ui';
import { ColorSpanBold, GlowSpan } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ApplyNowProps {}

export function ApplyNow(props: ApplyNowProps) {
  return (
    <StyledApplyNow>
      <ColorSpanBold color="#765f52">
        <Label>february 3-5</Label>
      </ColorSpanBold>
      <StyledDiv color="black">
        <GlowSpan color={Colors2023.RED.LIGHT}>Applications</GlowSpan>&nbsp;
        <GlowSpan color={Colors2023.BLUE.LIGHT}>have</GlowSpan>&nbsp;
        <GlowSpan color={Colors2023.YELLOW.LIGHT}>now</GlowSpan>&nbsp;
        <GlowSpan color={Colors2023.PINK.LIGHT}>closed!</GlowSpan> <br />
        <GlowSpan color={Colors2023.RED.LIGHT}>See</GlowSpan>&nbsp;
        <GlowSpan color={Colors2023.GREEN.LIGHT}>you</GlowSpan>&nbsp;
        <GlowSpan color={Colors2023.YELLOW.LIGHT}>at</GlowSpan>&nbsp;
        <GlowSpan color={Colors2023.BLUE.LIGHT}>the</GlowSpan>&nbsp;
        <GlowSpan color={Colors2023.PINK.LIGHT}>hackathon</GlowSpan>&nbsp;
        <GlowSpan color={Colors2023.PURPLE.LIGHT}>:)</GlowSpan>
      </StyledDiv>
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

const StyledDiv = styled.div`
  width: fit-content;
  border: 4px solid ${Colors2023.GRAY.LIGHT};
  padding: 10px 30px;
  background: ${Colors2023.GRAY.DARK};
  border-radius: 10px;
  -moz-box-shadow: 0px 0px 10px #765f52;
  -webkit-box-shadow: 0px 0px 10px #765f52;
  box-shadow: 0px 0px 10px #765f52;
  //fonts
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  white-space: pre-line;
`;
