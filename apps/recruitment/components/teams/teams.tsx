import { GradientSpan, H2, H3, Text } from '@hacksc-platforms/ui';
import Flippy, { BackSide, FrontSide } from 'react-flippy';
import styled from 'styled-components';
/* eslint-disable-next-line */
export interface TeamsProps {}

export function Teams(props: TeamsProps) {
  return (
    <StyledTeams>
      <TeamsHeaderH2>Our Teams</TeamsHeaderH2>
      <GrayParagraph>
        Click on any card to learn more about each team!
      </GrayParagraph>
      <TeamsContainer>
        <StyledFlippy
          flipOnHover={false}
          flipOnClick={true}
          flipDirection="horizontal"
        >
          <FlipFront style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
            <StyledH2>
              <GradientSpan>Engineering</GradientSpan>
            </StyledH2>
            <TeamSlogan>BUILD • EXECUTE • SHIP</TeamSlogan>
          </FlipFront>
          <FlipBack style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
            <StyledH3>
              <GradientSpan>
                The engineering team builds what our organization dreams️ up!
              </GradientSpan>
            </StyledH3>
            <TeamDescription>
              At HackSC, we value the hacker culture—after all, we’re organizing
              a hackathon, and even as an organizer, everyone is encouraged to
              be an innovative tech nomad who’s passionate about using
              technology to create something awesome 🔮 Our Engineering team has
              been an essential piece in creating scalable web platforms that
              help create a one-of-a-kind digital experience for hackers since
              our induction.
            </TeamDescription>
          </FlipBack>
        </StyledFlippy>
        <StyledFlippy
          flipOnHover={false}
          flipOnClick={true}
          flipDirection="horizontal"
        >
          <FlipFront style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
            <StyledH2>
              <GradientSpan>Design</GradientSpan>
            </StyledH2>
            <TeamSlogan>THINK • INNOVATE • CREATE</TeamSlogan>
          </FlipFront>
          <FlipBack style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
            <StyledH3>
              <GradientSpan>
                Design team lies at the heart of what makes HackSC{' '}
              </GradientSpan>
              ✨<GradientSpan>pop</GradientSpan>✨<GradientSpan>.</GradientSpan>
            </StyledH3>
            <TeamDescription>
              We collaborate across teams to deliver what they need to
              flourish—whether that’s the Instagram page, the HackSC website,
              the sponsorship packets, the merch, and more. Our designers give
              hackers the opportunity to innovate, and we look good doing it.
            </TeamDescription>
          </FlipBack>
        </StyledFlippy>
      </TeamsContainer>
      <TeamsContainer>
        <StyledFlippy
          flipOnHover={false}
          flipOnClick={true}
          flipDirection="horizontal"
        >
          <FlipFront style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
            <StyledH2>
              <GradientSpan>HackerXP</GradientSpan>
            </StyledH2>
            <TeamSlogan>ENGAGE • PLAN • COLLABORATE</TeamSlogan>
          </FlipFront>
          <FlipBack style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
            <StyledH3>
              <GradientSpan>
                Our HackerXP team provides our hackers with an unforgettable
                experience by putting on fun events throughout the hackathon.
              </GradientSpan>
            </StyledH3>
            <TeamDescription>
              Team members reach out to candidates for keynote speakers.
              Additionally, they gain practical expertise in designing and
              organizing events like the HackSC concert, the hacker-favorite
              puppy pen, and others. The role allows members to try a little bit
              of everything as they collaborate with various divisions of the
              org!
            </TeamDescription>
          </FlipBack>
        </StyledFlippy>
        <StyledFlippy
          flipOnHover={false}
          flipOnClick={true}
          flipDirection="horizontal"
        >
          <FlipFront style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
            <StyledH2>
              <GradientSpan>Sponsorship</GradientSpan>
            </StyledH2>
            <TeamSlogan>CONNECT • COMMUNICATE • COORDINATE</TeamSlogan>
          </FlipFront>
          <FlipBack style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
            <StyledH3>
              <GradientSpan>
                The HackSC Sponsorship team is all about getting the sponsors
                and funds that make HackSC possible.
              </GradientSpan>
            </StyledH3>
            <TeamDescription>
              Team members reach out to candidates for keynote speakers.
              Additionally, they gain practical expertise in designing and
              organizing events like the HackSC concert, the hacker-favorite
              puppy pen, and others. The role allows members to try a little bit
              of everything as they collaborate with various divisions of the
              org!
            </TeamDescription>
          </FlipBack>
        </StyledFlippy>
      </TeamsContainer>
      <TeamsContainer>
        <StyledFlippy
          flipOnHover={false}
          flipOnClick={true}
          flipDirection="horizontal"
        >
          <FlipFront style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
            <StyledH2>
              <GradientSpan>Marketing</GradientSpan>
            </StyledH2>
            <TeamSlogan>ATTRACT • PLAN • COLLABORATE</TeamSlogan>
          </FlipFront>
          <FlipBack style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
            <StyledH3>
              <GradientSpan>
                We are Marketers. Designers. Writers. Engineers & all of the
                above.
              </GradientSpan>
            </StyledH3>
            <TeamDescription>
              HackSC’s Marketing Team is looking for individuals who are
              passionate about social media creation & management, digital
              marketing, and aesthetics, and those who are driven to strategize
              and execute creative campaigns for an amazing hackathon! The
              Marketing Team is at the core of the organization—working closely
              with our Engineering and Design team. If you have a diverse
              outreach skill set, this is the place for you.
            </TeamDescription>
          </FlipBack>
        </StyledFlippy>
        <StyledFlippy
          flipOnHover={false}
          flipOnClick={true}
          flipDirection="horizontal"
        >
          <FlipFront style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
            <StyledH2>
              <GradientSpan>Logistics</GradientSpan>
            </StyledH2>
            <TeamSlogan>CONNECT • COMMUNICATE • COORDINATE</TeamSlogan>
          </FlipFront>
          <FlipBack style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
            <StyledH3>
              <GradientSpan>
                HackSC’s operations team is responsible for coordinating
                everything behind-the-scenes at our student-loved events.
              </GradientSpan>
            </StyledH3>
            <TeamDescription>
              Our team manages HackSC’s generous budget and coordinates venue
              bookings, security, staffing, catering, communications, and any
              other logistical needs requested by our internal teams for all
              events. If you are passionate about leadership, business,
              outreach, and/or event management, we want you to join our
              fast-paced and mission-critical team!
            </TeamDescription>
          </FlipBack>
        </StyledFlippy>
      </TeamsContainer>
    </StyledTeams>
  );
}

export default Teams;

const StyledTeams = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamsContainer = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 1080px) {
    flex-direction: column;
  }
`;

const FlipFront = styled(FrontSide)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 20px;
  border: 2px white solid;
`;

const FlipBack = styled(BackSide)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 20px;
  border: 2px white solid;
`;

const StyledFlippy = styled(Flippy)`
  height: 25vw;
  width: 40vw;
  border-radius: 20px;
  margin: 2rem 2rem 0 2rem;
  @media (max-width: 1080px) {
    height: 40vw;
    width: 80vw;
  }
`;

const StyledH2 = styled(H2)`
  font-size: 4.5rem;
  text-align: center;
  @media (max-width: 1240px) {
    font-size: 3rem;
  }
`;

const StyledH3 = styled(H3)`
  font-size: 1.5rem;
  text-align: center;
  @media (max-width: 1240px) {
    font-size: 1.5rem;
  }
`;

const TeamSlogan = styled(Text)`
  font-weight: 400;
  color: #2b2b2b;
  margin: 10px 3px;
  font-size: 1.75rem;
  font-style: italic;
  text-align: center;
  @media (max-width: 1240px) {
    font-size: 1.25rem;
  }
`;

const TeamDescription = styled(Text)`
  font-weight: 400;
  color: #2b2b2b;
  margin: 10px 3px;
  font-size: 1.2rem;
  line-height: 1.4;
  @media (max-width: 1240px) {
    font-size: 1rem;
  }
  @media (max-width: 425px) {
    font-size: 0.5rem;
  }
`;

const TeamsHeaderH2 = styled(H2)`
  font-size: 4.25rem;
  font-weight: 600;
  color: #2b2b2b;
  text-align: center;

  @media (max-width: 1080px) {
    font-size: 3.5rem;
  }
  @media (max-width: 768px) {
    font-size: 2.75rem;
  }
`;

const GrayParagraph = styled(Text)`
  font-weight: 400;
  color: #939393;
  margin: 10px 3px;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;
