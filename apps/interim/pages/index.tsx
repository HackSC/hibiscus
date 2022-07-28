import styled from 'styled-components';
import EmailNewsletterInputSection from '../components/email-newsletter-input-section/email-newsletter-input-section';
import FAQSection from '../components/faqsection/faqsection';
import { LogoAndSloganSection } from '../components/logo-and-slogan/logo-and-slogan';
import Navbar from '../components/navbar/navbar';
import TeamContactBlurbs from '../components/team-contact-blurbs/team-contact-blurbs';
import ThankYouText from '../components/thank-you-text/thank-you-text';
import Footer from '../components/footer/footer';

export function Index() {
  return (
    <MainPageWrapper>
      {/* <ImageSection /> */}
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
  margin: 6rem 4rem 0 6rem;
  padding: 3.25rem 0 0 3.25rem;
  @media (max-width: 1080px) {
    margin-top: 50vw;
    margin-left: 4vw;
    margin-right: 3rem;
  }
`;

const SecondSection = styled.section`
  margin-top: 3rem;
  margin-bottom: 3rem;
  margin-left: 6rem;
  max-width: 100vw;
  padding: 4.5rem 0 0 3.5rem;
  @media (max-width: 1080px) {
    margin-left: 5vw;
    margin-right: 3rem;
  }
`;

const FooterContainer = styled.div`
  padding: 0;
`;
