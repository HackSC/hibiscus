/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { H2 } from '@hibiscus/ui';

/* eslint-disable-next-line */
export interface HackSCMemoriesProps {}

export function HackSCMemories(props: HackSCMemoriesProps) {
  return (
    <StyledHackSCMemories>
      <MemosHeaderH2>HackSC Memories</MemosHeaderH2>
      <MemoriesContainer>
        <Memory>
          <img
            src="/img/memories/photo1.png"
            alt="Gloria, Alysha, Ashley, and Angel at the town squate in Lake Arrowhead"
            loading="lazy"
          />
        </Memory>
        <Memory>
          <img
            src="/img/memories/photo2.png"
            alt="Alysha at the town squate in Lake Arrowhead"
            loading="lazy"
          />
        </Memory>
        <Memory>
          <img
            src="/img/memories/photo3.png"
            alt="Gauri, Nabi, Ashley, Alysha, Katie, Ashley, Kelly and Claire at a hiking spot"
            loading="lazy"
          />
        </Memory>
        <Memory>
          <video controls controlsList="nodownload">
            <source src="/img/memories/photos4.mp4" type="video/mp4" />
          </video>
        </Memory>
        <Memory>
          <img src="/img/memories/photo5.png" alt="" loading="lazy" />
        </Memory>
        <Memory>
          <img src="/img/memories/photo6.png" alt="" loading="lazy" />
        </Memory>
        <Memory>
          <img src="/img/memories/photo7.png" alt="" loading="lazy" />
        </Memory>
        <Memory>
          <img src="/img/memories/photo8.png" alt="" loading="lazy" />
        </Memory>
        <Memory>
          <img src="/img/memories/photo9.png" alt="" loading="lazy" />
        </Memory>
        <Memory>
          <img src="/img/memories/photo10.png" alt="" loading="lazy" />
        </Memory>
        <Memory>
          <img src="/img/memories/photo11.png" alt="" loading="lazy" />
        </Memory>
        <Memory>
          <img src="/img/memories/photo12.png" alt="" loading="lazy" />
        </Memory>
        <Memory>
          <img src="/img/memories/photo13.png" alt="" loading="lazy" />
        </Memory>
      </MemoriesContainer>
    </StyledHackSCMemories>
  );
}

const MemosHeaderH2 = styled(H2)`
  font-size: 4.25rem;
  font-weight: 600;
  color: #2b2b2b;
  text-align: center;
  margin-bottom: 5rem;
  @media (max-width: 1240px) {
    font-size: 3rem;
  }
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StyledHackSCMemories = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MemoriesContainer = styled.div`
  margin: 5vw 15vw;
  column-count: 4;
  column-gap: 10px;
  @media (max-width: 1920px) {
    column-count: 3;
  }
  @media (max-width: 1080px) {
    column-count: 2;
  }
  @media (max-width: 768px) {
    column-count: 1;
  }
`;

const Memory = styled.div`
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
  a {
    color: black;
    text-decoration: none;
  }
`;

export default HackSCMemories;
