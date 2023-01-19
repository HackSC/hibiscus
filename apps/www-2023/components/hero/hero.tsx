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
    artboard: 'hero',
    stateMachines: ['time', 'press', 'device'],

    layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
  });
  const deviceInput = useStateMachineInput(rive, 'device', 'devicenum', 1);
  const timeInput = useStateMachineInput(rive, 'time', 'timer');
  const pressInput = useStateMachineInput(rive, 'press', 'buttonp');
  return (
    <StyledHero>
      <RiveComponent />
    </StyledHero>
  );
}

export default Hero;
