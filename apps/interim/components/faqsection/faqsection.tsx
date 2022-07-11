import { AccordionItem, H2, H3 } from '@hacksc-platforms/ui';
import styled from 'styled-components';

export function FAQSection() {
  return (
    <div>
      <FAQHeaderH2>FAQs</FAQHeaderH2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {faqQuestionsAndAnswersData.map((item, idx) => (
          <AccordionItem
            key={idx}
            titleButtonElement={<H3>{item.titleText}</H3>}
          >
            <p>{item.disclosedText}</p>
          </AccordionItem>
        ))}
      </div>
    </div>
  );
}

export default FAQSection;

const FAQHeaderH2 = styled(H2)`
  font-size: 2rem;
`;

const faqQuestionsAndAnswersData: {
  titleText: string;
  disclosedText?: string; // this won't be ideal for a paragraph but FAQs shouldn't be long anyways
}[] = [
  {
    titleText: 'What is a hackathon?',
    disclosedText: 'A hackathon is fun',
  },
  {
    titleText: 'Why HackSC?',
  },
  {
    titleText: 'Do I need to know how to code?',
  },
  {
    titleText: 'What will I need?',
  },
  {
    titleText: 'Who can attend?',
  },
];
