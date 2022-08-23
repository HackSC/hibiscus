import styled from 'styled-components';
import { H2 } from '@hacksc-platforms/ui';
import Image from 'next/image';

/* eslint-disable-next-line */
export interface HackSCMemoriesProps {}

export function HackSCMemories(props: HackSCMemoriesProps) {
  return (
    <StyledHackSCMemories>
      <MemosHeaderH2>HackSC Memories</MemosHeaderH2>
      <PhotoGrid1>
        <PhotoGrid1_1>
          <PhotoGrid1_1_1>
            <PhotoGrid1_1_1_1>
              <Image
                src="/img/memories/photo1.1.1.1.png"
                alt="Instagram Reel"
                width="450vw"
                height="300vw"
                objectFit="contain"
              />
            </PhotoGrid1_1_1_1>
            <PhotoGrid1_1_1_2>
              <Image
                src="/img/memories/photo1.1.1.2.png"
                alt="Instagram Reel"
                width="450vw"
                height="300vw"
                objectFit="contain"
              />
            </PhotoGrid1_1_1_2>
          </PhotoGrid1_1_1>
          <PhotoGrid1_1_2>
            <Image
              src="/img/memories/photo1.1.2.png"
              alt="Instagram Reel"
              width="1000vw"
              height="700vw"
              objectFit="contain"
            />
          </PhotoGrid1_1_2>
        </PhotoGrid1_1>
        <PhotoGrid1_2>
          <video controls controlsList="nodownload">
            <source src="/img/memories/photos1.2.mp4" type="video/mp4" />
          </video>
        </PhotoGrid1_2>
      </PhotoGrid1>
      <PhotoGrid2></PhotoGrid2>
      <PhotoGrid3>
        <PhotoGrid3_1>
          <PhotoGrid3_1_1>
            <Image
              src="/img/memories/photo3.1.1.png"
              alt="Instagram Reel"
              width="575vw"
              height="325vw"
              objectFit="contain"
            />
          </PhotoGrid3_1_1>
          <PhotoGrid3_1_2>
            <Image
              src="/img/memories/photo3.1.2.png"
              alt="Instagram Reel"
              width="575vw"
              height="325vw"
              objectFit="contain"
            />
          </PhotoGrid3_1_2>
        </PhotoGrid3_1>
        <PhotoGrid3_2>
          <Image
            src="/img/memories/photo3.2.png"
            alt="Instagram Reel"
            width="800vw"
            height="725vw"
            objectFit="contain"
          />
        </PhotoGrid3_2>
      </PhotoGrid3>
    </StyledHackSCMemories>
  );
}

const MemosHeaderH2 = styled(H2)`
  font-size: 4.25rem;
  font-weight: 600;
  color: #2b2b2b;
  text-align: center;
  margin-bottom: 5rem;
  @media (max-width: 1080px) {
    font-size: 3.5rem;
  }
  @media (max-width: 768px) {
    font-size: 2.75rem;
  }
`;

const StyledHackSCMemories = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PhotoGrid1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 5rem;
  justify-content: space-around;
  @media (max-width: 1080px) {
    margin: 0 4rem;
    flex-direction: column;
  }
`;
const PhotoGrid1_1 = styled.div`
  flex-basis: 55%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const PhotoGrid1_1_1 = styled.div`
  flex-basis: 40%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const PhotoGrid1_1_1_1 = styled.div`
  flex-basis: 47.5%;
  justify-content: flex-start;
`;
const PhotoGrid1_1_1_2 = styled.div`
  flex-basis: 47.5%;
  justify-content: flex-end;
`;
const PhotoGrid1_1_2 = styled.div`
  flex-basis: 60%;
`;
const PhotoGrid1_2 = styled.div`
  flex-basis: 40%;
  @media (max-width: 1080px) {
    flex-basis: 45%;
  }
`;

const PhotoGrid2 = styled.div``;

const PhotoGrid3 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 5rem;
  justify-content: space-around;
  @media (max-width: 1080px) {
    margin: 0 4rem;
    flex-direction: column;
  }
`;
const PhotoGrid3_1 = styled.div`
  flex-basis: 45%;
  display: flex;
  flex-direction: column;
`;
const PhotoGrid3_1_1 = styled.div`
  flex-basis: 50%;
  justify-content: flex-start;
`;
const PhotoGrid3_1_2 = styled.div`
  flex-basis: 50%;
  justify-content: flex-end;
`;
const PhotoGrid3_2 = styled.div`
  flex-basis: 55%;
  @media (max-width: 1080px) {
    flex-basis: 60%;
  }
`;

export default HackSCMemories;
