import { gql } from '@apollo/client';

export const GET_PATIENT_CONTACT = gql`
  query GetReferralPatientContactInfo($patientId: ID!) {
    patientContactIndividual(patientId: $patientId) {
      id
      contactNotes
      dateAttemptedFirstContact
      dateComanagerAware
      dateInitialAppointmentScheduled
      dateReferralReceived
    }
  }
`;
