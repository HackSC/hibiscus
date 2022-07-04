import { AccordionItem } from '@hacksc-platforms/ui';

export function FAQSection() {
  return (
    <div>
      <h1 style={{ marginBottom: 0 }}>FAQs</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {faqQuestionsAndAnswersData.map((item, idx) => (
          <AccordionItem
            key={idx}
            titleButtonElement={
              <h3 style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                {item.titleText}
              </h3>
            }
          >
            <p>{item.disclosedText}</p>
          </AccordionItem>
        ))}
      </div>
    </div>
  );
}

export default FAQSection;

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
