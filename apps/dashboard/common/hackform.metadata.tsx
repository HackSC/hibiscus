import {
  HackformMetadata,
  HackformQuestionType,
  Option,
} from '@hibiscus/types';
import { getAge, getMLHMajors, isAbove, isUnder } from './utils';
import APIService from './api';
import { Link } from '@hibiscus/ui';
import {
  getOptionsGraduationYear,
  getStartDateJobOptions,
  hackformLinks,
} from './constants';

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
        const age = getAge(parsed);
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
      limitOptions: 10,
      validationFunction: (input) => {
        if (input.text === '')
          return { valid: false, errorDescription: 'This field is required' };
        return { valid: true };
      },
      options: async () => {
        const schools = await APIService.getSchools();
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
        { value: 'high-school', displayName: 'High school' },
        { value: 'undergrad', displayName: 'Undergraduate' },
        { value: 'master', displayName: 'Masters' },
        { value: 'phd', displayName: 'PhD' },
      ],
    },
    {
      title: 'Expected graduation date:',
      placeholder: 'e.g Summer 2023',
      type: HackformQuestionType.SingleOptionDropdown,
      required: true,
      options: getOptionsGraduationYear(),
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
        'What is your major/primary area of study? If you already graduated, what was your major/primary area of study?',
      type: HackformQuestionType.SingleOptionDropdown,
      hasOtherField: true,
      options: [
        ...getMLHMajors(),
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
      title: 'Preferred pronouns:',
      type: HackformQuestionType.SingleChoice,
      required: true,
      hasOtherField: true,
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
      validationFunction: (input) => {
        // check if they picked an option at all
        if (input.singleChoiceValue === undefined)
          return { valid: false, errorDescription: 'This field is required' };
        // check if they provided input for Others but no text
        if (input.singleChoiceValue === '' && input.text === '') {
          return {
            valid: false,
            errorDescription: "Please provide an answer to 'Others'",
          };
        }
        return { valid: true };
      },
    },
    {
      title: 'Which race or ethnicity best describes you?',
      type: HackformQuestionType.MultipleSelect,
      hasOtherField: true,
      otherFieldLabel: 'Other',
      required: true,
      options: [
        {
          value: 'ai/an',
          displayName: 'American Indian / Alaskan Native',
        },
        { value: 'a/pi', displayName: 'Asian / Pacific Islander' },
        { value: 'b/aa', displayName: 'Black / African American' },
        { value: 'h', displayName: 'Hispanic / Latino' },
        { value: 'w/ccs', displayName: 'White / Caucasian' },
      ],
      validationFunction: (input) => {
        // check if they entered input for Others
        if (input.singleChoiceValue === '' && input.text === '')
          return {
            valid: false,
            errorDescription: "Please provide an answer for 'Others'",
          };
        // must have a non-Others choice now
        if (input.choices?.length === 0) {
          return {
            valid: false,
            errorDescription: 'Please select at least one option',
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
        'If you require any disability related accommodations, please specify below:',
      subtitle: (
        <span>
          Individuals with disabilities who need accommodations to attend this
          event may contact HackSC’s event team at team@hacksc.com. For more
          information regarding accommodations, please visit{' '}
          <Link href="https://hack.sc/accessibility" passHref underline>
            hack.sc/accessibility
          </Link>
        </span>
      ),
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
            errorDescription: 'Please enter a shipping address!',
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
      validationFunction: (input) => {
        // required input
        if (input.text === '') {
          return {
            valid: false,
            errorDescription: 'This field is required!',
          };
        }
        // check valid nonneg int
        const num = Number.parseInt(input.text);
        const isValidNonnegativeInt =
          !isNaN(num) &&
          Number.isInteger(num) &&
          Number.isFinite(num) &&
          num >= 0;
        if (!isValidNonnegativeInt) {
          return {
            valid: false,
            errorDescription: 'Please enter a valid, non-negative integer',
          };
        }
        return { valid: true };
      },
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
        'Tell us about a project you’re most proud of. What did you learn from it? (50-150 words)',
      type: HackformQuestionType.LongText,
      required: true,
      validatorMetadata: {
        [HackformQuestionType.LongText]: {
          minWordCount: 50,
          maxWordCount: 150,
        },
      },
      validationFunction: function (input) {
        if (!input.text) {
          return { valid: false, errorDescription: 'This field is required' };
        }
        const minWordCount = 50; // TODO: find a better way to do this with validatorMetadata
        const maxWordCount = 150;
        if (isUnder(input.text, minWordCount)) {
          return {
            valid: false,
            errorDescription: `Please write at least ${minWordCount} words!`,
          };
        }
        if (isAbove(input.text, maxWordCount)) {
          return {
            valid: false,
            errorDescription: `Please write at most ${maxWordCount} words!`,
          };
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
        const maxWordCount = 100;
        if (isAbove(input.text, maxWordCount)) {
          return {
            valid: false,
            errorDescription: `Please write at most ${maxWordCount} words!`,
          };
        }
        return { valid: true };
      },
    },
    {
      title: 'Are you looking for a full-time, part-time job or an internship?',
      type: HackformQuestionType.SingleChoice,
      options: [
        { value: 'y', displayName: 'Yes' },
        { value: 'n', displayName: 'No' },
        { value: 'ns', displayName: 'I do not wish to share' },
      ],
    },
    {
      title: "If you answered 'Yes', what are you looking for?",
      type: HackformQuestionType.MultipleSelect,
      options: [
        { value: 'f', displayName: 'Full-time' },
        { value: 'p', displayName: 'Part-time' },
        { value: 'i', displayName: 'Internship' },
      ],
    },
    {
      title:
        'If you answered the previous question, enter your earliest ideal start date.',
      type: HackformQuestionType.SingleOptionDropdown,
      placeholder: 'e.g Summer 2023, Fall 2024',
      limitOptions: 6,
      options: getStartDateJobOptions(),
    },
    {
      title: 'How did you hear about HackSC?',
      type: HackformQuestionType.SingleChoice,
      hasOtherField: true,
      otherFieldLabel: 'Other social media',
      options: [
        { value: 'f', displayName: 'Friend' },
        { value: 'e', displayName: 'Email' },
        { value: 'i', displayName: 'Instagram' },
        { value: 'l', displayName: 'LinkedIn' },
      ],
    },
    {
      title: "If you're applying with others as a team, drop their emails here",
      subtitle:
        'Put them comma-separated. We will review everyone as a team going into the hackathon!',
      type: HackformQuestionType.LongText,
    },
    {
      title: (
        <span>
          I have read and agree to the{' '}
          <Link href={hackformLinks.HackSC.CodeOfConduct} passHref underline>
            HackSC Code of Conduct
          </Link>{' '}
          and{' '}
          <Link href={hackformLinks.HackSC.TermsOfService} passHref underline>
            HackSC Terms and Conditions
          </Link>
          .
        </span>
      ),
      type: HackformQuestionType.SingleChoice,
      required: true,
      options: [{ value: 'y', displayName: 'Yes' }],
      validationFunction: (input) => {
        if (!input.singleChoiceValue) {
          return { valid: false, errorDescription: 'This field is required' };
        }
        return { valid: true };
      },
    },
    // {
    //   title: (
    //     <span>
    //       I authorize you to share my application/registration information with
    //       Major League Hacking for event administration, ranking, and MLH
    //       administration in-line with the{' '}
    //       <Link href={hackformLinks.MLH.PrivacyPolicy} passHref underline>
    //         MLH Privacy Policy
    //       </Link>
    //       . I further agree to the terms of both the{' '}
    //       <Link
    //         href={hackformLinks.MLH.ContestTermsAndConditions}
    //         passHref
    //         underline
    //       >
    //         MLH Contest Terms and Conditions
    //       </Link>{' '}
    //       and the{' '}
    //       <Link href={hackformLinks.MLH.PrivacyPolicy} passHref underline>
    //         MLH Privacy Policy
    //       </Link>
    //     </span>
    //   ),
    //   type: HackformQuestionType.SingleChoice,
    //   required: true,
    //   options: [{ value: 'y', displayName: 'Yes' }],
    //   validationFunction: (input) => {
    //     if (!input.singleChoiceValue) {
    //       return { valid: false, errorDescription: 'This field is required' };
    //     }
    //     return { valid: true };
    //   },
    // },
    //   {
    //     title: `I authorize MLH to send me an email where I can further opt into the MLH Hacker, Events, or Organizer Newsletters and other communications from MLH.`,
    //     type: HackformQuestionType.SingleChoice,
    //     required: true,
    //     options: [{ value: 'y', displayName: 'Yes' }],
    //     validationFunction: (input) => {
    //       if (!input.singleChoiceValue) {
    //         return { valid: false, errorDescription: 'This field is required' };
    //       }
    //       return { valid: true };
    //     },
    //   },
  ],
  end: {
    title: 'Press below to submit your application!',
    subtitle:
      'Thank you for filling the form out. Once you press the button below, your application will be submitted to us for review. Thank you for applying to HackSC and we look forward to seeing you in February!',
  },
};
