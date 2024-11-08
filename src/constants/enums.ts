import { ReferringProviderStatusType } from '../constants/types/types';

export const CLINIC_TYPES: string[] = ['ophthalmology', 'optometry'];

export const EYES_TO_BE_DONE: string[] = ['Both', 'Left', 'Right'];

export const INSURANCE_TYPES: string[] = ['Commercial', 'Non-Commercial'];

export const POST_OFFICE_VISIT_TYPES: string[] = ['Cataract', 'Lasik', 'ASA'];
export const PROVIDER_REFERRER_STATUS: ReferringProviderStatusType[] = [
  'Active',
  'High-Risk',
  'Intermittent',
  'New',
  'Non-Referrer',
];

export const PROVIDER_REFERRER_STATUS_DESCRIPTIONS: { [key: string]: string } =
  {
    Active: 'Refers at least two patients a month',
    'High-Risk':
      'A current referring doctor who recently complained, gave suggestions, or is at risk of sending elsewhere',
    Intermittent: 'Refers at least one time a year',
    New: 'First time ever referring or first time referring in over a year.  Status remains for 6 weeks',
    'Non-Referrer': 'No referrals within the last year',
  };

export const PROVIDER_SPECIALTIES: string[] = [
  'Contact lenses',
  'General',
  'Glaucoma',
  'Low vision',
  'Other',
  'Pediatrics',
];

export const PROVIDER_TYPES: string[] = [
  'optometrist',
  'ophthalmologist',
  'primary care physician',
];

export const PROVIDER_CLINIC_TYPES: { [key: string]: string } = {
  ophthalmologist: 'ophthalmology',
  optometrist: 'optometry',
  'primary care physician': 'primary care physician',
};

export const REFERRER_STATUS_TIMELINES = {
  Active: {
    liaisonVisitTimeline: '',
    surgeonVisitTimeline: '',
  },
  'High-Risk': {
    liaisonVisitTimeline: '',
    surgeonVisitTimeline: '',
  },
  Intermittent: {
    liaisonVisitTimeline: '',
    surgeonVisitTimeline: '',
  },
  New: {
    liaisonVisitTimeline: '',
    surgeonVisitTimeline: '',
  },
  'Non-Referrer': {
    liaisonVisitTimeline: '',
    surgeonVisitTimeline: '',
  },
};

export const STATES: string[] = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
  'District of Columbia',
];

export const SURGERY_TYPES: string[] = [
  'ASA',
  'Cataract',
  'ICL',
  'LASIK',
  'MIGS + cataract',
  'Other',
];

export const USER_ROLES: string[] = [
  'admin',
  'liaison',
  'optometrist',
  'specialist',
  'surgeon',
] as const;

export const VISIT_TIMELINE_OPTIONS: string[] = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
];
