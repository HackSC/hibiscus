/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { TrademarkColors } from '@hacksc-platforms/styles';
import { H2, Text, GradientSpan } from '@hacksc-platforms/ui';

/* eslint-disable-next-line */
export interface StudentXPProps {}

export function StudentXP(props: StudentXPProps) {
  return (
    <StyledStudentXP>
      <XPHeaderH2>Student Experiences</XPHeaderH2>
      <Slider>
        <Slides>
          <Slide>
            <Photo>
              <img src="/img/studentxp/katie.png" alt="Katie Wong" />
            </Photo>
            <Testimonial>
              <StyledText>
                My favorite memory of HackSC was working with my amazing team to
                put together a covid safe hackathon against all odds! I am super
                proud of the team for their hard work and loved learning and
                becoming closer with HackSC my senior year.
              </StyledText>
              <Name>Katherine Wong</Name>
              <Title>President &apos;21</Title>
            </Testimonial>
          </Slide>
          <Slide>
            <Photo>
              <img src="/img/studentxp/kelly.png" alt="Kelly Dixon" />
            </Photo>
            <Testimonial>
              <StyledText>
                My favorite things about HackSC were spending time with some of
                my best friends and getting to see all of our hard work pay off.
                My favorite memory was getting to know everyone at the retreat!
              </StyledText>
              <Name>Kelly Dixon</Name>
              <Title>Logistics Lead &apos;22</Title>
            </Testimonial>
          </Slide>
          <Slide>
            <Photo>
              <img src="/img/studentxp/max.png" alt="Max Leiter" />
            </Photo>
            <Testimonial>
              <StyledText>
                My favorite thing about HackSC is students putting on an event
                that most professional organizations would struggle to do.
              </StyledText>
              <Name>Max Leiter</Name>
              <Title>Engineering Lead &apos;22</Title>
            </Testimonial>
          </Slide>
          <Slide>
            <Photo>
              <img src="/img/studentxp/claire.png" alt="Claire Moody" />
            </Photo>
            <Testimonial>
              <StyledText>
                My favorite memory was the night of the final interview where we
                welcomed all of the new members to HackSC! It was so rewarding
                to watch the organization grow so much and meet the amazing new
                organizers.
              </StyledText>
              <Name>Claire Moody</Name>
              <Title>Sponsorship Lead &apos;22</Title>
            </Testimonial>
          </Slide>
          <Slide>
            <Photo>
              <img src="/img/studentxp/chloe.png" alt="Chloe Tanlimco" />
            </Photo>
            <Testimonial>
              <StyledText>
                I had a lot of fun staying up late to work on last-minute
                features and finishing touches to our hacker platform, Odyssey,
                and it was fulfilling to see our website at the core of both
                hacker and organizer experiences that year.
              </StyledText>
              <Name>Chloe Tanlimco</Name>
              <Title>Engineering Member &apos;22</Title>
            </Testimonial>
          </Slide>
        </Slides>
      </Slider>
    </StyledStudentXP>
  );
}

const StyledStudentXP = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const XPHeaderH2 = styled(H2)`
  font-size: 4.25rem;
  font-weight: 600;
  color: #2b2b2b;
  text-align: center;

  @media (max-width: 1240px) {
    font-size: 3rem;
  }
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Slider = styled.div`
  width: 80vw;
  text-align: center;
  overflow: hidden;
  margin-top: 5rem;
  justify-content: center;
  @media (max-width: 800px) {
    width: 65vw;
  }
`;

const Slides = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(
      to right,
      ${TrademarkColors.YELLOW} 0%,
      ${TrademarkColors.LIGHT_RED} 20%,
      ${TrademarkColors.LIGHT_BLUE} 40%,
      ${TrademarkColors.LIGHT_PURPLE} 100%
    );
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const Slide = styled.div`
  scroll-snap-align: start;
  flex-shrink: 0;
  width: 80vw;
  height: 40vw;
  margin-right: 50px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  transform-origin: center center;
  transform: scale(1);
  transition: transform 0.5s;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 100px;
  @media (max-width: 800px) {
    width: 65vw;
    flex-direction: column;
    height: 130vw;
  }
`;

const Photo = styled.div`
  flex-basis: 50%;
  align-items: center;
  padding-top: 24px;
  > img {
    width: 40vw;
    height: 40vw;
    object-fit: contain;
    border-radius: 10px 0 0 10px;
    @media (max-width: 800px) {
      border-radius: 10px 10px 0 0;
      width: 65vw;
      height: 65vw;
    }
  }
  @media (max-width: 800px) {
    padding-top: 0px;
  }
`;

const Testimonial = styled.div`
  flex-basis: 50%;
  padding: 7vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 800px) {
    padding: 7vw;
  }
`;

const Name = styled(Text)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-weight: 600;
  padding-left: 2vw;
  font-size: 1.75rem;
  @media (max-width: 1240px) {
    font-size: 1.25rem;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
    padding-left: 3vw;
  }
  @media (max-width: 400px) {
    font-size: 0.6rem;
  }
`;

const Title = styled(Text)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-style: italic;
  font-size: 1.25rem;
  color: #939393;
  padding-left: 2vw;
  @media (max-width: 1240px) {
    font-size: 0.8rem;
  }
  @media (max-width: 768px) {
    padding-left: 3vw;
    font-size: 0.75rem;
  }
  @media (max-width: 400px) {
    font-size: 0.4rem;
  }
`;

const StyledText = styled(Text)`
  display: inline-block;
  border-left: 5px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(
    to bottom,
    ${TrademarkColors.YELLOW} 0%,
    ${TrademarkColors.LIGHT_RED} 20%,
    ${TrademarkColors.LIGHT_BLUE} 40%,
    ${TrademarkColors.LIGHT_PURPLE} 100%
  );
  padding-left: 2vw;
  margin-bottom: 2vw;
  text-align: left;
  font-size: 1.5rem;
  @media (max-width: 1240px) {
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    font-size: 0.8rem;
    border-left: 4px solid;
  }
  @media (max-width: 400px) {
    font-size: 0.5rem;
  }
`;

export default StudentXP;
