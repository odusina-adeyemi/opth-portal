export const typeDef = `#graphql

    #  input type for creating a patient
    input PatientInput {
        clinics: [ID]
        consentFormSigned: Boolean
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
        referralInfoId: ID
        insuranceInfoId: ID
        appointmentInfoId: ID
    }

    type Patient {
        id: ID!
        clinics: [Clinic]
        consentFormSigned: Boolean
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
        referralInfo: ReferralInfo
        referralInfoId: ID
        insuranceInfo: InsuranceInfo
        insuranceInfoId: ID
        appointmentInfo: AppointmentInfo
        appointmentInfoId: ID
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

    type Mutation {
        createPatient(patientInput: PatientInput): Patient @auth
        deletePatient(id: ID!): Patient @auth
        updatePatient(id: ID!, patientInput: PatientInput): Patient @auth
    }

`;
