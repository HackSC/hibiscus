import { FormMetadata, FormQuestionType } from '@hibiscus/types';

export const formMetadata2023HackerApps: FormMetadata = {
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
      required: true, // TODO: add option to put error message if required condition violated
      validationFunction: (input) => {
        if (input.text === '') {
          return {
            valid: false,
            errorDescription: 'This field is required!',
          };
        }
        return { valid: true };
      },
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
    {
      title: 'Select your program:',
      type: FormQuestionType.SingleChoice,
      placeholder: 'e.g University of Southern California',
      required: true,
      validationFunction: (input) => {
        if (!input.singleChoiceValue)
          return { valid: false, errorDescription: 'This field is required' };
        return { valid: true };
      },
      options: [
        { value: '1', displayName: 'Undergraduate' },
        { value: '2', displayName: 'Masters' },
        { value: '3', displayName: 'PhD' },
      ],
    },
    {
      title: 'What technologies and skills do you have?',
      type: FormQuestionType.LongText,
      placeholder: 'Type your answer here...',
      required: true,
      validationFunction: (input) => {
        if (input.text === '') {
          return {
            valid: false,
            errorDescription: 'This field is required!',
          };
        }
        return { valid: true };
      },
    },
  ],
  end: {
    title: 'Thank you for applying!',
    subtitle:
      'We will get back to you soon via email. Meanwhile, feel free to check out the portal and make a Team',
  },
};
