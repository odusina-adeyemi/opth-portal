export const typeDef = `#graphql

  input ProviderClinicInput {
    clinicId: ID!
    consentFormOnFile: Boolean
    hasDemographics: Boolean
    hasW9: Boolean
    providerId: ID!
  }

  type ProviderClinic {
    clinicId: ID
    clinic: Clinic
    consentFormOnFile: Boolean
    hasDemographics: Boolean
    hasW9: Boolean
    providerId: ID
    provider: Provider
  }

  type Query {
    allProviderClinicDocuments(providerId: ID!): [ProviderClinic]
    providerClinicDocuments(clinicId: ID!, providerId: ID!): ProviderClinic
  }

  type Mutation {
    createProviderClinic(providerClinicInput: [ProviderClinicInput]): ProviderClinic @auth
    deleteProviderClinic(providerId: ID!): ID @auth
    updateProviderClinic(providerClinicInput: [ProviderClinicInput]): ProviderClinic @auth
  }
`;
