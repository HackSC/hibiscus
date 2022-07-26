import { H1, H5 } from '@hacksc-platforms/ui';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface LogoAndSloganProps {}

const LogoH1 = styled(H1)`
  letter-spacing: -3px;
  font-size: 6rem;
  font-weight: 700;
  color: #2b2b2b;
  @media (max-width: 600px) {
    font-size: 4rem;
  }
`;

const SloganText = styled(H5)`
  margin-top: 1rem;
  font-weight: 400;
  color: #939393;
  font-size: 1.75rem;
  font-style: italic;
  padding-top: .5rem;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

export function LogoAndSloganSection(props: LogoAndSloganProps) {
  return (
    <div>
      <LogoH1>HackSC</LogoH1>
      <SloganText>Southern California{`'`}s Flagship Hackathon</SloganText>
    </div>
  );
}

export default LogoAndSloganSection;
