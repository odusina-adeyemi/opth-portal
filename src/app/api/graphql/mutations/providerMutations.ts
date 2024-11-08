import { Provider } from '../../../../constants/types/types';
import { gql } from '@apollo/client';
import {
  array,
  boolean,
  defaulted,
  enums,
  nullable,
  object,
  optional,
  pattern,
  string,
} from 'superstruct';
import {
  dateRegex,
  emailOrEmpty,
  idRegex,
  nameRegex,
  phoneNumberRegex,
  typeRegex,
} from '../../../../lib/utils/regexStructs';
import {
  PROVIDER_REFERRER_STATUS,
  PROVIDER_SPECIALTIES,
} from '../../../../constants/enums';

export const CreateProviderStruct = object({
  clinics: array(pattern(string(), idRegex)),
  consentFormOnFile: optional(boolean()),
  dateVisitedByLiaison: optional(pattern(string(), dateRegex)),
  dateVisitedByProvider: optional(pattern(string(), dateRegex)),
  email: optional(emailOrEmpty()),
  existingClinicIds: optional(array(pattern(string(), idRegex))),
  firstName: pattern(string(), nameRegex),
  hasDemographics: optional(boolean()),
  hasW9: optional(boolean()),
  image: optional(string()),
  lastName: pattern(string(), nameRegex),
  notes: optional(string()),
  organizationId: pattern(string(), idRegex),
  phoneNumber: optional(pattern(string(), phoneNumberRegex)),
  specialties: optional(nullable(array(enums(PROVIDER_SPECIALTIES)))),
  status: optional(string()), // set default names or leave customizable?
  // status: optional(enums(PROVIDER_REFERRER_STATUS)), // set default names or leave customizable?
  type: pattern(string(), typeRegex),
  users: optional(array(pattern(string(), idRegex))),
});

export const UpdateProviderStruct = object({
  clinics: optional(array(pattern(string(), idRegex))),
  consentFormOnFile: optional(boolean()),
  dateVisitedByLiaison: optional(pattern(string(), dateRegex)),
  dateVisitedByProvider: optional(pattern(string(), dateRegex)),
  email: optional(emailOrEmpty()),
  existingClinicIds: optional(array(pattern(string(), idRegex))),
  firstName: optional(pattern(string(), nameRegex)),
  hasDemographics: optional(boolean()),
  hasW9: optional(boolean()),
  image: optional(string()),
  lastName: optional(pattern(string(), nameRegex)),
  organizationId: pattern(string(), idRegex),
  notes: optional(string()),
  phoneNumber: optional(pattern(string(), phoneNumberRegex)),
  specialties: optional(nullable(array(enums(PROVIDER_SPECIALTIES)))),
  status: optional(string()),
  // status: optional(enums(PROVIDER_REFERRER_STATUS)),
  type: optional(pattern(string(), typeRegex)),
  users: optional(array(pattern(string(), idRegex))),
});

export type ProviderCreateUpdateInput = Omit<Provider, 'id'> & {
  clinics: string[];
  existingClinicIds: string[];
};

export const ADD_PROVIDER = gql`
  mutation createProvider($providerInput: ProviderInput) {
    createProvider(providerInput: $providerInput) {
      id
      clinics {
        id
      }
      firstName
      lastName
      paperworkUpToDate
      status
      specialties
      type
    }
  }
`;

export const DELETE_PROVIDER = gql`
  mutation deleteProvider($id: ID!) {
    deleteProvider(id: $id) {
      id
    }
  }
`;

export const UPDATE_PROVIDER = gql`
  mutation updateProvider($id: ID!, $providerInput: ProviderInput) {
    updateProvider(id: $id, providerInput: $providerInput) {
      id
      clinics {
        id
      }
      firstName
      lastName
      paperworkUpToDate
      status
      specialties
      type
    }
  }
`;
