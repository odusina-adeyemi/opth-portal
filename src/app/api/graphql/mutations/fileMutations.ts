import { gql } from '@apollo/client';

export const FILE_UPLOAD = gql`
  mutation FileUpload(
    $clinicId: ID!
    $documentName: String!
    $file: FileUploadInput!
    $providerId: ID!
  ) {
    uploadFile(
      clinicId: $clinicId
      documentName: $documentName
      file: $file
      providerId: $providerId
    ) {
      url
      name
    }
  }
`;

export const DELETE_FILE = gql`
  mutation DeleteFile(
    $clinicId: ID!
    $documentName: String!
    $providerId: ID!
  ) {
    deleteFile(
      clinicId: $clinicId
      documentName: $documentName
      providerId: $providerId
    ) {
      id
    }
  }
`;

export const DELETE_FILE_BY_ID = gql`
  mutation DeleteFileById($id: ID!) {
    deleteFileById(id: $id) {
      id
    }
  }
`;

export const UNARCHIVE_FILE = gql`
  mutation UnarchiveFile($id: ID!) {
    unarchiveFile(id: $id) {
      id
    }
  }
`;
