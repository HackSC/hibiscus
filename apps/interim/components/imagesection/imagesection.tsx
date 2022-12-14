import Image from 'next/image';
import styled from 'styled-components';

export default function ImageSection() {
  return (
    <div style={{ zIndex: -1 }}>
      <DesktopImage>
        <Image
          alt="HackSC Logo Background"
          src="/img/light-desktop-bg.svg"
          fill
          quality={100}
        />
      </DesktopImage>
      <MobileImage>
        {/* <Image
        alt="HackSC Logo Background"
        src="/img/light-mobile-bg.svg"
        layout="fixed"
        objectFit="fill"
        height="100vh"
        width="100vw"
      /> */}
        {/* was trying out something and it didn't work out
          either way this code is not being used at the moment
          just leaving it here for future use and reference
      */}
      </MobileImage>
    </div>
  );
}

const DesktopImage = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  top: 0;
  left: 0;
  display: flex;
  touch-action: auto;
  @media only screen and (max-width: 1080px) {
    display: none !important;
    touch-action: none !important;
  }
`;

const MobileImage = styled.div`
  /* position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  top: 0;
  left: 0; */
  /*  */
`;
