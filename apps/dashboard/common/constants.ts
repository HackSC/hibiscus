import { Option } from '@hibiscus/types';
import { ApplicationStatus } from '@hibiscus/types';

export const ALLOWED_RESUME_FORMATS = ['pdf', 'docx', 'txt', 'odt'];
export const DEFAULT_OTHERS_FIELD_LABEL = 'Others';

export const hackformLinks = {
  HackSC: {
    CodeOfConduct:
      'https://hacksc23.notion.site/HackSC-Code-of-Conduct-d3c1e5b436504543b259e415161eb0d9',
    TermsOfService:
      'https://hacksc23.notion.site/HackSC-Events-Terms-of-Service-01c2c3b162184cccbbdffbe9e8c02613',
  },
  MLH: {
    CodeOfConduct: 'https://static.mlh.io/docs/mlh-code-of-conduct.pdf',
    PrivacyPolicy: 'https://mlh.io/privacy',
    ContestTermsAndConditions:
      'https://github.com/MLH/mlh-policies/blob/main/contest-terms.md',
  },
};

export const TSRV_RELEASE_FLAG = false;

export const getOptionsGraduationYear = (): Option[] => {
  const opts: string[] = [];
  for (const inc of [...Array(5).keys()]) {
    for (const season of ['Spring', 'Fall']) {
      opts.push(`${season} 202${3 + inc}`);
    }
  }

  return opts.map((w) => ({
    value: w.toLowerCase().split(' ').join('-'),
    displayName: w,
  }));
};

export const getStartDateJobOptions = (): Option[] =>
  [
    'Summer 2023',
    'Fall 2023',
    'Spring 2024',
    'Summer 2024',
    'Fall 2024',
    'Spring 2025 or later',
  ].map((w) => ({
    value: w.toLowerCase().split(' ').join('-'),
    displayName: w,
  }));

export const HACKER_POSTAPP_STATUSES = [
  ApplicationStatus.NOT_ADMITTED,
  ApplicationStatus.IN_REVIEW,
  ApplicationStatus.ADMITTED,
];

export const MLH_MAJORS_OPTIONS_LIST: Option[] = [
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
];

export const BATTLEPASS_LEADERBOARD_PAGE_SIZE = 10;
export const MAX_BATTLEPASS_PAGES = 50;
