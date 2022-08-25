/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { TrademarkColors } from '@hacksc-platforms/styles';
import { GradientSpan, H1, H3 } from '@hacksc-platforms/ui';
/* eslint-disable-next-line */
export interface HeroProps {}

export function Hero(props: HeroProps) {
  return (
    <StyledHero>
      <LeftSection>
        <LogoH1>Student</LogoH1>
        <LogoH1>
          <GradientSpan>Powered</GradientSpan>.
        </LogoH1>
        <Container>
          <HeroText>
            At <GradientSpan>HackSC</GradientSpan>, we encourage team members to
            work on other team projects that they feel strongly about and that
            will help develop their skills. If you’re passionate and eager to
            learn, <GradientSpan>we want you on our team</GradientSpan>!
          </HeroText>
        </Container>
        <a
          href="https://forms.gle/43M1FgCydFhFJerCA"
          rel="noreferrer"
          target="_blank"
        >
          <GradientButton type="submit">APPLY NOW</GradientButton>
        </a>
      </LeftSection>
      <RightSection>
        <img src="/img/lightbulb.png" alt="Light Bulb" />
      </RightSection>
    </StyledHero>
  );
}

export default Hero;

const StyledHero = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 2rem;
  margin-left: 2rem;
  margin-top: 17rem;
  @media (max-width: 1080px) {
    margin-top: 7rem;
    margin-left: 0;
    flex-direction: column;
  }
`;
const LeftSection = styled.div`
  flex-basis: 60%;
`;
const RightSection = styled.div`
  flex-basis: 30%;
  @media (max-width: 1080px) {
    margin-top: 5rem;
  }
  > img {
    width: 27vw;
    height: 27vw;
    @media (max-width: 1240px) {
      width: 30vw;
      height: 30vw;
    }
    @media (max-width: 1080px) {
      width: 60vw;
      height: 60vw;
    }
  }
`;

const GradientButton = styled.button`
  background: linear-gradient(
    90deg,
    ${TrademarkColors.LIGHT_BLUE} 0%,
    ${TrademarkColors.LIGHT_PURPLE} 100%
  );
  border: none;
  padding: 12px 10px;
  color: white;
  font-weight: 700;
  border-radius: 0.3rem;
  box-shadow: 0px 2px 10px -1px #a0a0a0;
  font-size: 1.1rem;
  cursor: pointer;
  min-width: 20%;

  :hover {
    transform: scale(1.1);
    transition: all 0.2s ease-in-out;
  }

  @media (max-width: 1080px) {
    width: 100%;
    margin-top: 20px;
  }
`;

const LogoH1 = styled(H1)`
  padding: 1rem 0 0;
  letter-spacing: -3px;
  font-size: 6rem;
  font-weight: 600;
  color: #2b2b2b;

  @media (max-width: 1440px) {
    padding-top: 1rem;
  }

  @media (max-width: 768px) {
    padding-top: 1rem;
    font-size: 4rem;
  }
`;

const Container = styled.div`
  margin: 3rem 0 4rem 0;
`;

const HeroText = styled(H3)`
  max-width: 35rem;
  font-weight: 400;
  font-size: 1.3rem;
  color: #2b2b2b;

  @media (max-width: 500px) {
    font-size: 1.25rem;
  }
`;
