import { gql, FetchPolicy } from '@apollo/client';
import { Provider } from '../../../../constants/types/types';
import client from '../../_apolloClient/apolloClientServerSide';
export interface ProviderWithReferral extends Provider {
  lastReferralDate: Date | null | undefined;
}

export const GET_ORGANIZATION_PROVIDERS = gql`
  query GetOrganizationProviders($organizationId: ID!) {
    organizationProviders(organizationId: $organizationId) {
      id
      clinics {
        id
        city
        name
        state
      }
      dateVisitedByLiaison
      dateVisitedByProvider
      email
      firstName
      lastName
      notes
      phoneNumber
      providerClinics {
        clinicId
        consentFormOnFile
        hasDemographics
        hasW9
      }
      specialties
      status
      type
    }
  }
`;

export const GET_PROVIDER = gql`
  query provider($id: ID!) {
    provider(id: $id) {
      id
      clinics {
        id
        name
        city
        state
        type
      }
      dateVisitedByLiaison
      dateVisitedByProvider
      email
      firstName
      lastName
      image
      notes
      phoneNumber
      specialties
      status
      type
    }
  }
`;

export const fetchOrganizationProviders = async (
  organizationId: string,
): Promise<Provider[]> => {
  try {
    const {
      data: { organizationProviders },
    } = await client.query({
      query: GET_ORGANIZATION_PROVIDERS,
      variables: { organizationId },
    });

    return organizationProviders ?? [];
  } catch (error) {
    return [];
  }
};

export const fetchProvider = async (id: string): Promise<Provider> => {
  try {
    const {
      data: { provider },
    } = await query({
      fetchPolicy: 'network-only',
      query: GET_PROVIDER,
      variables: { id },
    });

    return provider ?? {};
  } catch (error) {
    return {} as Provider;
  }
};

async function query({
  fetchPolicy,
  query,
  variables,
}: {
  fetchPolicy: FetchPolicy;
  query: import('graphql').DocumentNode;
  variables: { id: string };
}): Promise<{ data: { provider: any } }> {
  return client.query({
    fetchPolicy,
    query,
    variables,
  });
}
