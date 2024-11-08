export const typeDef = `#graphql

    type Organization {
        id: String
        clinics: [Clinic] # array of clinics
        name: String!
        patients: [Patient] # array of patients
        providers: [Provider] # array of providers
        users: [User] # array of users
    }

    type Query {
        organization(id: ID!): Organization
        organizations: [Organization]
    }



`;
