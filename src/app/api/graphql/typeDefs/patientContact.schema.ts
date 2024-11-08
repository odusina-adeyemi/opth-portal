export const typeDef = `#graphql

    input PatientContactInput {
        clinics: [ID]
        contactNotes: String
        dateAttemptedFirstContact: String
        dateComanagerAware: String
        dateInitialAppointmentScheduled: String
        dateReferralReceived: String
        patientId: ID
        providers: [ID]
    }

    type PatientContact {
        id: ID!
        clinics: [ID]
        contactNotes: String
        dateAttemptedFirstContact: String
        dateComanagerAware: String
        dateInitialAppointmentScheduled: String
        dateReferralReceived: String
        patientId: ID
        providers: [ID]
    }

    type Query {
        patientContacts: [PatientContact]
        patientContact(id: ID!): PatientContact
        patientContactIndividual(patientId: ID!): PatientContact
    }

    type Mutation {
        createPatientContact(patientContactInput: PatientContactInput): PatientContact @auth
        deletePatientContact(id: ID!): PatientContact @auth
        updatePatientContact(id: ID!, patientContactInput: PatientContactInput): PatientContact @auth
    }

`;
