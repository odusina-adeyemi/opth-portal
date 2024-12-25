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

// type Patient = {
//   id: string; // Unique patient ID

//   // Basic Information
//   firstName: string; // Patient's first name
//   lastName: string; // Patient's last name
//   dob: string; // Date of birth (ISO format)
//   email: string; // Email address
//   phoneNumber: string; // Phone number
//   gender?: 'male' | 'female'; // Gender (optional)
//   address?: string; // Physical address (optional)
//   city?: string; // City of residence (optional)
//   zip?: string; // ZIP code (optional)
//   fax?: string; // Fax number (optional)

//   // Communication Preferences
//   language?: string; // Preferred language (optional)
//   okToText?: boolean; // Consent to text communication (optional)
//   interpreterNeeded?: boolean; // Need for an interpreter (optional)

//   // Referral Information
//   referral_info?: {
//     referringemail?: string; // Referring provider's email
//     referringphone?: string; // Referring provider's phone number
//     referringfax?: string; // Referring provider's fax number
//     referringaddress?: string; // Referring provider's address
//     referringcity?: string; // Referring provider's city
//     referringstatezip?: string; // Referring provider's state and ZIP code
//   };

//   // Medical Details
//   preferredLocations?: string[]; // Preferred clinic locations (optional)
//   consultationType?: string[]; // Consultation types (optional)
//   urgentReferral?: boolean; // Indicates urgency of the referral
//   generalNotes?: string; // Additional notes (optional)
//   notes?: string; // Additional notes (optional)
//   comanagement?: 'yes' | 'no'; // Co-management preferences (optional)

//   // Insurance Information
//   primaryInsuranceProvider?: string; // Primary insurance provider name (optional)
//   primaryInsuranceIdNumber?: string; // Primary insurance ID number (optional)
//   primaryInsuranceGroupNumber?: string; // Primary insurance group number (optional)
//   secondaryInsuranceProvider?: string; // Secondary insurance provider name (optional)
//   secondaryInsuranceIdNumber?: string; // Secondary insurance ID number (optional)
//   secondaryInsuranceGroupNumber?: string; // Secondary insurance group number (optional)

//   // Relationships
//   clinics?: Clinic[]; // Associated clinics (optional)
//   providers?: Provider[]; // Associated providers (optional)
//   referringProvider?: Provider; // Referring provider (optional)
//   referringProviderId?: string; // Referring provider ID (optional)
//   referringClinic?: Clinic; // Referring clinic (optional)
//   referringClinicId?: string; // Referring clinic ID (optional)
//   surgeonClinicId?: string; // Surgeon clinic ID (optional)
//   surgeonId?: string; // Surgeon ID (optional)

//   // File Attachments
//   attachedFiles?: File[]; // Associated files (optional)
// }

type AppointmentInfo = {
  doctor_specialty: String;
  preferred_locations: [String];
  consultation_type: [String];
  urgent_referral: Boolean;
  additional_conditions: String;
  chart_notes_attachments: [String];
  co_manage_care: Boolean;
  dlv_assume_post_op_care: Boolean;
};

type ReferralInfo = {
  referringclinicid: ID;
  referringproviderid: ID;
  referringemail: String;
  referringphone: String;
  referringfax: String;
  referringaddress: String;
  referringcity: String;
  referringstatezip: String;
};

type SurgeonInfo = {
  id: string;
  clinicId: string;
};

type InsuranceInfo = {
  primaryInsuranceProviderId: String;
  primaryInsuranceIdNumber: String;
  primaryInsuranceGroupNumber: String;
  secondaryInsuranceProviderId: String;
  secondaryInsuranceIdNumber: String;
  secondaryInsuranceGroupNumber: String;
};

// Types for file attachments
type File = {
  name: String;
  url: String;
};

// Main Patient type
// type ID = string;

type ID = string;

type Patient = {
  id: ID;
  firstName: String;
  lastName: String;
  dob: String;
  notes: String;
  email: String;
  phoneNumber: String;
  gender: String;
  address: String;
  city: String;
  zip: String;
  interpreterNeeded: Boolean;
  language: String;
  okToText: Boolean;
  urgentReferral: Boolean;
  preferredLocations: [String];
  consultationType: [String];
  attachedFiles: [File];
  additionalNotes: String;
  comanageNo: Boolean;
  comanageYes: Boolean;

  appointment_info: AppointmentInfo;
  referral_info: ReferralInfo;
  surgeon: SurgeonInfo;
  insurance_info: InsuranceInfo;
  clinics: [Clinic];
  providers: [Provider];
  organizationId: String;
  referringProvider?: Provider; // Referring provider (optional)
  referringProviderId?: string; // Referring provider ID (optional)
  referringClinic?: Clinic; // Referring clinic (optional)
  referringClinicId?: string; // Referring clinic ID (optional)
  surgeonClinicId?: string; // Surgeon clinic ID (optional)
  surgeonId?: string; // Surgeon ID (optional)
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
