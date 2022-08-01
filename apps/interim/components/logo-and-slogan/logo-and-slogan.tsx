import { H1, H2 } from '@hacksc-platforms/ui';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface LogoAndSloganProps {}

const LogoH1 = styled(H1)`
  padding: 6rem 0 0;
  letter-spacing: -3px;
  font-size: 5rem;
  font-weight: 700;
  color: #2b2b2b;

  @media (max-width: 600px) {
    padding-top: 2rem;
    font-size: 4rem;
  }

  @media (max-width: 1440px) {
    padding-top: 4rem;
  }
`;

const SloganH2 = styled(H2)`
  margin-top: 1rem;
  font-weight: 300;
  color: #868585;
  font-size: 1.75rem;
  font-style: italic;
  padding-top: 0.5rem;

  @media (max-width: 425px) {
    font-size: 1.5rem;
  }
`;

export function LogoAndSloganSection(props: LogoAndSloganProps) {
  return (
    <div>
      <LogoH1>HackSC</LogoH1>
      <SloganH2>Southern California{`'`}s Flagship Hackathon</SloganH2>
    </div>
  );
}

export default LogoAndSloganSection;
