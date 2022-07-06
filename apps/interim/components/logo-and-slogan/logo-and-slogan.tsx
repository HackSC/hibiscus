import { H1, H2 } from '@hacksc-platforms/ui';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface LogoAndSloganProps {}

const LogoH1 = styled(H1)`
  letter-spacing: -3px;
  font-size: 70px;
  font-weight: 700;
`;

const SloganH2 = styled(H2)({
  fontWeight: 300,
  color: '#939393',
  fontStyle: 'italic',
  fontSize: 20,
});

export function LogoAndSloganSection(props: LogoAndSloganProps) {
  return (
    <div>
      <LogoH1>HackSC</LogoH1>
      <SloganH2>Southern California{`'`}s Flagship Hackathon</SloganH2>
    </div>
  );
}

export default LogoAndSloganSection;
