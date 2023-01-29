import styled from 'styled-components';
import { H2, H5, Label, Text, AccordionItem2023 } from '@hibiscus/ui';
import { GlowSpan, ColorSpan, ColorSpanBold } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';

/* eslint-disable-next-line */
export interface FAQsProps {}

export function FAQs(props: FAQsProps) {
  return (
    <StyledFAQs>
      <H2>
        <GlowSpan
          color={Colors2023.GRAY.LIGHT}
          shadowColor={Colors2023.BLUE.STANDARD}
        >
          FAQs
        </GlowSpan>
      </H2>
      <FAQContainer>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {faqQuestionsAndAnswersData.map((item, idx) => (
            <FAQAccordionContainer key={idx}>
              <AccordionItem2023
                titleButtonElement={<H5>{item.titleText}</H5>}
                color={item.color}
              >
                <DisclosedTextContainer>
                  <Text>{item.disclosedText}</Text>
                </DisclosedTextContainer>
              </AccordionItem2023>
            </FAQAccordionContainer>
          ))}
        </div>
      </FAQContainer>

      <Label>
        <GlowSpan
          color={Colors2023.GRAY.LIGHT}
          shadowColor={Colors2023.BLUE.STANDARD}
        >
          404: Question Not Found
        </GlowSpan>
      </Label>
      <Text>
        <ColorSpan color={Colors2023.BLUE.STANDARD}>
          Please email us at{' '}
          <ColorSpanBold color={Colors2023.BLUE.STANDARD}>
            <a href="mailto:team@hacksc.com">team@hacksc.com</a>
          </ColorSpanBold>{' '}
          if you have any questions that we haven&apos;t mentioned here!
          We&apos;d love to hear from you.
        </ColorSpan>
      </Text>
    </StyledFAQs>
  );
}

export default FAQs;

const StyledFAQs = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
`;

const FAQContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 3rem 0 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const DisclosedTextContainer = styled.div``;

const FAQAccordionContainer = styled.div`
  width: 70vw;
`;

const faqQuestionsAndAnswersData: {
  titleText: string;
  disclosedText?: string;
  color: string; // this won't be ideal for a paragraph but FAQs shouldn't be long anyways
}[] = [
  {
    titleText: 'What is a hackathon?',
    disclosedText:
      'A hackathon is a competition where teams of students come together to ideate and create solutions to real-world problems. Here at HackSC, we face this mission with our own innovative take.',
    color: Colors2023.PURPLE.STANDARD,
  },
  {
    titleText: 'When is HackSC?',
    disclosedText:
      'HackSC 2023 will begin on February 3rd 2023 at 6pm and end on February 5th 2023 at 2pm.',
    color: Colors2023.BLUE.STANDARD,
  },
  {
    titleText: 'Who can attend?',
    disclosedText:
      'Participants must be 18+ and currently enrolled in an accredited institution. All college students, undergraduate or graduate, are eligible. We welcome all majors and experience levels!',
    color: Colors2023.GREEN.STANDARD,
  },
  {
    titleText: 'Is there any cost?',
    disclosedText:
      'Admission is free for all hackers, thanks to our generous sponsors!',
    color: Colors2023.YELLOW.STANDARD,
  },
  {
    titleText: 'Where will HackSC be held?',
    disclosedText:
      'The event will be held entirely in-person on USC’s campus. We are located around four miles southwest of Downtown Los Angeles.',
    color: Colors2023.PINK.STANDARD,
  },
  {
    titleText: 'What is the schedule for HackSC?',
    disclosedText:
      'Our schedule is still in the works. Check back soon for updates!',
    color: Colors2023.RED.STANDARD,
  },
  {
    titleText: 'What do I need to bring?',
    disclosedText:
      'Bring your computer, big ideas, and a passion for how you can revolutionize computer science’s impact around the world!',
    color: Colors2023.PURPLE.STANDARD,
  },
  {
    titleText: 'Do I need to sign up with a team?',
    disclosedText:
      'Nope! Our team matching service, MatchSC, can help you find the perfect team. If you already have a group that you’d like to work with, though, that’s great too!',
    color: Colors2023.BLUE.STANDARD,
  },
  {
    titleText: 'How many people can we have per team?',
    disclosedText: 'The team size is capped at 4 members per project.',
    color: Colors2023.GREEN.STANDARD,
  },
  {
    titleText: 'How do I register?',
    disclosedText:
      'You can find the application on Hibiscus, our hacker portal.',
    color: Colors2023.YELLOW.STANDARD,
  },
  {
    titleText: 'I’m a USC student — do I need to apply?',
    disclosedText:
      'Yes! Please fill out an application on Hibiscus, our hacker portal.',
    color: Colors2023.PINK.STANDARD,
  },
  {
    titleText: 'When is the application deadline?',
    disclosedText: 'The application will be due on January 30, 2023.',
    color: Colors2023.RED.STANDARD,
  },
  {
    titleText: 'Can I volunteer to judge or mentor?',
    disclosedText:
      'Of course! Please fill out an application on Hibiscus. Reach out to experience@hacksc.com if you’d like to join us as either a judge or a mentor, and we’ll get back to you promptly with more details.',
    color: Colors2023.PURPLE.STANDARD,
  },
  {
    titleText: 'Isn’t hacking illegal?',
    disclosedText:
      'Not in our context! In hackathons, “hacking” means building an application throughout the event. It’s not the same as gaining unauthorized tech access, which is illegal.',
    color: Colors2023.BLUE.STANDARD,
  },
  {
    titleText: 'What if I don’t know how to code?',
    disclosedText:
      'Welcome! Every innovator has to start somewhere, and we’d be honored if you began your journey at HackSC. To help you get started, we will be hosting some workshops to help you learn',
    color: Colors2023.GREEN.STANDARD,
  },
  {
    titleText: 'Where do we sleep?',
    disclosedText:
      'We’ll have spaces specifically designed for sleeping. Feel free to bring a blanket or a sleeping bag if you so desire!',
    color: Colors2023.YELLOW.STANDARD,
  },
  {
    titleText: 'I’m under 18 years old. Can I attend?',
    disclosedText:
      'Unfortunately, due to University policy and insurance limitations, participants under the age of 18 are not allowed to apply for the event. We hope to see you at a future event!',
    color: Colors2023.PINK.STANDARD,
  },
  {
    titleText: 'Is travel reimbursement provided?',
    disclosedText:
      'Due to limited funds this year, travel for HackSC 2023 will not be reimbursed.',
    color: Colors2023.RED.STANDARD,
  },
  {
    titleText: 'Is food provided at the event?',
    disclosedText:
      'At this time, due to limited funding, participants are asked to provide their own food & drink during the event. We are putting together a dining guide for our participants to assist them in finding delicious and affordable food adjacent to our campus! Our team plans to provide catering at future events.',
    color: Colors2023.PURPLE.STANDARD,
  },
];
