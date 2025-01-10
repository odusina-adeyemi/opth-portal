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

// type AppointmentInfo = {
//   doctor_specialty: String;
//   preferred_locations: [String];
//   consultation_type: [String];
//   urgent_referral: Boolean;
//   additional_conditions: String;
//   chart_notes_attachments: [String];
//   co_manage_care: Boolean;
//   dlv_assume_post_op_care: Boolean;
// };

type ReferralInfo = {
  id: string; // Unique identifier
  referringClinicId?: string; // Foreign key to Clinic
  referringProviderId?: string; // Foreign key to Provider
  referringEmail?: string; // Referring email
  referringPhone?: string; // Referring phone
  referringFax?: string; // Referring fax
  referringAddress?: string; // Referring address
  referringCity?: string; // Referring city
  referringStateZip?: string; // Referring state and zip
  patientId: string; // Foreign key to Patient
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Last update timestamp

  // Relations
  patient: Patient; // Relation to Patient
  referringClinic?: Clinic; // Relation to referring Clinic
  referringProvider?: Provider; // Relation to referring Provider
};

type AppointmentInfo = {
  id: string; // Unique identifier
  doctorSpecialty?: string; // Doctor's specialty
  preferredLocations: string[]; // Array of preferred locations
  consultationType?: string; // Type of consultation
  urgentReferral?: boolean; // Whether the referral is urgent
  additionalConditions?: string; // Additional medical conditions
  chartNotesAttachments: string[]; // Attachments for chart notes
  coManageCare?: boolean; // Co-manage care flag
  dlvAssumePostOpCare?: boolean; // Whether post-op care is assumed
  patientId: string; // Foreign key to Patient
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Last update timestamp

  // Relation to Patient
  patient: Patient; // Associated patient
};

type referral_info = {
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

// type InsuranceInfo = {
//   primaryInsuranceProviderId: String;
//   primaryInsuranceIdNumber: String;
//   primaryInsuranceGroupNumber: String;
//   secondaryInsuranceProviderId: String;
//   secondaryInsuranceIdNumber: String;
//   secondaryInsuranceGroupNumber: String;
// };

type InsuranceInfo = {
  id: string; // Unique identifier
  primaryInsuranceProviderId?: string; // ID for primary insurance provider
  primaryInsuranceProviderName?: string; // Name of primary insurance provider
  primaryInsuranceIdNumber?: string; // Insurance ID number for primary provider
  primaryInsuranceGroupNumber?: string; // Group number for primary insurance
  secondaryInsuranceProviderId?: string; // ID for secondary insurance provider
  secondaryInsuranceProviderName?: string; // Name of secondary insurance provider
  secondaryInsuranceIdNumber?: string; // Insurance ID number for secondary provider
  secondaryInsuranceGroupNumber?: string; // Group number for secondary insurance
  patientId: string; // Foreign key to Patient        
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Last update timestamp

  // Relation to Patient
  patient: Patient; // Associated Patient

  // Relations to Insurance Providers
  primaryInsuranceProvider?: InsuranceCompanies; // Associated primary insurance provider
  secondaryInsuranceProvider?: InsuranceCompanies; // Associated secondary insurance provider
};

type InsuranceCompanies = {
  id: string; // Unique identifier
  isCommercial?: boolean; // Whether the insurance is commercial (default: false)
  name?: string; // Name of the insurance company
  createdAt?: Date; // Creation timestamp
  updatedAt?: Date; // Last update timestamp
  organizationId?: string; // Foreign key to the associated organization

  // Relations
  organization?: Organization; // Associated organization
  primaryInsuranceInfo: InsuranceInfo[]; // List of primary insurance information
  secondaryInsuranceInfo: InsuranceInfo[]; // List of secondary insurance information
  insurance_info_insurance_info_primaryInsuranceProviderIdToinsurance_companies: InsuranceInfo[]; // Primary insurance relations (legacy mapping)
  insurance_info_insurance_info_secondaryInsuranceProviderIdToinsurance_companies: InsuranceInfo[]; // Secondary insurance relations (legacy mapping)
  patients_patients_primaryInsuranceIdToinsurance_companies?: Patient; // Primary insurance patient relation (legacy mapping)
  patients_patients_secondaryInsuranceIdToinsurance_companies?: Patient; // Secondary insurance patient relation (legacy mapping)
  patients_InsuranceCompaniesToPatient: Patient[]; // Patients associated with this insurance company
};

// Types for file attachments
type File = {
  name: String;
  url: String;
};

// Main Patient type
// type ID = string;

type ID = string;

// type Patient = {
//   id: ID;
//   firstName: String;
//   lastName: String;
//   dob: String;
//   notes: String;
//   email: String;
//   phoneNumber: String;
//   gender: String;
//   address: String;
//   city: String;
//   zip: String;
//   interpreterNeeded: Boolean;
//   language: String;
//   okToText: Boolean;
//   urgentReferral: Boolean;
//   preferredLocations: [String];
//   consultationType: [String];
//   attachedFiles: [File];
//   additionalNotes: String;
//   comanageNo: Boolean;
//   comanageYes: Boolean;

//   appointment_info: AppointmentInfo[];
//   referral_info: ReferralInfo;
//   surgeon: SurgeonInfo;
//   insurance_info: InsuranceInfo[];
//   clinics: [Clinic];
//   providers: [Provider];
//   organizationId: String;
//   referringProvider?: Provider; // Referring provider (optional)
//   referringProviderId?: string; // Referring provider ID (optional)
//   referringClinic?: Clinic; // Referring clinic (optional)
//   referringClinicId?: string; // Referring clinic ID (optional)
//   surgeonClinicId?: string; // Surgeon clinic ID (optional)
//   surgeonId?: string; // Surgeon ID (optional)
// };

type Patient = {
  id: string; // Unique identifier
  dob: string; // Date of birth
  firstName?: string; // Optional first name
  lastName?: string; // Optional last name
  createdAt?: Date; // Creation timestamp
  updatedAt?: Date; // Last update timestamp
  referringProviderId?: string; // ID of referring provider
  surgeonId?: string; // ID of surgeon
  referringClinicId?: string; // ID of referring clinic
  surgeonClinicId?: string; // ID of surgeon's clinic
  organizationId?: string; // ID of organization
  consentFormSigned?: boolean; // Whether consent form is signed
  generalNotes?: string; // General notes
  email?: string; // Patient email
  phoneNumber?: string; // Patient phone number
  primaryInsuranceId?: string; // ID for primary insurance (unique)
  secondaryInsuranceId?: string; // ID for secondary insurance (unique)
  failedPatientsOrganizationId?: string; // ID of failed patients organization
  gender?: string; // Gender
  fax?: string; // Fax number
  address?: string; // Address
  city?: string; // City
  zip?: string; // Zip code
  interpreterNeeded?: boolean; // Whether interpreter is needed
  language?: string; // Preferred language
  okToText?: boolean; // Whether patient is okay with texts
  consultationType?: string[]; // Array of consultation types
  urgentReferral?: boolean; // Whether the referral is urgent
  preferredLocations?: string[]; // Array of preferred locations
  comanageYes?: boolean; // Co-manage care approval
  comanageNo?: boolean; // Co-manage care disapproval
  notes?: string; // Additional notes
  signUpNewsLetter?: boolean; // Whether patient signed up for newsletters
  doctorSpecialty?: string; // Doctor's specialty

  // Relations
  appointmentInfo?: AppointmentInfo; // Associated appointment info
  referralInfo?: ReferralInfo[]; // Associated referral info
  insuranceInfo?: InsuranceInfo[]; // Associated insurance info
  attachedFiles?: File[]; // Associated files
  organization?: Organization; // Associated organization
  referringClinic?: Clinic; // Associated referring clinic
  surgeonClinic?: Clinic; // Associated surgeon clinic
  referringProvider?: Provider; // Associated referring provider
  surgeon?: Provider; // Associated surgeon
  postOperations?: PostOperation; // Associated post-operation data
  preOperations?: PreOperationData; // Associated pre-operation data
  clinics?: Clinic[]; // Associated clinics
  providers?: Provider[]; // Associated providers
  patientContacts?: PatientContact; // Associated patient contact
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
