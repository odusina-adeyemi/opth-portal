import {
  gql,
  FetchPolicy,
  // DocumentNode,
  useQuery as apolloUseQuery,
} from '@apollo/client';
import { Provider, Patient, PostOperation, PreOperationData} from '../../../../constants/types/types';
import client from '../../_apolloClient/apolloClientServerSide';
import { DocumentNode } from 'graphql';

export interface ProviderWithPatients extends Provider {
  patients: Patient[];
}

export interface ProviderPatientsQuery {
  providerPatients: Provider[]; // Or your equivalent `Provider` type
}


export interface ProviderWithRevenue extends Provider {
  revenue: {
    ytd: number;
    mtd: number;
    totalPatientsYTD: number;
    totalPatientsMTD: number;
  };
}

export interface ProviderWithPatientsAndRevenue extends ProviderWithPatients {
  revenue: {
    ytd: number;
    mtd: number;
    totalPatientsYTD: number;
    totalPatientsMTD: number;
  };
}


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

export const GET_CURRENT_PROVIDER_PATIENTS = gql`
  query GetCurrentProviderPatients {
    currentProviderPatients {
      id
      firstName
      lastName
      generalNotes
      preOperations {
        eyesToBeDone
        delayInSurgery
        delayReason
        firstEyeSurgeryDate
        secondEyeSurgeryDate
        initialAppointmentCompleted
        consultationReportSent
      }
      postOperations {
        transferOfCare
        transferOfCareDate
        postOpVisitDate
        postOpVisitType
        referralCompleted
        referralCanceled
        amountToPayProvider
        checkNumber
        paidOptomDate
        insuranceType
        reasonNotReferredBack
        receivedOptomPostOpNotes
      }
      patientContacts {
        dateInitialAppointmentScheduled
      }
      surgeonId
    }
  }
`;

export const GET_PROVIDER_PATIENTS = gql`
 query providerPatients($providerId: ID!) {
    providerPatients(providerId: $providerId) {
      id
      firstName
      lastName
      patients {
        id
        firstName
        lastName
        dob
        referringProviderId
        postOperations {
        id
        transferOfCare
        transferOfCareDate
        postOpVisitDate
        postOpVisitType
        referralCompleted
        referralCanceled
        amountToPayProvider
        checkNumber
        paidOptomDate
        insuranceType
        reasonNotReferredBack
        receivedOptomPostOpNotes
        }
          preOperations { 
          id
          eyesToBeDone
          delayInSurgery
          delayReason
          firstEyeSurgeryDate
          secondEyeSurgeryDate
          initialAppointmentCompleted
          consultationReportSent


        }

       }
     
     
    }
  }
`;

export const GET_PROVIDER_PATIENTS_WITH_DETAILS = gql`
  query GetProviderPatients($providerId: String!) {
    provider(where: { id: $providerId }) {
      id
      firstName
      lastName
      patients {
        id
        firstName
        lastName
        dob
        referringProviderId
      }
    }
  }
`;

export const GET_REVENUE_STATS = gql`
  query GetRevenueStats($providerId: ID!) {
    revenueStats(providerId: $providerId) {
      ytdRevenue
      mtdRevenue
      ytdPatients
      mtdPatients
    }
  }
`;

const GET_PROVIDER_REVENUE = gql`
  query GetProviderRevenue($providerId: ID!) {
    providerRevenue(providerId: $providerId) {
      ytd
      mtd
      totalPatientsYTD
      totalPatientsMTD
    }
  }
`;

// Fetch patients for the logged-in provider
// export const fetchProviderPatients = async (providerId: string) => {
//   try {
//     const { data } = await client.query({
//       query: GET_PROVIDER_PATIENTS,
//       variables: { providerId },
//       fetchPolicy: 'network-only', // Always fetch fresh data
//     });

//     if (data?.providerPatients) {
//       return data.providerPatients;
//     } else {
//       console.warn('No patients found for the provider.');
//       return [];
//     }
//   } catch (error) {
//     console.error('Error fetching provider patients:', error);
//     return [];
//   }
// };

// export const fetchProviderPatients = async (providerId: string) => {
//   try {
//     const { data } = await client.query({
//       query: GET_PROVIDER_PATIENTS,
//       variables: { providerId },
//       fetchPolicy: "network-only", // Always fetch fresh data
//     });

//     if (data?.providerPatients) {
//       return data.providerPatients;
//     } else {
//       console.warn("No patients found for the provider.");
//       return [];
//     }
//   } catch (error) {
//     console.error("Error fetching provider patients:", error);
//     return [];
//   }
// };

export const fetchProviderPatients = async (providerId: string) : Promise<Provider[]> => {
  try {
    const {
      data: { providerPatients },
    } = await client.query({
      fetchPolicy: 'network-only',
      query: GET_PROVIDER_PATIENTS,
      variables: { providerId },
    });
    return providerPatients ?? [];
    
  } catch (error) {
    console.error('Error fetching provider patients:', error);
    return [];
  }
};

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
// export const useRevenueStats = (providerId: string) => {
//   const { data, loading, error } = useQuery(GET_REVENUE_STATS, {
//     variables: { providerId },
//   });
//   return { data, loading, error };
// };

// export const GET_PROVIDER_PATIENTS = gql`
//   query GetProviderPatients($providerId: ID!) {
//     providerPatients(providerId: $providerId) {
//       id
//       firstName
//       lastName
//       generalNotes
//       preOperations {
//         id
//         eyesToBeDone
//         firstEyeSurgeryDate
//         secondEyeSurgeryDate
//         delayInSurgery
//         delayReason
//         initialAppointmentCompleted
//       }
//       postOperations {
//         id
//         transferOfCare
//         transferOfCareDate
//         amountToPayProvider
//         postOpVisitDate
//         postOpVisitType
//         referralCompleted
//         paidOptomDate
//         receivedOptomPostOpNotes
//       }
//       patientContacts {
//         id
//         dateInitialAppointmentScheduled
//         dateReferralReceived
//       }
//       createdAt
//     }
//   }
// `;

// export const useProviderPatients = (providerId: string) => {
//   const { loading, error, data } = apolloUseQuery(GET_PROVIDER_PATIENTS, {
//     variables: { providerId },
//   });
// console.log("data",data)
//   return { loading, error, patients: data?.providerPatients || [] };
// };

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

// async function query({
//   fetchPolicy,
//   query,
//   variables,
// }: {
//   fetchPolicy: FetchPolicy;
//   query: import('graphql').DocumentNode;
//   variables: { id: string };
// }): Promise<{ data: { provider: any } }> {
//   return client.query({
//     fetchPolicy,
//     query,
//     variables,
//   });
// }

// export const fetchProviderPatients = async (
//   providerId: string,
// ): Promise<Patient[]> => {
//   try {
//     const {
//       data: { providerPatients },
//     } = await client.query({
//       query: GET_PROVIDER_PATIENTS,
//       variables: { providerId },
//       fetchPolicy: 'network-only',
//     });

//     return providerPatients ?? [];
//   } catch (error) {
//     console.error('Error fetching provider patients:', error);
//     return [];
//   }
// };

// export const fetchCurrentProviderPatients = async (): Promise<Patient[]> => {
//   try {
//     const { data } = await client.query({
//       query: GET_CURRENT_PROVIDER_PATIENTS,
//       fetchPolicy: 'network-only',
//     });

//     return data.currentProviderPatients || [];
//   } catch (error) {
//     console.error('Error fetching current provider patients:', error);
//     return [];
//   }
// };

async function query({
  fetchPolicy,
  query,
  variables,
}: {
  fetchPolicy: FetchPolicy;
  query: DocumentNode;
  variables: { id: string };
}): Promise<{ data: { provider: any } }> {
  return client.query({
    fetchPolicy,
    query,
    variables,
  });
}
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
