import { AccordionItem, H2, H4, Text } from '@hibiscus/ui';
import styled from 'styled-components';

export function FAQSection() {
  return (
    <div>
      <FAQHeaderH2>FAQs</FAQHeaderH2>
      <FAQContainer>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {faqQuestionsAndAnswersData.map((item, idx) => (
            <FAQAccordionContainer key={idx}>
              <AccordionItem titleButtonElement={<H4>{item.titleText}</H4>}>
                <DisclosedTextContainer>
                  <Text>{item.disclosedText}</Text>
                </DisclosedTextContainer>
              </AccordionItem>
            </FAQAccordionContainer>
          ))}
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column', width: '10vw' }}
        ></div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {faqQuestionsAndAnswersData2.map((item, idx) => (
            <FAQAccordionContainer key={idx}>
              <AccordionItem titleButtonElement={<H4>{item.titleText}</H4>}>
                <DisclosedTextContainer>
                  <Text>{item.disclosedText}</Text>
                </DisclosedTextContainer>
              </AccordionItem>
            </FAQAccordionContainer>
          ))}
        </div>
      </FAQContainer>
    </div>
  );
}

export default FAQSection;

const FAQHeaderH2 = styled(H2)`
  font-size: 4.25rem;
  font-weight: 700;
  color: #2b2b2b;

  @media (max-width: 768px) {
    text-align: left;
    font-size: 3.5rem;
  }
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
  width: 28rem;
  margin: 0 0 2rem;

  @media (max-width: 1080px) {
    width: 35vw;
  }
  @media (max-width: 768px) {
    width: 70vw;
  }
`;

const faqQuestionsAndAnswersData: {
  titleText: string;
  disclosedText?: string; // this won't be ideal for a paragraph but FAQs shouldn't be long anyways
}[] = [
  {
    titleText: 'What is a hackathon?',
    disclosedText:
      'A hackathon is a 36 hour competition in which teams of students collaborate to ideate and innovate solutions to real world problems! No knowledge of coding or hacking necessary.',
  },
  {
    titleText: 'What if I don’t know how to code?',
    disclosedText:
      'Don’t worry! HackSC offers plenty of beginner friendly workshops to get you started and help you lift your projects off the ground. ',
  },
];

const faqQuestionsAndAnswersData2: {
  titleText: string;
  disclosedText?: string; // this won't be ideal for a paragraph but FAQs shouldn't be long anyways
}[] = [
  {
    titleText: 'What will I need?',
    disclosedText:
      'A computer and a passion for HackSC’s mission of connecting the world!',
  },
  {
    titleText: 'Who can attend?',
    disclosedText:
      'Any college student of any major! Every skill/field of study can be applied at the hackathon. Anyone with a passion for innovation and/or connecting the world will be a great asset to any team.',
  },
];
