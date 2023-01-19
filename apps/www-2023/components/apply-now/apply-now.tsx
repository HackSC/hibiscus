import { Link } from '@hibiscus/ui';
import { Button } from '@hibiscus/ui-kit-2023';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ApplyNowProps {}

const StyledApplyNow = styled.div`
  z-index: 10;
  position: absolute;
  top: 60vh;
  left: 59vw;
  @media screen and (max-width: 1600px) {
    top: 57vh;
    left: 56vw;
  }
  @media screen and (max-width: 1280px) {
    top: 60vh;
    left: 42vw;
  }
  @media screen and (max-width: 768px) {
    top: 62vh;
    left: 35vw;
  }
  @media screen and (max-width: 400px) {
    top: 63vh;
    left: 29vw;
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

export function ApplyNow(props: ApplyNowProps) {
  return (
    <StyledApplyNow>
      <Link href={'https://dashboard.hacksc.com/apply-2023'}>
        <Button color="black">APPLY NOW</Button>
      </Link>
    </StyledApplyNow>
  );
}

export default ApplyNow;
