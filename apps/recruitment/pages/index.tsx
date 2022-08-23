import styled from 'styled-components';
import Hero from '../components/hero/hero';
import Teams from '../components/teams/teams';
import StudentXP from '../components/studentxp/studentxp';
import Footer from '../components/footer/footer';
import Navbar from '../components/navbar/navbar';
import AlumDestinations from '../components/alum-destinations/alum-destinations';
import HackSCMemories from '../components/hacksc-memories/hacksc-memories';

export function Index() {
  return (
    <MainPageWrapper>
      <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
      <HeroSection>
        <Hero />
      </HeroSection>
      <TeamsSection>
        <Teams />
      </TeamsSection>
      <StudentXPSection>
        <StudentXP />
      </StudentXPSection>
      <AlumDestSection>
        <AlumDestinations />
      </AlumDestSection>
      <HackSCMemoriesSection>
        <HackSCMemories />
      </HackSCMemoriesSection>
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
  @media screen and (max-width: 610px) {
    background-image: url('img/light-narrow-mobile-bg.svg');
  }
`;

const NavbarWrapper = styled.div`
  padding-top: 2rem;
  display: flex;
  justify-content: center;
`;

const HeroSection = styled.section`
  margin: 0 0 0 4rem;
  padding: 0 0 0 3.25rem;

  @media (max-width: 1280px) {
    margin: 0 2rem 0 4vw;
  }

  @media (max-width: 1080px) {
    margin: 0 0 0 4vw;
  }

  @media (min-width: 768px) and (max-width: 800px) {
    padding-top: 0;
    margin-inline: auto;
  }
  @media (max-width: 320px) {
    padding-left: 0.5rem;
    margin-left: 0.25rem;
  }
`;

const TeamsSection = styled.section`
  margin: auto;
  padding-top: 10rem;
`;

const StudentXPSection = styled.section`
  margin: auto;
  padding-top: 10rem;
`;

const AlumDestSection = styled.section`
  margin: auto;
  padding-top: 10rem;
`;

const HackSCMemoriesSection = styled.section`
  margin: auto;
  padding-top: 10rem;
`;

const FooterContainer = styled.div`
  padding: 0;
  position: relative;
  bottom: 0;
`;
