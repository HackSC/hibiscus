import styled from 'styled-components';
import EmailNewsletterInputSection from '../components/email-newsletter-input-section/email-newsletter-input-section';
import FAQSection from '../components/faqsection/faqsection';
import Footer from '../components/footer/footer';
import { LogoAndSloganSection } from '../components/logo-and-slogan/logo-and-slogan';
import Navbar from '../components/navbar/navbar';
import TeamContactBlurbs from '../components/team-contact-blurbs/team-contact-blurbs';
import ThankYouText from '../components/thank-you-text/thank-you-text';

export function Index() {
  return (
    <MainPageWrapper>
      <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
      <FirstSection>
        <LogoAndSloganSection />
        <ThankYouText nextYear={2023} />
        <EmailNewsletterInputSection />
        <TeamContactBlurbs />
      </FirstSection>
      <SecondSection>
        <FAQSection />
      </SecondSection>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </MainPageWrapper>
  );
}

export default Index;

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background-image: url('/img/light-desktop-bg.svg');
  background-position: fixed;
  background-attachment: local;
  background-repeat: no-repeat;
  background-size: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  @media screen and (max-width: 1080px) {
    background-image: url('img/light-mobile-bg.svg');
  }
`;

const NavbarWrapper = styled.div`
  padding-top: 2rem;
  display: flex;
  justify-content: center;
`;

const FirstSection = styled.section`
  max-width: 40rem;
  margin: 6rem 4rem 0 4rem;
  padding: 3.25rem 0 0 3.25rem;

  @media (max-width: 1080px) {
    margin: 50vw 3rem 0 4vw;
  }

  @media (min-width: 768px) and (max-width: 800px) {
    padding-top: 5rem;
    margin-inline: auto;
  }
`;

const SecondSection = styled.section`
  margin-top: 3rem;
  margin-bottom: 3rem;
  margin-left: 5rem;
  max-width: 100vw;
  padding: 4.5rem 0 0 2.5rem;

  @media (max-width: 1080px) {
    margin-left: 6rem;
    margin-right: 3rem;
    padding: 0;
  }

  @media (max-width: 425px) {
    margin-right: 0;
    padding: 0;
  }
`;

const FooterContainer = styled.div`
  padding: 0;
`;
