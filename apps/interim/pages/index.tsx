import styled from 'styled-components';
import EmailNewsletterInputSection from '../components/email-newsletter-input-section/email-newsletter-input-section';
import FAQSection from '../components/faqsection/faqsection';
import ImageSection from '../components/imagesection/imagesection';
import { LogoAndSloganSection } from '../components/logo-and-slogan/logo-and-slogan';
import Navbar from '../components/navbar/navbar';
import TeamContactBlurbs from '../components/team-contact-blurbs/team-contact-blurbs';
import ThankYouText from '../components/thank-you-text/thank-you-text';

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
    </MainPageWrapper>
  );
}

export default Index;

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const FirstSection = styled.section`
  max-width: 30rem;
  margin-left: 6rem;
  margin-top: 6rem;
`;

const SecondSection = styled.section`
  margin-left: 6rem;
  max-width: 30rem;
`;
