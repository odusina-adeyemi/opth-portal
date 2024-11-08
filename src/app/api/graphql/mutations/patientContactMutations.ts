import { gql } from '@apollo/client';
import {
  array,
  nullable,
  object,
  optional,
  pattern,
  string,
} from 'superstruct';
import { dateTimeRegex, idRegex } from '../../../../lib/utils/regexStructs';

export const CreatePatientContactStruct = object({
  clinics: optional(array(pattern(string(), idRegex))), // m-m relationship
  contactNotes: optional(nullable(string())),
  dateAttemptedFirstContact: optional(
    nullable(pattern(string(), dateTimeRegex)),
  ),
  dateComanagerAware: optional(nullable(pattern(string(), dateTimeRegex))),
  dateInitialAppointmentScheduled: optional(
    nullable(pattern(string(), dateTimeRegex)),
  ),
  dateReferralReceived: optional(nullable(pattern(string(), dateTimeRegex))),
  patientId: optional(pattern(string(), idRegex)),
  providers: optional(array(pattern(string(), idRegex))), // m-m relationship
});

export const UpdatePatientContactStruct = CreatePatientContactStruct;

export const ADD_PATIENT_CONTACT = gql`
  mutation createPatientContact($patientContactInput: PatientContactInput) {
    createPatientContact(patientContactInput: $patientContactInput) {
      id
      contactNotes
      dateAttemptedFirstContact
      dateComanagerAware
      dateInitialAppointmentScheduled
      dateReferralReceived
    }
  }
`;

export const DELETE_PATIENT_CONTACT = gql`
  mutation deletePatientContact($id: ID!) {
    deletePatientContact(id: $id) {
      id
    }
  }
`;

export const UPDATE_PATIENT_CONTACT = gql`
  mutation updatePatientContact(
    $id: ID!
    $patientContactInput: PatientContactInput
  ) {
    updatePatientContact(id: $id, patientContactInput: $patientContactInput) {
      id
      contactNotes
      dateAttemptedFirstContact
      dateComanagerAware
      dateInitialAppointmentScheduled
      dateReferralReceived
    }
  }
`;
