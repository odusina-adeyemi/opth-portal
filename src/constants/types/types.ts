// actionItems table
type ActionItem = {
  id: string;
  action: string;
  completed: boolean;
  createdAt: string;
  dueDate: string;
  notes: string;
  provider: Provider;
  providerId: string;
  updatedAt: string;
  user: User;
  userId: string;
};

// clinics table
type Clinic = {
  id: string;
  address: string;
  city: string;
  email: string;
  faxNumber: string;
  state: string;
  name: string;
  notes: string;
  organizationId: string;
  phoneNumber: string;
  providers: Provider[]; // array of providers
  referralManager: string; // name of the referral manager
  referrerStatusTimeline: object; // REFERRER_STATUS_TIMELINES in enums.ts
  type: string; // ophthalmology | optometry
  users: User[]; // staff, surgeons who have a login, etc. array of user ids
  zipCode: string | number;
};

type FileResponse = {
  id: string;
  clinic: Clinic;
  clinicId: string;
  url: string;
  name: string;
  provider: Provider;
  providerId: string;
  signedUrl: string;
  user: User;
  updatedAt: string;
};

type FileUploadInput = {
  content: string; // Base64-encoded file
  filename: string;
  mimetype: string;
};

type InsuranceCompany = {
  id: string;
  isCommercial: boolean;
  organizationId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type Organization = {
  id: string;
  clinics: Clinic[]; // array of clinics
  name: string;
  patients: Patient[]; // array of patients
  providers: Provider[]; // array of providers
  users: User[]; // array of users
};

// patients table
type Patient = {
  id: string;
  clinics: Clinic[]; // array of clinics
  dob: string | null; // Date object
  email: string;
  firstName: string;
  generalNotes: string;
  lastName: string;
  patientContacts: PatientContact[]; // array of patientContactData data
  organizationId: string;
  phoneNumber: string;
  postOperations: PostOperation[]; // array of post-operation data
  preOperations: PreOperationData[]; // array of pre-operation data
  providers: Provider[]; // array of providers
  referringClinic: Clinic; // referring clinic
  referringClinicId: string; // referring clinic id
  referringProvider: Provider; // referring provider
  referringProviderId: string; // referring provider id
  surgeonClinicId: string; // surgeon clinic id
  surgeonId: string; // surgeon id
};

// providers table - ophthalmologists, optometrists, etc.
type Provider = {
  id: string;
  clinics: Clinic[]; // array of clinics m-m relationship
  consentFormOnFile: boolean;
  dateVisitedByProvider: Date;
  dateVisitedByLiaison: Date;
  email: string;
  hasDemographics: boolean;
  hasW9: boolean;
  image: string;
  firstName: string;
  lastName: string;
  notes: string;
  organizationId: string;
  patients: Patient[]; // array of patients
  phoneNumber: string;
  specialties: string[]; // LASIK, cataract, | optometry, etc.
  status: string; // high-risk, new referring provider, etc.
  type: string; // ophthalmologist | optometrist
};

type ProviderClinic = {
  clinicId: string;
  clinic: Clinic;
  consentFormOnFile: boolean;
  hasDemographics: boolean;
  hasW9: boolean;
  providerId: string;
  provider: Provider;
};

type PreOperationData = {
  id: string;
  patientId: number;
  clinicId: number;
  providerId: number;
  consultationReportSent: boolean;
  delayInSurgery: boolean;
  delayReason: string;
  delayLetterSent: boolean;
  eyesToBeDone: string; // left | right | both
  firstEyeSurgeryDate: Date;
  firstEyeSurgeryType: string; // cataract, LASIK, etc.
  initialAppointmentCompleted: boolean;
  isComanage: boolean;
  reasonNotComanage: string;
  reasonNoSurgeryScheduled: string;
  secondEyeSurgeryDate: Date;
  secondEyeSurgeryType: string; // cataract, LASIK, etc.
  surgeryScheduled: boolean; // could be calculated from dateSurgeryScheduled != null
};

type PatientContact = {
  id: string;
  patientId: number;
  clinicId: number;
  providerId: number;
  contactNotes: string;
  dateAttemptedFirstContact: Date; // need date and specific time in min and seconds
  dateComanagerAware: Date; // specific time
  dateInitialAppointmentScheduled: Date;
  dateReferralReceived: Date; // specific time
};

type PostOperation = {
  id: string;
  amountToBePaidFromInsurance: number;
  amountToPayProvider: number;
  clinics: string[]; // array of clinic ids
  checkDelivered: boolean;
  checkDeliveryPaperwork: boolean;
  checkNumber: number;
  contactedReferrer: boolean;
  generalNotes: string;
  paidOptomDate: string; // can be used as check Date too
  patientId: number;
  postOpVisitDate: Date;
  postOpVisitType: string; // 1-day, 1-week, 1-month, etc.
  providers: string[]; // array of provider ids
  reasonNotReferredBack: string;
  referredBackToOriginalClinic: boolean;
  referralCompleted: boolean; // calculated by transfer of care and money being paid
  referralCanceled: boolean;
  referralCanceledReason: string;
  transferOfCare: boolean;
  transferOfCareDate: Date; // exact time
  typeOfInsurance: string; // commercial | non-commercial
};

type ProviderStatus = {
  id: string;
  description: string;
  organizationId: string;
  status: string;
};

// reports table
type ReportTable = {
  id: string;
  clinicId: number;
  title: string;
  content: string; // url to generated report in S3?
};

// users table
type User = {
  id: string;
  clinicId: number;
  clinics: Clinic[]; // array of clinics
  email: string;
  organizationId: string;
  organization: Organization; // organization
  providerId: number;
  firstName: string;
  lastName: string;
  providers: Provider[]; // array of providers
  role: string; // admin, staff, surgeon, etc.
};

type ProviderType = 'ophthalmologist' | 'optometrist';
type ReferringProviderStatusType =
  | 'Active'
  | 'High-Risk'
  | 'Intermittent'
  | 'New'
  | 'Non-Referrer';
type InsuranceType = 'commercial' | 'non-commercial';

// To show what properties are available
// type KindeUser = {
//   id: string;
//   providedId: string | undefined;
//   email: string;
//   username: undefined; // won't be any usernames
//   lastName: string;
//   firstName: string;
//   isSuspended: boolean;
//   picture: string; // image url
//   totalSignIns: number; // 7
//   failedSignIns: 0;
//   lastSignedIn: string; // '2024-05-15T23:21:29.587265+00:00';
//   createdOn: string; // '2024-05-15T18:45:01.031328+00:00';
//   organizations: string[] | undefined; // org created on Kinde platform
//   identities: string[] | undefined;
// };

type TYear = `${number}${number}${number}${number}`;
type TMonth = `${number}${number}`;
type TDay = `${number}${number}`;
type THours = `${number}${number}`;
type TMinutes = `${number}${number}`;
type TSeconds = `${number}${number}`;
type TMilliseconds = `${number}${number}${number}`;

/**
 * Represent a string like `2021-01-08`
 */
type TDateISODate = `${TYear}-${TMonth}-${TDay}`;

/**
 * Represent a string like `14:42:34.678`
 */
type TDateISOTime = `${THours}:${TMinutes}:${TSeconds}.${TMilliseconds}`;

/**
 * Represent a string like `2021-01-08T14:42:34.678Z` (format: ISO 8601).
 *
 * It is not possible to type more precisely (list every possible values for months, hours etc) as
 * it would result in a warning from TypeScript:
 *   "Expression produces a union type that is too complex to represent. ts(2590)
 */
type TDateISO = `${TDateISODate}T${TDateISOTime}Z`;

export type {
  ActionItem,
  Clinic,
  FileResponse,
  FileUploadInput,
  InsuranceCompany,
  InsuranceType,
  Organization,
  Patient,
  PatientContact,
  Provider,
  ProviderStatus,
  ProviderType,
  ProviderClinic,
  PreOperationData,
  PostOperation,
  ReferringProviderStatusType,
  ReportTable,
  TDateISO,
  User,
};
