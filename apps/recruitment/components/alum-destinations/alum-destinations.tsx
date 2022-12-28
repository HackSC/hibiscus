import styled from 'styled-components';
import { H2 } from '@hibiscus/ui';
import Image from 'next/image';
/* eslint-disable-next-line */
export interface AlumDestinationsProps {}

export function AlumDestinations(props: AlumDestinationsProps) {
  return (
    <StyledAlumDestinations>
      <AlumHeaderH2>Alumni Destinations</AlumHeaderH2>
      <DesktopDestinations>
        <Image
          src="/img/destinations/dest2.png"
          alt="Alumni Destinations"
          width={1000}
          height={600}
        />
      </DesktopDestinations>
      <MobileDestinations>
        <Image
          src="/img/destinations/dest1.png"
          alt="Alumni Destinations"
          width={1000}
          height={1200}
        />
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
  padding: 0 15vw;
  @media only screen and (max-width: 1080px) {
    display: none !important;
    touch-action: none !important;
  }
`;

const MobileDestinations = styled.div`
  display: none;
  touch-action: none;
  padding: 0 20vw;
  @media screen and (max-width: 1080px) {
    display: flex !important;
    touch-action: auto !important;
  }
`;

export default AlumDestinations;
