import { GradientSpan, H2, H3, Text } from '@hibiscus/ui';
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
        <>
          <GradientSpan>
            The engineering team builds what our organization dreams up{' '}
          </GradientSpan>
          💭<GradientSpan>!</GradientSpan>
        </>
      ),
      teamDescriptionElement: `
        The Engineering Team is a group of innovative tech nomads passionate
        about using technology to create something awesome 🔮, 
        after all, we’re organizing a hackathon. Our team is an essential 
        piece in creating scalable web platforms that help create a one-of-a-kind 
        digital experience for hackers!
      `,
    },
    {
      teamName: 'Design',
      teamSlogan: 'THINK • INNOVATE • CREATE',
      backTitleElement: (
        <>
          <GradientSpan>
            Design team lies at the heart of what makes HackSC pop
          </GradientSpan>
          ✨<GradientSpan>.</GradientSpan>
        </>
      ),
      teamDescriptionElement: `
        The Design Team collaborates and delivers the tools that other teams need 
        to flourish. Our designers combine brand standards, color theory 🎨, 
        graphic elements, and typography to make a measurable impact on our global 
        audience. They give hackers the opportunity to innovate and look good doing it!
      `,
    },
    {
      teamName: 'HackerXP',
      teamSlogan: 'ENGAGE • PLAN • COLLABORATE',
      backTitleElement: (
        <>
          <GradientSpan>
            Unforgettable events, brought to you by our HackerXP team
          </GradientSpan>
          🎊<GradientSpan>.</GradientSpan>
        </>
      ),
      teamDescriptionElement: `
        The HackerXP Team provides our hackers with a fun and unforgettable experience. 
        Members of our team select the speakers, prizes, and plan fun events like the 
        hacker-favorite puppy pen 🐶, and more. Our team gets to try a little bit 
        of everything as they collaborate with various divisions of the org!
      `,
    },
    {
      teamName: 'Sponsorship',
      teamSlogan: 'OUTREACH • CONNECT • INTERFACE',
      backTitleElement: (
        <>
          <GradientSpan>
            Sponsorship is all about raising the funds that make HackSC possible
          </GradientSpan>
          💸<GradientSpan>.</GradientSpan>
        </>
      ),
      teamDescriptionElement: `
        The HackSC Sponsorship provides funding for our hackathon, reaching out to 
        potential sponsors, networking 💼 with professionals in the tech 
        space, and put together the best experience for our sponsors. If you’re 
        interested in exploring the tech sector more and enjoy talking to people, 
        this is a great fit for you!
      `,
    },
    {
      teamName: 'Marketing',
      teamSlogan: 'ATTRACT • PLAN • COLLABORATE',
      backTitleElement: (
        <>
          <GradientSpan>
            Marketing wants to share with the world what HackSC is all about
          </GradientSpan>
          📢<GradientSpan>!</GradientSpan>
        </>
      ),
      teamDescriptionElement: `
        The Marketing Team is at the core of HackSC, working with other teams on 
        social media creation & management, digital marketing, aesthetics, writing, 
        photography 📸, and even executing creative campaigns for 
        an amazing hackathon! If you have a diverse outreach skill set, this is the 
        place for you!
      `,
    },
    {
      teamName: 'Operations',
      teamSlogan: 'COORDINATE • LEAD • EXECUTE',
      backTitleElement: (
        <>
          <GradientSpan>
            Behind-the-scenes of SoCal&apos;s most student loved events
          </GradientSpan>
          🗃️<GradientSpan>!</GradientSpan>
        </>
      ),
      teamDescriptionElement: `
        The Operations Team is responsible for the day-of logistics of the event. We 
        coordinate venues, budget, and other operations. If you’re interested in 
        learning more about operations management 📋 or the business side of events - 
        then our team is for you. Join us and become a part of why HackSC runs without 
        a hitch!
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
                    <StyledH3BackTitle>{backTitleElement}</StyledH3BackTitle>
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
