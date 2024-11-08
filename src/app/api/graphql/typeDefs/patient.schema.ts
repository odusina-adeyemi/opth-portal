export const typeDef = `#graphql

    #  input type for creating a patient
    input PatientInput {
        clinics: [ID]
        dob: String
        email: String
        firstName: String!
        generalNotes: String
        lastName: String!
        organizationId: ID
        phoneNumber: String
        providers: [ID]
        referringClinicId: ID
        referringProviderId: ID
        surgeonClinicId: ID
        surgeonId: ID
    }

    type Patient {
        id: ID!
        clinics: [Clinic]
        createdAt: String
        dob: String
        email: String
        firstName: String
        generalNotes: String
        lastName: String
        organizationId: ID
        patientContacts: [PatientContact]
        phoneNumber: String
        preOperations: [PreOperation]
        postOperations: [PostOperation]
        providers: [Provider]
        surgeonClinic: Clinic
        surgeonClinicId: ID
        referringClinic: Clinic
        referringClinicId: ID
        referringProvider: Provider
        referringProviderId: ID
        surgeon: Provider
        surgeonId: ID
    }


    type Query {
        organizationPatients(
            organizationId: ID!, 
            referringClinicId: ID,
            referringProviderId: ID,
            startDate: String, 
            endDate: String
            ): [Patient]
        patients: [Patient]
        patient(id: ID!): Patient
    }

    # Note to self: the mutation function found in patientMutation.ts must follow exactly
    # the same structure as the createPatient mutation below
    type Mutation {
        createPatient(patientInput: PatientInput): Patient @auth
        deletePatient(id: ID!): Patient @auth
        updatePatient(id: ID!, patientInput: PatientInput): Patient @auth
    }

`;
