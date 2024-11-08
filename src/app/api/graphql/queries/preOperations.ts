import { gql } from '@apollo/client';

export const DELETE_PRE_OPERATION = gql`
  mutation deletePreOperation($id: ID!) {
    deletePreOperation(id: $id) {
      id
    }
  }
`;

export const GET_PATIENT_PRE_OPERATION = gql`
  query patientPreOperation($patientId: ID!) {
    patientPreOperation(patientId: $patientId) {
      id
      consultationReportSent
      delayReason
      delayLetterSent
      delayInSurgery
      eyesToBeDone
      firstEyeSurgeryDate
      firstEyeSurgeryType
      initialAppointmentCompleted
      isComanage
      isMedicare
      reasonNotComanage
      reasonNoSurgeryScheduled
      secondEyeSurgeryDate
      secondEyeSurgeryType
      surgeryScheduled
    }
  }
`;
