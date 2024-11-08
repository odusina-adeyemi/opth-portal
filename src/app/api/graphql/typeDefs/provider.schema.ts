export const typeDef = `#graphql

    input ProviderInput {
        clinics: [ID!]
        consentFormOnFile: Boolean
        dateVisitedByLiaison: String
        dateVisitedByProvider: String
        email: String
        existingClinicIds: [ID!]
        firstName: String
        hasDemographics: Boolean
        hasW9: Boolean
        image: String
        lastName: String
        notes: String
        organizationId: ID
        paperworkUpToDate: Boolean
        phoneNumber: String
        specialties: [String]
        status: String
        type: String
        users: [ID!]
    }

    type Provider {
        id: ID!
        consentFormOnFile: Boolean
        dateVisitedByLiaison: String
        dateVisitedByProvider: String
        clinics: [Clinic]
        email: String
        firstName: String
        hasDemographics: Boolean
        hasW9: Boolean
        image: String
        lastName: String
        notes: String
        patientContacts: [PatientContact]
        paperworkUpToDate: Boolean
        patients: [Patient]
        phoneNumber: String
        preOperations: [PreOperation]
        providerClinics: [ProviderClinic]
        postOperations: [PostOperation]
        specialties: [String]
        status: String
        type: String
        users: [User]
    }

    type Query {
        organizationProviders(organizationId: ID!): [Provider]       
        providers(state: String, type: String): [Provider]
        provider(id: ID!): Provider
    }

    type Mutation {
        createProvider(providerInput: ProviderInput): Provider @auth
        deleteProvider(id: ID!): Provider @auth
        updateProvider(id: ID!, providerInput: ProviderInput): Provider @auth
    }

`;
