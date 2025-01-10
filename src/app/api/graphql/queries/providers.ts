import { gql, FetchPolicy } from '@apollo/client';
import { Provider, Patient } from '../../../../constants/types/types';
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
export const GET_PROVIDER_PATIENTS = gql`
  query GetProviderPatients($providerId: ID!) {
    providerPatients(providerId: $providerId) {
      id
      firstName
      lastName
      generalNotes
      preOperations {
        id
        eyesToBeDone
        firstEyeSurgeryDate
        secondEyeSurgeryDate
        delayInSurgery
        delayReason
        initialAppointmentCompleted
      }
      postOperations {
        id
        transferOfCare
        transferOfCareDate
        amountToPayProvider
        postOpVisitDate
        postOpVisitType
        referralCompleted
        paidOptomDate
        receivedOptomPostOpNotes
      }
      patientContacts {
        id
        dateInitialAppointmentScheduled
        dateReferralReceived
      }
      createdAt
    }
  }
`;


// const GET_ORGANIZATION_PROVIDERS_WITH_PATIENTS = gql`
//   query GetOrganizationProviders($organizationId: ID!) {
//     organizationProviders(organizationId: $organizationId) {
//       id
//       firstName
//       lastName
//       clinics {
//         id
//         name
//         city
//         state
//       }
//       patients {
//         id
//         firstName
//         lastName
//         generalNotes
//         preOperations {
//           id
//           eyesToBeDone
//           firstEyeSurgeryDate
//           secondEyeSurgeryDate
//           delayInSurgery
//           delayReason
//           initialAppointmentCompleted
//         }
//         postOperations {
//           id
//           transferOfCare
//           transferOfCareDate
//           amountToPayProvider
//           postOpVisitDate
//           postOpVisitType
//           referralCompleted
//           paidOptomDate
//           receivedOptomPostOpNotes
//         }
//         patientContacts {
//           id
//           dateInitialAppointmentScheduled
//           dateReferralReceived
//         }
//         createdAt
//       }
//     }
//   }
// `;



// export const GET_CURRENT_PROVIDER_PATIENTS = gql`
//   query GetCurrentProviderPatients {
//     currentProviderPatients {
//       id
//       firstName
//       lastName
//       preOperations {
//         id
//         eyesToBeDone
//         firstEyeSurgeryDate
//         secondEyeSurgeryDate
//       }
//       postOperations {
//         id
//         transferOfCareDateLeftEye
//         transferOfCareDateRightEye
//         referralCompleted
//       }
//       patientContacts {
//         id
//         dateInitialAppointmentScheduled
//         dateReferralReceived
//       }
//     }
//   }
// `;


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


export const fetchProviderPatients = async (
  providerId: string,
): Promise<Patient[]> => {
  try {
    const {
      data: { providerPatients },
    } = await client.query({
      query: GET_PROVIDER_PATIENTS,
      variables: { providerId },
      fetchPolicy: 'network-only',
    });

    return providerPatients ?? [];
  } catch (error) {
    console.error('Error fetching provider patients:', error);
    return [];
  }
};


// export const fetchOrganizationProvidersWithPatients = async (
//   organizationId: string,
// ): Promise<ProviderWithReferral[]> => {
//   try {
//     const {
//       data: { organizationProviders },
//     } = await client.query({
//       query: GET_ORGANIZATION_PROVIDERS_WITH_PATIENTS,
//       variables: { organizationId },
//     });

//     return organizationProviders ?? [];
//   } catch (error) {
//     return [];
//   }
// };