import styled from 'styled-components';
import Navbar from '../components/navbar/navbar';
import Hero from '../components/hero/hero';
import Topic from '../components/topic/topic';
import Verticals from '../components/verticals/verticals';
import SolutionChallenge from '../components/solution-challenge/solution-challenge';
import Speakers from '../components/speakers/speakers';
import Sponsors from '../components/sponsors/sponsors';
import FAQs from '../components/faqs/faqs';
import Footer from '../components/footer/footer';

export function Index() {
  return (
    <MainPageWrapper>
      <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
      <HeroSection>
        <Hero />
        <Topic />
      </HeroSection>
      <VerticalsSection>
        <Verticals />
        <SolutionChallenge />
      </VerticalsSection>
      <SpeakerSection>
        <Speakers />
      </SpeakerSection>
      <SponsorSection>
        <Sponsors />
      </SponsorSection>
      <FAQSection>
        <FAQs />
      </FAQSection>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </MainPageWrapper>
  );
}

export default Index;

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const HeroSection = styled.div``;

const VerticalsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;

const SpeakerSection = styled.div`
  height: 55vw;
  @media (max-width: 800px) {
    height: 155vw;
  }
`;

const SponsorSection = styled.div``;

const FAQSection = styled.div``;

const FooterWrapper = styled.div`
  width: 100%;
  left: 0;
  padding: 0;
  position: relative;
  bottom: 0;
`;
