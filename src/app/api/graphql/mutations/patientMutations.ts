import { Patient } from '../../../../constants/types/types';
import { gql } from '@apollo/client';
import {
  array,
  boolean,
  defaulted,
  pattern,
  object,
  optional,
  string,
} from 'superstruct';
import {
  dateRegex,
  emailOrEmpty,
  idRegex,
  nameRegex,
  phoneNumberRegex,
} from '../../../../lib/utils/regexStructs';

export const CreatePatientStruct = object({
  clinics: array(pattern(string(), idRegex)),
  consentFormSigned: optional(boolean()),
  dob: pattern(string(), dateRegex),
  email: optional(defaulted(emailOrEmpty(), undefined)),
  firstName: pattern(string(), nameRegex),
  generalNotes: optional(string()),
  lastName: pattern(string(), nameRegex),
  organizationId: pattern(string(), idRegex),
  phoneNumber: optional(pattern(string(), phoneNumberRegex)),
  providers: array(pattern(string(), idRegex)),
  referringClinicId: pattern(string(), idRegex),
  referringProviderId: pattern(string(), idRegex),
  surgeonClinicId: optional(pattern(string(), idRegex)),
  surgeonId: optional(pattern(string(), idRegex)),
  referralInfoId: optional(pattern(string(), idRegex)),
  insuranceInfoId: optional(pattern(string(), idRegex)),
  appointmentInfoId: optional(pattern(string(), idRegex)),
});

export const UpdatePatientStruct = object({
  clinics: optional(array(pattern(string(), idRegex))),
  consentFormSigned: optional(boolean()),
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
  referralInfoId: optional(pattern(string(), idRegex)),
  insuranceInfoId: optional(pattern(string(), idRegex)),
  appointmentInfoId: optional(pattern(string(), idRegex)),
});

export type PatientCreateUpdateInputType = Omit<Patient, 'id'> & {
  clinics: string[];
  providers: string[];
};

export const ADD_PATIENT = gql`
  mutation createPatient($patientInput: PatientInput) {
    createPatient(patientInput: $patientInput) {
      id
      clinics {
        id
        providers {
          id
        }
      }
      consentFormSigned
      dob
      email
      firstName
      lastName
      phoneNumber
      referralInfoId
      insuranceInfoId
      appointmentInfoId
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
      clinics {
        id
        providers {
          id
        }
      }
      consentFormSigned
      dob
      email
      firstName
      lastName
      phoneNumber
      referralInfoId
      insuranceInfoId
      appointmentInfoId
    }
  }
`;
