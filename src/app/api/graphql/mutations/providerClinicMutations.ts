import { gql } from '@apollo/client';
import {
  array,
  boolean,
  defaulted,
  object,
  optional,
  pattern,
  string,
} from 'superstruct';
import { idRegex } from '../../../../lib/utils/regexStructs';
import { Clinic } from '../../../../constants/types/types';
import { CheckboxStatesClinicProviderDocuments } from '../../../providers/_components/ProviderForm';

export type ProviderClinicCreateUpdateInput = {
  clinicId: string;
  consentFormOnFile: boolean;
  hasDemographics: boolean;
  hasW9: boolean;
  providerId: string;
}[];

export const CreateProviderClinicStruct = object({
  clinicId: pattern(string(), idRegex),
  consentFormOnFile: defaulted(boolean(), false),
  hasDemographics: defaulted(boolean(), false),
  hasW9: defaulted(boolean(), false),
  providerId: pattern(string(), idRegex),
});

export const UpdateProviderClinicStruct = object({
  clinicId: pattern(string(), idRegex),
  consentFormOnFile: optional(boolean()),
  hasDemographics: optional(boolean()),
  hasW9: optional(boolean()),
  providerId: pattern(string(), idRegex),
});

export const ADD_PROVIDER_CLINIC = gql`
  mutation createProviderClinic($providerClinicInput: [ProviderClinicInput]) {
    createProviderClinic(providerClinicInput: $providerClinicInput) {
      providerId
    }
  }
`;

export const DELETE_PROVIDER_CLINIC = gql`
  mutation deleteProviderClinic($providerId: ID!) {
    deleteProviderClinic(providerId: $providerId) {
      providerId
    }
  }
`;

export const UPDATE_PROVIDER_CLINIC = gql`
  mutation updateProviderClinic($providerClinicInput: [ProviderClinicInput]) {
    updateProviderClinic(providerClinicInput: $providerClinicInput) {
      consentFormOnFile
      hasDemographics
      hasW9
    }
  }
`;
