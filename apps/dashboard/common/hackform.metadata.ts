import {
  HackformMetadata,
  HackformQuestionType,
  Option,
} from '@hibiscus/types';
import moment from 'moment';
import API from './api';

export const formMetadata2023HackerApps: HackformMetadata = {
  entry: {
    title: 'HackSC 2023 Application',
    subtitle:
      "We're so glad to have you join us for SoCal's favorite hackathon",
    estTimeInMinutes: 5,
  },
  questions: [
    {
      title: 'Please confirm your full name',
      type: HackformQuestionType.ShortText,
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
      type: HackformQuestionType.Date,
      required: true,
      validationFunction: (input) => {
        const errors: string[] = [];
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
    {
      title: 'What school do you go to?',
      type: HackformQuestionType.SingleOptionDropdown,
      required: true,
      validationFunction: (input) => {
        if (input.text === '')
          return { valid: false, errorDescription: 'This field is required' };
        return { valid: true };
      },
      limitOptions: 6,
      options: async () => {
        const schools = await API.getSchools();
        const opts: Option[] = schools.map((str, i) => ({
          displayName: str,
          value: i.toString(),
        }));
        return opts;
      },
    },
    {
      title: 'Select your program:',
      type: HackformQuestionType.SingleChoice,
      required: true,
      validationFunction: (input) => {
        if (!input.singleChoiceValue && input.text === '')
          return { valid: false, errorDescription: 'This field is required' };
        return { valid: true };
      },
      hasOtherField: true,
      placeholder: 'e.g a SWE bootcamp',
      options: [
        { value: 'undergrad', displayName: 'Undergraduate' },
        { value: 'master', displayName: 'Masters' },
        { value: 'phd', displayName: 'PhD' },
        { value: 'high-school', displayName: 'High school' },
      ],
    },
    {
      title: 'Expected graduation date:',
      placeholder: 'e.g Spring 2024, Fall 2023',
      type: HackformQuestionType.ShortText,
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
    {
      title:
        'What is your major/primary area of study? If you already graduated, what was your major/primary area of study? Select all that apply',
      type: HackformQuestionType.MultipleSelect,
      hasOtherField: true,
      options: [
        {
          value: 'cs',
          displayName:
            'Computer science, computer engineering, or software engineering',
        },
        {
          value: 'eng',
          displayName: `Another engineering discipline (such as civil, electrical, mechanical, etc.)`,
        },
        {
          value: 'natural',
          displayName: `A natural science (such as biology, chemistry, physics, etc.)`,
        },
        {
          value: 'math',
          displayName: `Mathematics or statistics`,
        },
        {
          value: 'web',
          displayName: `Web development or web design`,
        },
        {
          value: 'business',
          displayName: `Business discipline (such as accounting, finance, marketing, etc.)`,
        },
        {
          value: 'human',
          displayName:
            'Humanities discipline (such as literature, history, philosophy, etc.)',
        },
        {
          value: 'arts',
          displayName: `Fine arts or performing arts (such as graphic design, music, studio art, etc.)`,
        },
        {
          value: 'health',
          displayName: `Health science (such as nursing, pharmacy, radiology, etc.)`,
        },
        {
          value: 'undecided',
          displayName: `Undecided / No Declared Major`,
        },
        {
          value: 'no-offer',
          displayName: `My school does not offer majors / primary areas of study`,
        },
        {
          value: 'no-answer',
          displayName: 'Prefer not to answer',
        },
      ],
    },
    {
      title: 'Minor:',
      type: HackformQuestionType.SingleOptionDropdown,
      options: [],
    },
    {
      title: 'Preferred pronouns:',
      type: HackformQuestionType.SingleChoice,
      required: true,
      hasOtherField: true,
      validationFunction: (input) => {
        if (!input.singleChoiceValue && input.text === '')
          return { valid: false, errorDescription: 'This field is required' };
        return { valid: true };
      },
      options: [
        {
          value: '1',
          displayName: 'She/her/hers',
        },
        { value: '2', displayName: 'He/him/his' },
        { value: '3', displayName: 'They/Them/Theirs' },
        { value: '4', displayName: 'Ze/Hir/Hirs' },
        { value: '5', displayName: 'No preference' },
        { value: '6', displayName: 'No Pronoun' },
        { value: '7', displayName: 'I do not wish to share' },
      ],
    },
    {
      title: 'Ethnicity:',
      type: HackformQuestionType.MultipleSelect,
      hasOtherField: true,
      required: true,
      options: [
        {
          value: 'b',
          displayName: 'Black',
        },
        { value: 'w', displayName: 'White' },
        { value: 'ea', displayName: 'East Asian' },
        { value: 'sa', displayName: 'South Asian' },
        { value: 'sea', displayName: 'Southeast Asian' },
        { value: 'na', displayName: 'North Asian' },
        { value: 'ca', displayName: 'Central Asian' },
        { value: 'me/na', displayName: 'Middle Eastern/North African' },
        { value: 'ltx', displayName: 'Latinx' },
      ],
      validationFunction: (input) => {
        if (input.choices.length === 0) {
          return {
            valid: false,
            errorDescription: 'Please select more than one option',
          };
        }
        return { valid: true };
      },
    },
    {
      title: 'Do you have any allergies/dietary restrictions?',
      type: HackformQuestionType.LongText,
    },
    {
      title:
        'Do you require any other accommodations (wheelchair access, visibility)?',
      type: HackformQuestionType.ShortText,
    },
    {
      title: 'Your shipping address:',
      required: true,
      type: HackformQuestionType.ShortText,
      validationFunction: (input) => {
        if (input.text === '') {
          return {
            valid: false,
            errorDescription: 'Please enter a mailing address!',
          };
        }
        return { valid: true };
      },
    },
    {
      title: 'Shirt size:',
      type: HackformQuestionType.SingleChoice,
      required: true,
      options: [
        {
          value: 'xs',
          displayName: 'XS',
        },
        { value: 's', displayName: 'S' },
        { value: 'm', displayName: 'M' },
        { value: 'l', displayName: 'L' },
        { value: 'xl', displayName: 'XL' },
        { value: 'xxl', displayName: 'XXL' },
      ],
      validationFunction: (input) => {
        if (!input.singleChoiceValue) {
          return { valid: false, errorDescription: 'This field is required' };
        }
        return { valid: true };
      },
    },
    {
      title: 'How many hackathons have you done before?',
      required: true,
      type: HackformQuestionType.ShortText,
    },
    {
      title: 'Have you attended HackSC before?',
      type: HackformQuestionType.SingleChoice,
      required: true,
      options: [
        { value: 'y', displayName: 'Yes' },
        { value: 'n', displayName: 'No' },
      ],
    },
    {
      title: 'What is your level of proficiency with coding/programming?',
      type: HackformQuestionType.SingleChoice,
      required: true,
      options: [
        { value: 'b', displayName: 'Beginner' },
        { value: 'i', displayName: 'Intermediate' },
        { value: 'a', displayName: 'Advanced' },
      ],
    },
    {
      title: 'Upload your resume',
      type: HackformQuestionType.File,
    },
    {
      title: 'Link to personal website:',
      type: HackformQuestionType.ShortText,
    },
    {
      title:
        'Tell us about a project you’re most proud of. What did you learn from it? (100-150 words)',
      type: HackformQuestionType.LongText,
      required: true,
      validationFunction: (input) => {
        if (!input.text) {
          return { valid: false, errorDescription: 'This field is required' };
        }
        return { valid: true };
      },
    },
    {
      title:
        'What are you passionate about outside of technology? (max 100 words)',
      type: HackformQuestionType.LongText,
      required: true,
      validationFunction: (input) => {
        if (!input.text) {
          return { valid: false, errorDescription: 'This field is required' };
        }
        return { valid: true };
      },
    },
    {
      title: 'How did you hear about HackSC?',
      type: HackformQuestionType.SingleChoice,
      options: [
        { value: 'f', displayName: 'Friend' },
        { value: 'e', displayName: 'Email' },
        { value: 'i', displayName: 'Instagram' },
        { value: 'l', displayName: 'LinkedIn' },
        { value: 'osm', displayName: 'Other social media' },
      ],
    },
    {
      title: `I have read and agree to the HackSC Code of Conduct, HackSC Terms and Conditions, as well as the MLH Code of Conduct."(https://static.mlh.io/docs/mlh-code-of-conduct.pdf)"`,
      type: HackformQuestionType.SingleChoice,
      required: true,
      options: [
        { value: 'y', displayName: 'Yes' },
        { value: 'n', displayName: 'No' },
      ],
      validationFunction: (input) => {
        if (!input.singleChoiceValue) {
          return { valid: false, errorDescription: 'This field is required' };
        }
        return { valid: true };
      },
    },
    {
      title: `I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the MLH Privacy Policy (https://mlh.io/privacy).
      I further agree to the terms of both the MLH Contest Terms and Conditions (https://github.com/MLH/mlh-policies/blob/main/contest-terms.md)and the MLH Privacy Policy (https://mlh.io/privacy)`,
      type: HackformQuestionType.SingleChoice,
      required: true,
      options: [
        { value: 'y', displayName: 'Yes' },
        { value: 'n', displayName: 'No' },
      ],
      validationFunction: (input) => {
        if (!input.singleChoiceValue) {
          return { valid: false, errorDescription: 'This field is required' };
        }
        return { valid: true };
      },
    },
    {
      title: `I authorize MLH to send me an email where I can further opt into the MLH Hacker, Events, or Organizer Newsletters and other communications from MLH.`,
      type: HackformQuestionType.SingleChoice,
      required: true,
      options: [
        { value: 'y', displayName: 'Yes' },
        { value: 'n', displayName: 'No' },
      ],
      validationFunction: (input) => {
        if (!input.singleChoiceValue) {
          return { valid: false, errorDescription: 'This field is required' };
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
