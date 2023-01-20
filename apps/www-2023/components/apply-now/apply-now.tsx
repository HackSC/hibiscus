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
`;

export function ApplyNow(props: ApplyNowProps) {
  return (
    <StyledApplyNow>
      <Link href={'https://dashboard.hacksc.com/apply-2023'}>
        <ApplyNowButton color="black">APPLY NOW</ApplyNowButton>
      </Link>
    </StyledApplyNow>
  );
}

export default ApplyNow;

const ApplyNowButton = styled(Button)`
  position: absolute;
  top: -50vh;
  left: 50vw;
`;
