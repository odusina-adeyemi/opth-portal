import { gql } from '@apollo/client';

export const GET_FILE = gql`
  query GetFile($id: ID!) {
    file(id: $id) {
      id
      clinic {
        id
      }
      name
      provider {
        id
        clinics {
          id
        }
      }
      signedUrl
      url
    }
  }
`;

export const GET_PROVIDER_CLINIC_FILE = gql`
  query GetProviderClinicFile(
    $clinicId: ID!
    $documentName: String!
    $providerId: ID!
  ) {
    providerClinicFile(
      clinicId: $clinicId
      documentName: $documentName
      providerId: $providerId
    ) {
      id
      clinicId
      providerId
      name
      signedUrl
      url
    }
  }
`;

export const GET_PROVIDER_CLINIC_FILES = gql`
  query GetProviderClinicFiles($clinicId: ID!, $providerId: ID!) {
    providerClinicFiles(clinicId: $clinicId, providerId: $providerId) {
      id
      clinicId
      name
      providerId
      url
    }
  }
`;

export const GET_ARCHIVED_FILES = gql`
  query GetArchivedFiles {
    archivedFiles {
      id
      clinic {
        id
        name
      }
      name
      provider {
        id
        firstName
        lastName
      }
      signedUrl
      url
      user {
        id
        firstName
        lastName
      }
      updatedAt
    }
  }
`;
