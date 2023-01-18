import styled from 'styled-components';
import Rive, {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from '@rive-app/react-canvas';

/* eslint-disable-next-line */
export interface HeroProps {}

const StyledHero = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export function Hero(props: HeroProps) {
  const { rive, RiveComponent } = useRive({
    src: './img/graphics/hacksc.riv',
    autoplay: true,
    artboard: 'HackSC-Hero',
    stateMachines: 'time',
    onStateChange: (button) => {
      window.location.assign('https://dashboard.hacksc.com/apply-2023');
    },
    layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
  });

  const timeInput = useStateMachineInput(rive, 'trigger');
  return (
    <StyledHero>
      <RiveComponent />
    </StyledHero>
  );
}

export default Hero;
