/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { H2 } from '@hibiscus/ui';
/* eslint-disable-next-line */
export interface AlumDestinationsProps {}

export function AlumDestinations(props: AlumDestinationsProps) {
  return (
    <StyledAlumDestinations>
      <AlumHeaderH2>Alumni Destinations</AlumHeaderH2>
      <DesktopDestinations>
        <img src="/img/destinations/dest2.png" alt="Alumni Destinations" />
      </DesktopDestinations>
      <MobileDestinations>
        <img src="/img/destinations/dest1.png" alt="Alumni Destinations" />
      </MobileDestinations>
    </StyledAlumDestinations>
  );
}

const StyledAlumDestinations = styled.div``;

const AlumHeaderH2 = styled(H2)`
  font-size: 4.25rem;
  font-weight: 600;
  color: #2b2b2b;
  text-align: center;

  @media (max-width: 1240px) {
    font-size: 3rem;
  }
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const DesktopDestinations = styled.div`
  @media only screen and (max-width: 1080px) {
    display: none !important;
    touch-action: none !important;
  }
  > img {
    padding: 5vw 0;
    width: 70vw;
  }
`;

const MobileDestinations = styled.div`
  display: none;
  touch-action: none;
  @media screen and (max-width: 1080px) {
    display: flex !important;
    touch-action: auto !important;
  }
  > img {
    padding: 10vw 0;
    width: 70vw;
  }
`;

export default AlumDestinations;
