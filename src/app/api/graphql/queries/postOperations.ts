import { gql } from '@apollo/client';

export const GET_PATIENT_POST_OPERATION = gql`
  query patientPostOperation($patientId: ID!) {
    patientPostOperation(patientId: $patientId) {
      id
      amountToBePaidFromInsurance
      amountToPayProvider
      checkDelivered
      checkDeliveryPaperwork
      checkNumber
      contactedReferrer
      generalNotes
      paidOptomDate
      postOpVisitDate
      postOpVisitType
      reasonNotReferredBack
      referralCanceled
      referralCanceledReason
      referralCompleted
      referredBackToOriginalClinic
      transferOfCare
      transferOfCareDate
      typeOfInsurance
    }
  }
`;
