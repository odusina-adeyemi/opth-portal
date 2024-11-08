import { gql } from '@apollo/client';
import {
  array,
  boolean,
  nullable,
  number,
  pattern,
  object,
  optional,
  string,
} from 'superstruct';
import { dateTimeRegex, idRegex } from '../../../../lib/utils/regexStructs';

export const CreatePostOperationStruct = object({
  amountToBePaidFromInsurance: optional(nullable(number())),
  amountToPayProvider: optional(nullable(number())),
  checkDelivered: optional(nullable(boolean())),
  checkDeliveryPaperwork: optional(nullable(boolean())),
  checkNumber: optional(nullable(number())),
  clinics: optional(nullable(array(pattern(string(), idRegex)))),
  contactedReferrer: optional(nullable(boolean())),
  paidOptomDate: optional(nullable(pattern(string(), dateTimeRegex))),
  generalNotes: optional(nullable(string())),
  reasonNotReferredBack: optional(nullable(string())),
  referredBackToOriginalClinic: optional(nullable(boolean())),
  referralCompleted: optional(nullable(boolean())),
  referralCanceled: optional(nullable(boolean())),
  referralCanceledReason: optional(nullable(string())),
  patientId: optional(nullable(pattern(string(), idRegex))),
  providers: optional(nullable(array(pattern(string(), idRegex)))),
  postOpVisitDate: optional(nullable(pattern(string(), dateTimeRegex))),
  postOpVisitType: optional(nullable(string())),
  transferOfCare: optional(nullable(boolean())),
  transferOfCareDate: optional(nullable(pattern(string(), dateTimeRegex))),
  typeOfInsurance: optional(nullable(string())),
});

export const UpdatePostOperationStruct = CreatePostOperationStruct;

export const ADD_POST_OPERATION = gql`
  mutation createPostOperation($postOperationInput: PostOperationInput) {
    createPostOperation(postOperationInput: $postOperationInput) {
      id
      amountToBePaidFromInsurance
      amountToPayProvider
      checkDelivered
      checkDeliveryPaperwork
      checkNumber
      clinics {
        id
      }
      contactedReferrer
      generalNotes
      reasonNotReferredBack
      referredBackToOriginalClinic
      referralCompleted
      referralCanceled
      referralCanceledReason
      patientId
      providers {
        id
      }
      postOpVisitDate
      postOpVisitType
      transferOfCare
      transferOfCareDate
      typeOfInsurance
    }
  }
`;

export const DELETE_POST_OPERATION = gql`
  mutation deletePostOperation($id: ID!) {
    deletePostOperation(id: $id) {
      id
    }
  }
`;

export const UPDATE_POST_OPERATION = gql`
  mutation updatePostOperation(
    $id: ID!
    $postOperationInput: PostOperationInput
  ) {
    updatePostOperation(id: $id, postOperationInput: $postOperationInput) {
      id
      amountToBePaidFromInsurance
      amountToPayProvider
      checkDelivered
      checkDeliveryPaperwork
      checkNumber
      clinics {
        id
      }
      contactedReferrer
      generalNotes
      reasonNotReferredBack
      referredBackToOriginalClinic
      referralCompleted
      referralCanceled
      referralCanceledReason
      patientId
      providers {
        id
      }
      postOpVisitDate
      postOpVisitType
      transferOfCare
      transferOfCareDate
      typeOfInsurance
    }
  }
`;
