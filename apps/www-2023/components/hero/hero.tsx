import styled from 'styled-components';
import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from '@rive-app/react-canvas';
import { useResizeDetector } from 'react-resize-detector';
import { useState, useEffect } from 'react';
/* eslint-disable-next-line */
export interface HeroProps {}

const getModeFromScreenWidth = (width: number) => {
  if (width >= 1600) {
    return 1;
  } else if (width >= 1440 && width < 1600) {
    return 2;
  } else if (width >= 1024 && width < 1440) {
    return 3;
  } else if (width >= 768 && width < 1024) {
    return 4;
  } else if (width >= 400 && width < 768) {
    return 5;
  } else if (width >= 330 && width < 400) {
    return 6;
  } else if (width < 330) {
    return 7;
  } else {
    return 0;
  }
};

function useScreenWidth() {
  const { width, ref } = useResizeDetector();
  const [mode, setMode] = useState(1);

  useEffect(() => {
    setMode(getModeFromScreenWidth(width));
  }, [width]);

  return { mode, ref };
}

const StyledHero = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export function Hero(props: HeroProps) {
  const { mode: screenWidth, ref } = useScreenWidth();
  const { rive, RiveComponent } = useRive({
    src: './img/graphics/hacksc.riv',
    autoplay: true,
    artboard: 'hero',
    stateMachines: ['time', 'device'],

    layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
  });
  const deviceInput = useStateMachineInput(
    rive,
    'device',
    'devicenum',
    screenWidth
  );
  const timeInput = useStateMachineInput(rive, 'time', 'timer');
  return (
    <StyledHero ref={ref}>
      <RiveComponent />
    </StyledHero>
  );
}

export default Hero;
