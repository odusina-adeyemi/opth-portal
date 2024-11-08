export const typeDef = `#graphql
    scalar Upload

    type FileResponse {
        id: ID!
        clinic: Clinic
        clinicId: ID
        url: String
        name: String
        provider: Provider
        providerId: ID
        signedUrl: String
        user: User
        updatedAt: String
    }

    input FileUploadInput {
        content: String! # Base64-encoded file
        filename: String!
        mimetype: String!
    }

    type Query {
        archivedFiles: [FileResponse!]!
        file(id: ID!): FileResponse
        providerClinicFile(clinicId: ID!, documentName: String!, providerId: ID!): FileResponse
        providerClinicFiles(clinicId: ID!, providerId: ID!): [FileResponse!]!
    }

    type Mutation {
        deleteFile(clinicId: ID!, providerId: ID!, documentName: String!): FileResponse @auth
        deleteFileById(id: ID!): FileResponse @auth
        uploadFile(clinicId: ID!, file: FileUploadInput!, documentName: String!, providerId: ID!): FileResponse! @auth
        unarchiveFile(id: ID!): FileResponse @auth
    }

`;
