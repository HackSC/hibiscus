import styled from 'styled-components';

/* eslint-disable-next-line */
export interface HeroProps {}

const StyledHero = styled.div`
  color: pink;
`;

export function Hero(props: HeroProps) {
  return (
    <StyledHero>
      <h1>Welcome to Hero!</h1>
    </StyledHero>
  );
}

export default Hero;
