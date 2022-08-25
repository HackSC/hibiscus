import { GradientSpan, H2, H3, Text } from '@hacksc-platforms/ui';
import Flippy, { BackSide, FrontSide } from 'react-flippy';
import styled from 'styled-components';
/* eslint-disable-next-line */
export interface TeamsProps {}

export function Teams(props: TeamsProps) {
  const data: {
    teamName: string;
    teamSlogan: string;
    backTitleElement: React.ReactNode;
    teamDescriptionElement: React.ReactNode;
  }[] = [
    {
      teamName: 'Engineering',
      teamSlogan: 'BUILD • EXECUTE • SHIP',
      backTitleElement: (
        <GradientSpan>
          The engineering team builds what our organization dreams up!
        </GradientSpan>
      ),
      teamDescriptionElement: `
        At HackSC, everyone is encouraged to be an innovative tech nomad
        who is passionate about using technology to create something
        awesome 🔮. Engineering has been an essential piece in creating
        scalable web platforms that help create a one-of-a-kind digital
        experience for hackers since our induction.
      `,
    },
    {
      teamName: 'Design',
      teamSlogan: 'THINK • INNOVATE • CREATE',
      backTitleElement: (
        <>
          <GradientSpan>
            Design team lies at the heart of what makes HackSC{' '}
          </GradientSpan>
          ✨<GradientSpan>pop</GradientSpan>✨<GradientSpan>.</GradientSpan>
        </>
      ),
      teamDescriptionElement: `
        We collaborate across teams to deliver what they need to
        flourish—whether that’s the Instagram page, the HackSC website,
        the sponsorship packets, the merch, and more. Our designers give
        hackers the opportunity to innovate, and we look good doing it.
      `,
    },
    {
      teamName: 'HackerXP',
      teamSlogan: 'ENGAGE • PLAN • COLLABORATE',
      backTitleElement: (
        <GradientSpan>
          Unforgettable events, brought to you by our HackerXP team!
        </GradientSpan>
      ),
      teamDescriptionElement: `
        Team members reach out to candidates for keynote speakers.
        Additionally, they gain practical expertise in designing and
        organizing events like the HackSC concert, the hacker-favorite
        puppy pen, and others. The role allows members to try a little bit
        of everything as they collaborate with various divisions of the
        org!
      `,
    },
    {
      teamName: 'Sponsorship',
      teamSlogan: 'OUTREACH • CONNECT • INTERFACE',
      backTitleElement: (
        <GradientSpan>
          Sponsorship is all about raising the funds that make HackSC possible.
        </GradientSpan>
      ),
      teamDescriptionElement: `
        As a sponsorship team member, you will be reaching out to potential
        sponsors, networking with professionals in the tech space, and helping 
        put together the best experience possible for our sponsors at HackSC 23. 
        If you’re interested in exploring the tech sector more and enjoy talking
        to people, this is a great fit for you.
      `,
    },
    {
      teamName: 'Marketing',
      teamSlogan: 'ATTRACT • PLAN • COLLABORATE',
      backTitleElement: (
        <>
          <GradientSpan>
            Marketing wants to share with the world what HackSC is all about!
          </GradientSpan>
        </>
      ),
      teamDescriptionElement: `
        HackSC’s Marketing Team is looking for individuals who are
        passionate about social media creation & management, digital
        marketing, and aesthetics, and those who are driven to strategize
        and execute creative campaigns for an amazing hackathon! The
        Marketing Team works closely with our Engineering and Design team.
      `,
    },
    {
      teamName: 'Operations',
      teamSlogan: 'COORDINATE • LEAD • EXECUTE',
      backTitleElement: (
        <GradientSpan>
          Behind-the-scenes of SoCal&apos;s most student loved events!
        </GradientSpan>
      ),
      teamDescriptionElement: `
        Our team manages HackSC’s generous budget and coordinates venue
        bookings, security, staffing, catering, communications, and any
        other logistical needs requested by our internal teams for all
        events. If you are passionate about leadership, business,
        outreach, and/or event management, we want you to join our
        fast-paced and mission-critical team!
      `,
    },
  ];

  return (
    <StyledTeams>
      <TeamsHeaderH2>Our Teams</TeamsHeaderH2>
      <GrayParagraph>
        Click on any card to learn more about each team
      </GrayParagraph>
      {[0, 2, 4].map((i) => (
        <TeamsContainer key={i}>
          {data
            .slice(i, i + 2)
            .map(
              (
                {
                  teamName,
                  teamSlogan,
                  backTitleElement,
                  teamDescriptionElement,
                },
                index
              ) => (
                <StyledFlippy
                  flipOnHover={false}
                  flipOnClick={true}
                  flipDirection="horizontal"
                  key={index}
                >
                  <FlipFront
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
                  >
                    <StyledH2TeamName>
                      <GradientSpan>{teamName}</GradientSpan>
                    </StyledH2TeamName>
                    <TeamSlogan>{teamSlogan}</TeamSlogan>
                  </FlipFront>
                  <FlipBack
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
                  >
                    <StyledH3BackTitle>
                      <GradientSpan>{backTitleElement}</GradientSpan>
                    </StyledH3BackTitle>
                    <TeamDescription>{teamDescriptionElement}</TeamDescription>
                  </FlipBack>
                </StyledFlippy>
              )
            )}
        </TeamsContainer>
      ))}
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
  margin-top: 2rem;
  justify-content: center;
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
  cursor: pointer;
  @media (max-width: 1440px) {
    height: 20vw;
    width: 37vw;
  }
  @media (max-width: 1240px) {
    height: 25vw;
    width: 37vw;
  }
  @media (max-width: 1080px) {
    height: 40vw;
    width: 70vw;
  }
  @media (max-width: 600px) {
    min-height: 90vw;
  }
`;

const StyledH2TeamName = styled(H2)`
  font-size: 4.5rem;
  text-align: center;
  @media (max-width: 1440px) {
    font-size: 2.5rem;
  }
  @media (max-width: 400px) {
    font-size: 2rem;
  }
`;

const StyledH3BackTitle = styled(H3)`
  font-size: 1.5rem;
  text-align: left;
  padding: 0 1rem;
  @media (max-width: 1440px) {
    padding: 0 0.6rem;
    font-size: 1.25rem;
  }
  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;

const TeamSlogan = styled(Text)`
  font-weight: 400;
  color: #2b2b2b;
  margin: 10px 3px;
  font-size: 1.75rem;
  font-style: italic;
  text-align: center;
  @media (max-width: 1440px) {
    font-size: 1.25rem;
  }
`;

const TeamDescription = styled(Text)`
  font-weight: 400;
  color: #2b2b2b;
  margin: 10px 3px;
  font-size: 1.2rem;
  line-height: 1.4;
  padding: 0 1.25rem;
  @media (max-width: 1440px) {
    font-size: 0.95rem;
  }
  @media (max-width: 1440px) {
    font-size: 0.93rem;
  }
  @media (max-width: 1080px) {
    font-size: 1rem;
  }
  @media (max-width: 425px) {
    padding: 0 0.6rem;
    font-size: 0.6rem;
  }
`;

const TeamsHeaderH2 = styled(H2)`
  font-size: 4.25rem;
  font-weight: 600;
  color: #2b2b2b;
  text-align: center;

  @media (max-width: 1440px) {
    font-size: 3rem;
  }
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const GrayParagraph = styled(Text)`
  font-weight: 400;
  color: #939393;
  margin: 10px 3px;
  font-size: 1.2rem;
  @media (max-width: 1440px) {
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  @media (max-width: 400px) {
    font-size: 0.6rem;
  }
`;
