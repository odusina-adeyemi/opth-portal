export const typeDef = `#graphql

  input ClinicInput {
    address: String
    city: String
    email: String
    existingProviderIds: [ID!]
    faxNumber: String
    name: String
    notes: String
    organizationId: ID
    phoneNumber: String
    providers: [ID!]
    referralManager: String
    referrerStatusTimeline: [String]
    state: String
    type: String
    users: [ID!]
    zipCode: String
  }

  type Clinic {
    id: ID!
    address: String
    city: String
    email: String
    faxNumber: String
    name: String
    notes: String
    operations: [Int]
    organizationId: ID
    patients: [Patient]
    preOperations: [Int]
    postOperations: [Int]
    phoneNumber: String
    providers: [Provider]
    referralManager: String
    referrerStatusTimeline: [String]
    state: String
    type: String
    users: [User]
    zipCode: String
  }

  type Query {
    clinic(id: ID!): Clinic
    clinics: [Clinic]
    Clinic(id: ID!): Clinic
    organizationClinics(organizationId: ID!): [Clinic]
    providersClinics(providerIds: [ID!]!, type: String): [Clinic]
  }

  type Mutation {
    createClinic(clinicInput: ClinicInput): Clinic @auth
    deleteClinic(id: ID!): Clinic @auth
    updateClinic(id: ID!, clinicInput: ClinicInput): Clinic @auth
    updateClinicReferrerStatusTimeline(ids: [ID!], referrerStatus: String, timeline: String): Clinic @auth
  }
`;
