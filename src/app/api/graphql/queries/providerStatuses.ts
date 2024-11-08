import { gql } from '@apollo/client';

export const GET_PROVIDER_STATUSES = gql`
  query GetProviderStatuses($orgId: ID!) {
    providerStatuses(orgId: $orgId) {
      id
      description
      status
    }
  }
`;
