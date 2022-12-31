import { FormMetadata, FormQuestionType } from '@hibiscus/types';
import moment from 'moment';

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
    {
      title: 'Please enter your date of birth:',
      type: FormQuestionType.Date,
      required: true,
      validationFunction: (input) => {
        let errors: string[] = [];
        if (input.text === '') errors.push('This field is required');
        // try to parse date
        const parsed = Date.parse(input.text);
        if (isNaN(parsed))
          errors.push(
            "Invalid date; make sure you're using the correct format (MM/DD/YYYY)"
          );

        // can't attend if you're <18
        const today = new Date();
        const birthday = new Date(parsed);
        const todayMoment = moment([
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        ]);
        const bdayMoment = moment([
          birthday.getFullYear(),
          birthday.getMonth(),
          birthday.getDate(),
        ]);
        const age = todayMoment.diff(bdayMoment, 'years'); // rounded down by default
        if (age < 18) {
          errors.push(
            "Sorry! Unfortunately we don't allow hackers under 18 to attend our event. "
          );
        }

        if (errors.length > 0)
          return { valid: false, errorDescription: errors };
        return { valid: true };
      },
    },
    // {
    //   title: 'What school do you go to?',
    //   type: FormQuestionType.SingleOptionDropdown,
    //   required: true,
    // },
    {
      title: 'Select your program:',
      type: FormQuestionType.SingleChoice,
      required: true,
      validationFunction: (input) => {
        if (!input.singleChoiceValue)
          return { valid: false, errorDescription: 'This field is required' };
        return { valid: true };
      },
      options: [
        { value: 'undergrad', displayName: 'Undergraduate' },
        { value: 'master', displayName: 'Masters' },
        { value: 'phd', displayName: 'PhD' },
        { value: 'high-school', displayName: 'High school' },
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
