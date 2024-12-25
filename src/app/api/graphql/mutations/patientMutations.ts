// import { Patient } from '../../../../constants/types/types';
// import { gql } from '@apollo/client';
// import {
//   array,
//   defaulted,
//   pattern,
//   object,
//   optional,
//   string,
// } from 'superstruct';
// import {
//   dateRegex,
//   emailOrEmpty,
//   idRegex,
//   nameRegex,
//   phoneNumberRegex,
// } from '../../../../lib/utils/regexStructs';

// export const CreatePatientStruct = object({
//   clinics: array(pattern(string(), idRegex)),
//   dob: pattern(string(), dateRegex),
//   email: optional(defaulted(emailOrEmpty(), undefined)),
//   firstName: pattern(string(), nameRegex),
//   generalNotes: optional(string()),
//   lastName: pattern(string(), nameRegex),
//   organizationId: pattern(string(), idRegex),
//   phoneNumber: optional(pattern(string(), phoneNumberRegex)),
//   providers: array(pattern(string(), idRegex)),
//   referringClinicId: pattern(string(), idRegex),
//   referringProviderId: pattern(string(), idRegex),
//   surgeonClinicId: optional(pattern(string(), idRegex)),
//   surgeonId: optional(pattern(string(), idRegex)),
// });

// export const UpdatePatientStruct = object({
//   clinics: optional(array(pattern(string(), idRegex))),
//   dob: optional(pattern(string(), dateRegex)),
//   email: optional(emailOrEmpty()),
//   firstName: optional(pattern(string(), nameRegex)),
//   generalNotes: optional(string()),
//   lastName: optional(pattern(string(), nameRegex)),
//   organizationId: optional(pattern(string(), idRegex)),
//   phoneNumber: optional(pattern(string(), phoneNumberRegex)),
//   providers: optional(array(pattern(string(), idRegex))),
//   referringClinicId: optional(pattern(string(), idRegex)),
//   referringProviderId: optional(pattern(string(), idRegex)),
//   surgeonClinicId: optional(pattern(string(), idRegex)),
//   surgeonId: optional(pattern(string(), idRegex)),
// });

// export type PatientCreateUpdateInputType = Omit<Patient, 'id'> & {
//   clinics: string[];
//   providers: string[];
// };

// export const ADD_PATIENT = gql`
//   mutation createPatient($patientInput: PatientInput) {
//     createPatient(patientInput: $patientInput) {
//       id
//       clinics {
//         id
//         providers {
//           id
//         }
//       }
//       dob
//       email
//       firstName
//       lastName
//       phoneNumber
//     }
//   }
// `;

// export const DELETE_PATIENT = gql`
//   mutation deletePatient($id: ID!) {
//     deletePatient(id: $id) {
//       id
//     }
//   }
// `;

// export const UPDATE_PATIENT = gql`
//   mutation updatePatient($id: ID!, $patientInput: PatientInput) {
//     updatePatient(id: $id, patientInput: $patientInput) {
//       id
//       clinics {
//         id
//         providers {
//           id
//         }
//       }
//       dob
//       email
//       firstName
//       lastName
//       phoneNumber
//     }
//   }
// `;

import { Patient } from '../../../../constants/types/types';
import { gql } from '@apollo/client';
import {
  array,
  defaulted,
  pattern,
  object,
  optional,
  string,
  boolean,
} from 'superstruct';
import {
  dateRegex,
  emailOrEmpty,
  idRegex,
  nameRegex,
  phoneNumberRegex,
} from '../../../../lib/utils/regexStructs';

const AppointmentInfoStruct = object({
  doctor_specialty: optional(string()),
  preferred_locations: optional(array(string())),
  consultation_type: optional(array(string())),
  urgent_referral: optional(boolean()),
  additional_conditions: optional(string()),
  chart_notes_attachments: optional(array(string())),
  co_manage_care: optional(boolean()),
  dlv_assume_post_op_care: optional(boolean()),
});

const ReferralInfoStruct = object({
  referringclinicid: optional(pattern(string(), idRegex)),
  referringproviderid: optional(pattern(string(), idRegex)),
  referringemail: optional(string()),
  referringphone: optional(string()),
  referringfax: optional(string()),
  referringaddress: optional(string()),
  referringcity: optional(string()),
  referringstatezip: optional(string()),
});

const InsuranceInfoStruct = object({
  primaryInsuranceProviderId: optional(string()),
  primaryInsuranceIdNumber: optional(string()),
  primaryInsuranceGroupNumber: optional(string()),
  secondaryInsuranceProviderId: optional(string()),
  secondaryInsuranceIdNumber: optional(string()),
  secondaryInsuranceGroupNumber: optional(string()),
});

export const CreatePatientStruct = object({
  clinics: array(pattern(string(), idRegex)),
  dob: pattern(string(), dateRegex),
  email: optional(defaulted(emailOrEmpty(), undefined)),
  firstName: pattern(string(), nameRegex),
  generalNotes: optional(string()),
  lastName: pattern(string(), nameRegex),
  organizationId: pattern(string(), idRegex),
  phoneNumber: optional(pattern(string(), phoneNumberRegex)),
  providers: array(pattern(string(), idRegex)),
  referringClinicId: optional(pattern(string(), idRegex)),
  referringProviderId: optional(pattern(string(), idRegex)),
  surgeonClinicId: optional(pattern(string(), idRegex)),
  surgeonId: optional(pattern(string(), idRegex)),
  gender: optional(string()),
  address: optional(string()),
  city: optional(string()),
  zip: optional(string()),
  interpreterNeeded: optional(boolean()),
  language: optional(string()),
  okToText: optional(boolean()),
  urgentReferral: optional(boolean()),
  preferredLocations: optional(array(string())),
  consultationType: optional(array(string())),
  attachedFiles: optional(array(object({ name: string(), url: string() }))),
  additionalNotes: optional(string()),
  comanagemeNo: optional(boolean()),
  comanageYes: optional(boolean()),
  appointment_info: optional(AppointmentInfoStruct),
  referral_info: optional(ReferralInfoStruct),
  insurance_info: optional(InsuranceInfoStruct),
});

export const UpdatePatientStruct = object({
  clinics: optional(array(pattern(string(), idRegex))),
  dob: optional(pattern(string(), dateRegex)),
  email: optional(emailOrEmpty()),
  firstName: optional(pattern(string(), nameRegex)),
  generalNotes: optional(string()),
  lastName: optional(pattern(string(), nameRegex)),
  organizationId: optional(pattern(string(), idRegex)),
  phoneNumber: optional(pattern(string(), phoneNumberRegex)),
  providers: optional(array(pattern(string(), idRegex))),
  referringClinicId: optional(pattern(string(), idRegex)),
  referringProviderId: optional(pattern(string(), idRegex)),
  surgeonClinicId: optional(pattern(string(), idRegex)),
  surgeonId: optional(pattern(string(), idRegex)),
  gender: optional(string()),
  address: optional(string()),
  city: optional(string()),
  zip: optional(string()),
  interpreterNeeded: optional(boolean()),
  language: optional(string()),
  okToText: optional(boolean()),
  urgentReferral: optional(boolean()),
  preferredLocations: optional(array(string())),
  consultationType: optional(array(string())),
  attachedFiles: optional(array(object({ name: string(), url: string() }))),
  additionalNotes: optional(string()),
  comanagemeNo: optional(boolean()),
  comanageYes: optional(boolean()),
});

export type PatientCreateUpdateInputType = Omit<Patient, 'id'> & {
  clinics: string[];
  providers: string[];
  attachedFiles?: { name: string; url: string }[];
};

export const ADD_PATIENT = gql`
  mutation createPatient($patientInput: PatientInput) {
    createPatient(patientInput: $patientInput) {
      id
      firstName
      lastName
      dob
      notes
      email
      phoneNumber
      gender
      address
      city
      zip
      interpreterNeeded
      language
      okToText
      urgentReferral
      preferredLocations
      consultationType
      attachedFiles {
        name
        url
      }
      additionalNotes
      comanageNo
      comanageYes
      clinics {
        id
      }
      providers {
        id
      }
    }
  }
`;

export const DELETE_PATIENT = gql`
  mutation deletePatient($id: ID!) {
    deletePatient(id: $id) {
      id
    }
  }
`;

export const UPDATE_PATIENT = gql`
  mutation updatePatient($id: ID!, $patientInput: PatientInput) {
    updatePatient(id: $id, patientInput: $patientInput) {
      id
      firstName
      lastName
      dob
      notes
      email
      phoneNumber
      gender
      address
      city
      zip
      interpreterNeeded
      language
      okToText
      urgentReferral
      preferredLocations
      consultationType
      attachedFiles {
        name
        url
      }
      additionalNotes
      comanageNo
      comanageYes
      clinics {
        id
      }
      providers {
        id
      }
    }
  }
`;
