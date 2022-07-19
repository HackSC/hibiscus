import styled from 'styled-components';
import EmailNewsletterInputSection from '../components/email-newsletter-input-section/email-newsletter-input-section';
import FAQSection from '../components/faqsection/faqsection';
import ImageSection from '../components/imagesection/imagesection';
import { LogoAndSloganSection } from '../components/logo-and-slogan/logo-and-slogan';
import Navbar from '../components/navbar/navbar';
import TeamContactBlurbs from '../components/team-contact-blurbs/team-contact-blurbs';
import ThankYouText from '../components/thank-you-text/thank-you-text';
import Footer from '../components/footer/footer';

export function Index() {
  return (
    <MainPageWrapper>
      <ImageSection />
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
      <Footer />
    </MainPageWrapper>
  );
}

export default Index;

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    width: 85vw;
  }
`;

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const FirstSection = styled.section`
  max-width: 40rem;
  margin: 6rem 4rem 0 6rem;

  @media (max-width: 600px) {
    margin-left: 3rem;
    margin-right: 0;
  }
`;

const SecondSection = styled.section`
  margin-top: 3rem;
  margin-left: 6rem;
  max-width: 30rem;

  @media (max-width: 600px) {
    margin-left: 3rem;
  }
`;
