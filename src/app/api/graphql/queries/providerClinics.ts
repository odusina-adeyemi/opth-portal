import { gql } from '@apollo/client';

export const GET_PROVIDER_CLINIC_DOCUMENTS = gql`
  query GetProviderClinicsDocuments($clinicId: ID!, $providerId: ID!) {
    providerClinicDocuments(clinicId: $clinicId, providerId: $providerId) {
      clinicId
      consentFormOnFile
      hasDemographics
      hasW9
    }
  }
`;

export const GET_ALL_PROVIDER_CLINIC_DOCUMENTS = gql`
  query GetAllProviderClinicsDocuments($providerId: ID!) {
    allProviderClinicDocuments(providerId: $providerId) {
      clinicId
      consentFormOnFile
      hasDemographics
      hasW9
    }
  }
`;
