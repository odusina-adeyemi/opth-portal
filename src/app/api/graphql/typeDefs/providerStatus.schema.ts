export const typeDef = `#graphql

    input ProviderStatusInput {
        description: String
        organizationId: ID
        status: String
    }

    type ProviderStatus {
        id: ID!
        description: String
        organizationId: ID
        status: String
    }

    type Query {
        providerStatus(id: ID!): ProviderStatus
        providerStatuses(orgId: ID!): [ProviderStatus]
    }

    type Mutation {
        createProviderStatus(providerStatusInput: ProviderStatusInput): ProviderStatus @auth
        deleteProviderStatus(id: ID!): ProviderStatus @auth
        updateProviderStatus(id: ID!, providerStatusInput: ProviderStatusInput): ProviderStatus @auth
    }

`;
