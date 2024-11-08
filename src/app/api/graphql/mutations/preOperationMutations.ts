import { PreOperationData } from '../../../../constants/types/types';
import { gql } from '@apollo/client';
import {
  array,
  boolean,
  enums,
  nullable,
  object,
  optional,
  pattern,
  string,
} from 'superstruct';
import { dateTimeRegex, idRegex } from '../../../../lib/utils/regexStructs';
import { EYES_TO_BE_DONE, SURGERY_TYPES } from '../../../../constants/enums';

export const CreatePreOperationStruct = object({
  clinics: optional(array(pattern(string(), idRegex))),
  consultationReportSent: optional(nullable(boolean())),
  delayInSurgery: optional(nullable(boolean())),
  delayReason: optional(nullable(string())),
  delayLetterSent: optional(nullable(boolean())),
  eyesToBeDone: optional(nullable(enums(EYES_TO_BE_DONE))),
  firstEyeSurgeryDate: optional(nullable(pattern(string(), dateTimeRegex))),
  firstEyeSurgeryType: optional(nullable(enums(SURGERY_TYPES))),
  initialAppointmentCompleted: optional(nullable(boolean())),
  isComanage: optional(nullable(boolean())),
  isMedicare: optional(nullable(boolean())),
  patientId: optional(nullable(pattern(string(), idRegex))),
  providers: optional(nullable(array(pattern(string(), idRegex)))),
  reasonNotComanage: optional(nullable(string())),
  reasonNoSurgeryScheduled: optional(nullable(string())),
  secondEyeSurgeryDate: optional(nullable(pattern(string(), dateTimeRegex))),
  secondEyeSurgeryType: optional(nullable(enums(SURGERY_TYPES))),
  surgeryScheduled: optional(nullable(boolean())),
});

export const UpdatePreOperationStruct = CreatePreOperationStruct;

export type PreOperationCreateUpdateInput = Omit<PreOperationData, 'id'>;

export const ADD_PRE_OPERATION = gql`
  mutation createPreOperation($preOperationInput: PreOperationInput) {
    createPreOperation(preOperationInput: $preOperationInput) {
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
      reasonNotComanage
      reasonNoSurgeryScheduled
      secondEyeSurgeryDate
      secondEyeSurgeryType
      surgeryScheduled
    }
  }
`;

export const DELETE_PRE_OPERATION = gql`
  mutation deletePreOperation($id: ID!) {
    deletePreOperation(id: $id) {
      id
    }
  }
`;

export const UPDATE_PRE_OPERATION = gql`
  mutation updatePreOperation($id: ID!, $preOperationInput: PreOperationInput) {
    updatePreOperation(id: $id, preOperationInput: $preOperationInput) {
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
      reasonNotComanage
      reasonNoSurgeryScheduled
      secondEyeSurgeryDate
      secondEyeSurgeryType
      surgeryScheduled
    }
  }
`;
