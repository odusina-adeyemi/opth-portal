// export const typeDef = `#graphql

//     #  input type for creating a patient
//     input PatientInput {
//         clinics: [ID]
//         dob: String
//         email: String
//         firstName: String!
//         generalNotes: String
//         lastName: String!
//         organizationId: ID
//         phoneNumber: String
//         providers: [ID]
//         referringClinicId: ID
//         referringProviderId: ID
//         surgeonClinicId: ID
//         surgeonId: ID
//     }

//     type Patient {
//         id: ID!
//         clinics: [Clinic]
//         createdAt: String
//         dob: String
//         email: String
//         firstName: String
//         generalNotes: String
//         lastName: String
//         organizationId: ID
//         patientContacts: [PatientContact]
//         phoneNumber: String
//         preOperations: [PreOperation]
//         postOperations: [PostOperation]
//         providers: [Provider]
//         surgeonClinic: Clinic
//         surgeonClinicId: ID
//         referringClinic: Clinic
//         referringClinicId: ID
//         referringProvider: Provider
//         referringProviderId: ID
//         surgeon: Provider
//         surgeonId: ID
//     }

//     type Query {
//         organizationPatients(
//             organizationId: ID!,
//             referringClinicId: ID,
//             referringProviderId: ID,
//             startDate: String,
//             endDate: String
//             ): [Patient]
//         patients: [Patient]
//         patient(id: ID!): Patient
//     }

//     # Note to self: the mutation function found in patientMutation.ts must follow exactly
//     # the same structure as the createPatient mutation below
//     type Mutation {
//         createPatient(patientInput: PatientInput): Patient @auth
//         deletePatient(id: ID!): Patient @auth
//         updatePatient(id: ID!, patientInput: PatientInput): Patient @auth
//     }

// `;

// export const typeDef = `#graphql

//     # Input for appointment info
//     input AppointmentInfoInput {
//         doctor_specialty: String
//         preferred_locations: [String]
//         consultation_type: [String]
//         urgent_referral: Boolean
//         additional_conditions: String
//         chart_notes_attachments: [String]
//         co_manage_care: Boolean
//         dlv_assume_post_op_care: Boolean
//     }

//     # Input for referral info
//     input ReferralInfoInput {
//         referringclinicid: ID
//         referringproviderid: ID
//         referringemail: String
//         referringphone: String
//         referringfax: String
//         referringaddress: String
//         referringcity: String
//         referringstatezip: String
//     }

//     # Input for surgeon info
//     input SurgeonInfoInput {
//         id: ID
//         clinicId: ID
//     }

//     # Input for insurance info
//     input InsuranceInfoInput {
//         primaryInsuranceProviderId: String
//         primaryInsuranceIdNumber: String
//         primaryInsuranceGroupNumber: String
//         secondaryInsuranceProviderId: String
//         secondaryInsuranceIdNumber: String
//         secondaryInsuranceGroupNumber: String
//     }

//     # Input for file attachments
//     input FileInput {
//         name: String
//         url: String
//     }

//     # Input type for creating a patient
//     input PatientInput {
//         firstName: String!
//         lastName: String!
//         dob: String
//         notes: String
//         email: String
//         phoneNumber: String
//         gender: String
//         address: String
//         city: String
//         zip: String
//         interpreterNeeded: Boolean
//         language: String
//         okToText: Boolean
//         urgentReferral: Boolean
//         preferredLocations: [String]
//         consultationType: [String]
//         attachedFiles: [FileInput]
//         additionalNotes: String
//          comanageNo: Boolean
//           comanageYes: Boolean
//         appointment_info: AppointmentInfoInput
//         referral_info: ReferralInfoInput
//         surgeon: SurgeonInfoInput
//         insurance_info: InsuranceInfoInput
//         clinics: [ID]
//         providers: [ID]
//         organizationId: ID
//     }

//     # Patient type
//     type Patient {
//         id: ID!
//         firstName: String
//         lastName: String
//         dob: String
//         notes: String
//         email: String
//         phoneNumber: String
//         gender: String
//         address: String
//         city: String
//         zip: String
//         interpreterNeeded: Boolean
//         language: String
//         okToText: Boolean
//         urgentReferral: Boolean
//         preferredLocations: [String]
//         consultationType: [String]
//         attachedFiles: [File]
//         additionalNotes: String
//         comanageNo: Boolean
//         comanageYes: Boolean
//         appointment_info: AppointmentInfo
//         referral_info: ReferralInfo
//         surgeon: SurgeonInfo
//         insurance_info: InsuranceInfo
//         clinics: [Clinic]
//         providers: [Provider]
//         organizationId: ID
//     }

//     # Types for appointment info
//     type AppointmentInfo {
//         doctor_specialty: String
//         preferred_locations: [String]
//         consultation_type: [String]
//         urgent_referral: Boolean
//         additional_conditions: String
//         chart_notes_attachments: [String]
//         co_manage_care: Boolean
//         dlv_assume_post_op_care: Boolean
//     }

//     # Types for referral info
//     type ReferralInfo {
//         referringclinicid: ID
//         referringproviderid: ID
//         referringemail: String
//         referringphone: String
//         referringfax: String
//         referringaddress: String
//         referringcity: String
//         referringstatezip: String
//     }

//     # Types for surgeon info
//     type SurgeonInfo {
//         id: ID
//         clinicId: ID
//     }

//     # Types for insurance info
//     type InsuranceInfo {
//         primaryInsuranceProviderId: String
//         primaryInsuranceIdNumber: String
//         primaryInsuranceGroupNumber: String
//         secondaryInsuranceProviderId: String
//         secondaryInsuranceIdNumber: String
//         secondaryInsuranceGroupNumber: String
//     }

//     # Types for file attachments
//     type File {
//         name: String
//         url: String
//     }

//     # Queries
//     type Query {
//         organizationPatients(
//             organizationId: ID!,
//             referringClinicId: ID,
//             referringProviderId: ID,
//             startDate: String,
//             endDate: String
//         ): [Patient]
//         patients: [Patient]
//         patient(id: ID!): Patient
//     }

//     # Mutations
//     type Mutation {
//         createPatient(patientInput: PatientInput): Patient @auth
//         deletePatient(id: ID!): Patient @auth
//         updatePatient(id: ID!, patientInput: PatientInput): Patient @auth
//     }
// `;

// export const typeDef = `#graphql

export const typeDef = `#graphql

    # Input for appointment info
    input AppointmentInfoInput {
        doctorSpecialty: String
        preferredLocations: [String]
        consultationType: [String]
        urgentReferral: Boolean
        additionalConditions: String
        chartNotesAttachments: [String]
        coManageCare: Boolean
        dlvAssumePostOpCare: Boolean
    }

    # Input for referral info
    input ReferralInfoInput {
        referringClinicId: ID
        referringProviderId: ID
        referringEmail: String
        referringPhone: String
        referringFax: String
        referringAddress: String
        referringCity: String
        referringStateZip: String
    }

    # Input for surgeon info
    input SurgeonInfoInput {
        id: ID
        clinicId: ID
    }

    # Input for insurance info
    input InsuranceInfoInput {
        primaryInsuranceProviderId: String
        primaryInsuranceProviderName: String
        primaryInsuranceIdNumber: String
        primaryInsuranceGroupNumber: String
        secondaryInsuranceProviderId: String
        secondaryInsuranceProviderName: String
        secondaryInsuranceIdNumber: String
        secondaryInsuranceGroupNumber: String
    }

    # Input for file attachments
    input FileInput {
        name: String
        url: String
    }

    # Input type for creating/updating a patient
    input PatientInput {
        firstName: String!
        lastName: String!
        dob: String
        notes: String
        email: String
        phoneNumber: String
        gender: String
        address: String
        city: String
        zip: String
        fax: String
        interpreterNeeded: Boolean
        language: String
        okToText: Boolean
        urgentReferral: Boolean
        preferredLocations: [String]
        consultationType: [String]
        attachedFiles: [FileInput]
        additionalNotes: String
        comanageNo: Boolean    
        comanageYes: Boolean    
        signUpNewsLetter: Boolean
        appointmentInfo: AppointmentInfoInput
        referralInfo: [ReferralInfoInput]
        insuranceInfo: [InsuranceInfoInput] # Explicitly declare as an array
        surgeon: SurgeonInfoInput
        clinics: [ID]
        providers: [ID]
        organizationId: ID
    }

    # Patient type
    type Patient {
        id: ID!
        firstName: String
        lastName: String
        dob: String
        notes: String
        email: String
        phoneNumber: String
        gender: String
        address: String
        city: String
        zip: String
        fax: String
        interpreterNeeded: Boolean
        language: String
        okToText: Boolean
        urgentReferral: Boolean
        preferredLocations: [String]
        consultationType: [String]
        attachedFiles: [File]
        additionalNotes: String
        comanageNo: Boolean    
        comanageYes: Boolean
        signUpNewsLetter: Boolean
        generalNotes: String
        appointmentInfo: AppointmentInfo
        referralInfo: [ReferralInfo]
        surgeon: SurgeonInfo
        insuranceInfo: [InsuranceInfo] # Output type for patient data
        clinics: [Clinic]
        providers: [Provider]
        organizationId: ID
    }

    # Types for appointment info
    type AppointmentInfo {
        id: ID
        doctorSpecialty: String
        preferredLocations: [String]
        consultationType: [String]
        urgentReferral: Boolean
        additionalConditions: String
        chartNotesAttachments: [String]
        coManageCare: Boolean
        dlvAssumePostOpCare: Boolean
    }

    # Types for referral info
    type ReferralInfo {
        id: ID
        referringClinicId: ID
        referringProviderId: ID
        referringEmail: String
        referringPhone: String
        referringFax: String
        referringAddress: String
        referringCity: String
        referringStateZip: String
    }

    # Types for surgeon info
    type SurgeonInfo {
        id: ID
        clinicId: ID
    }

    # Types for insurance info
    type InsuranceInfo {
        id: ID
        primaryInsuranceProviderId: String
        primaryInsuranceProviderName: String
        primaryInsuranceIdNumber: String
        primaryInsuranceGroupNumber: String
        secondaryInsuranceProviderId: String
        secondaryInsuranceProviderName: String
        secondaryInsuranceIdNumber: String
        secondaryInsuranceGroupNumber: String
    }

    # Types for file attachments
    type File {
        name: String
        url: String
    }

    # Queries
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

    # Mutations
    type Mutation {
        createPatient(patientInput: PatientInput): Patient @auth
        deletePatient(id: ID!): Patient @auth
        updatePatient(id: ID!, patientInput: PatientInput): Patient @auth
    }

`;
