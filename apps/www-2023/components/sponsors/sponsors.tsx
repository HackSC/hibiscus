/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { H2 } from '@hibiscus/ui';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';

/* eslint-disable-next-line */
export interface SponsorsProps {}

export function Sponsors(props: SponsorsProps) {
  return (
    <StyledSponsors>
      <H2>
        <GlowSpan
          color={Colors2023.GRAY.LIGHT}
          shadowColor={Colors2023.GREEN.STANDARD}
        >
          Our Sponsors
        </GlowSpan>
      </H2>
      <SponsorsContainer>
        <Sponsor>
          <a
            href="https://www.elastic.co/community/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/img/logos/elastic.png"
              alt="Elastic Logo"
              loading="lazy"
            />
          </a>
        </Sponsor>
        <Sponsor>
          <a href="https://www.carc.usc.edu/" target="_blank" rel="noreferrer">
            <img src="/img/logos/carc.png" alt="Elastic Logo" loading="lazy" />
          </a>
        </Sponsor>
      </SponsorsContainer>
    </StyledSponsors>
  );
}

const StyledSponsors = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SponsorsContainer = styled.div`
  margin: 5vw 15vw;
  column-count: 4;
  column-gap: 10px;
  @media (max-width: 1920px) {
    column-count: 2;
  }
  @media (max-width: 1080px) {
    column-count: 2;
  }
  @media (max-width: 768px) {
    column-count: 1;
  }
`;

const Sponsor = styled.div`
  margin: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  margin-bottom: 10px;
  break-inside: avoid;
  > img {
    grid-row: 1 / -1;
    grid-column: 1;
    max-width: 100%;
    display: block;
  }
  > video {
    max-width: 100%;
    display: block;
  }
  > a {
    color: black;
    text-decoration: none;
    > img {
      grid-row: 1 / -1;
      grid-column: 1;
      max-width: 100%;
      display: block;
    }
  }
`;

export default Sponsors;
