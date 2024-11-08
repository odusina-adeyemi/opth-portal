export const typeDef = `#graphql

    input UserCreateUpdateInput {
        email: String!
        firstName: String!
        lastName: String!
        organizationId: ID!
        role: String!
    }

    type User {
        id: ID!
        email: String
        firstName: String
        lastName: String
        organizationId: ID
        organization: Organization
        role: String
    }

    type Query {
        me(email: String!): User
        organizationUsers(organizationId: ID!): [User]
        user(id: ID!): User
    }

    type Mutation {
        createUser(userInput: UserCreateUpdateInput): User @auth
        deleteUser(id: ID!): User @auth
        updateUser(id: ID!, userInput: UserCreateUpdateInput): User @auth
    }
`;
