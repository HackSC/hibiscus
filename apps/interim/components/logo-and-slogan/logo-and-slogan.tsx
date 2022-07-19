import { H1, H5 } from '@hacksc-platforms/ui';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface LogoAndSloganProps {}

const LogoH1 = styled(H1)`
  letter-spacing: -3px;
  font-size: 6rem;
  font-weight: 700;

  @media (max-width: 600px) {
    font-size: 4rem;
  }
`;

const SloganText = styled(H5)`
  margin-top: 1rem;
  font-weight: 300;
  color: #939393;
  font-size: 1.5rem;
  font-style: italic;

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
