import { FormMetadata, FormQuestionType } from '@hacksc-platforms/types';

export const formMetadata: FormMetadata = {
  entry: {
    title: 'HackSC 2023 Application',
    subtitle:
      "We're so glad to have you join us for SoCal's favorite hackathon",
    estTimeInMinutes: 5,
  },
  questions: [
    {
      title: 'Please confirm your full name',
      type: FormQuestionType.ShortText,
      placeholder: 'Enter your full name here',
      required: true,
    },
    // {
    //   title: 'Please enter your date of birth:',
    //   type: FormQuestionType.Date,
    //   required: true,
    // },
    // {
    //   title: 'What school do you go to?',
    //   type: FormQuestionType.SingleOptionDropdown,
    //   required: true,
    // },
    // {
    //   title: 'Select your program:',
    //   type: FormQuestionType.SingleOptionDropdown,
    // },
    {
      title: 'What technologies and skills do you have?',
      type: FormQuestionType.LongText,
      placeholder: 'Type your answer here...',
    },
  ],
  end: {
    title: 'Thank you for applying!',
    subtitle:
      'We will get back to you soon via email. Meanwhile, feel free to check out the portal and make a Team',
  },
};
