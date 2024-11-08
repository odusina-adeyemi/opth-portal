import { ProviderStatus } from '../../../../constants/types/types';
import { gql } from '@apollo/client';
import { object, pattern, string } from 'superstruct';
import { idRegex } from '../../../../lib/utils/regexStructs';

export type ProviderStatusCreateUpdateInput = Omit<ProviderStatus, 'id'>;

export const CreateProviderStatusStruct = object({
  description: string(),
  organizationId: pattern(string(), idRegex),
  status: string(),
});

export const UpdateProviderStatusStruct = object({
  description: string(),
  organizationId: pattern(string(), idRegex),
  status: string(),
});

export const ADD_PROVIDER_STATUS = gql`
  mutation createProviderStatus($providerStatusInput: ProviderStatusInput) {
    createProviderStatus(providerStatusInput: $providerStatusInput) {
      id
      description
      status
    }
  }
`;

export const UPDATE_PROVIDER_STATUS = gql`
  mutation UpdateProviderStatus(
    $id: ID!
    $providerStatusInput: ProviderStatusInput
  ) {
    updateProviderStatus(id: $id, providerStatusInput: $providerStatusInput) {
      id
      description
      status
    }
  }
`;

export const DELETE_PROVIDER_STATUS = gql`
  mutation DeleteProviderStatus($id: ID!) {
    deleteProviderStatus(id: $id) {
      id
    }
  }
`;
