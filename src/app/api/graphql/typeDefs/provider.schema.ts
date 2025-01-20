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
        users: User
    }




    type Patient {
  id: ID!
  firstName: String
  lastName: String
  surgeryType: String
  firstEyeSurgeryDate: String
  secondEyeSurgeryDate: String
  generalNotes: String
  delayInSurgery: Boolean
  delayReason: String
  eyesToBeDone: String
  reasonNoSurgeryScheduled: String
  initialAppointmentCompleted: Boolean
  consultationReportSent: Boolean
  transferOfCare: Boolean
  transferOfCareDate: String
  paidOptomDate: String
  checkNumber: Int
  amountToPayProvider: Float
  insuranceType: String
  reasonNotReferredBack: String
  referralCanceled: Boolean
  referralCompleted: Boolean
  postOpVisitDate: String
  postOpVisitType: String
  surgeonName: String
  receivedOptomPostOpNotes: Boolean
}




    type Query {
        organizationProviders(organizationId: ID!): [Provider]       
        providers(state: String, type: String): [Provider]
        provider(id: ID!): Provider
        providerPatients: [Patient!]!
  organizationPatients(orgId: String!): [Patient!]!
    }

    type Mutation {
        createProvider(providerInput: ProviderInput): Provider @auth
        deleteProvider(id: ID!): Provider @auth
        updateProvider(id: ID!, providerInput: ProviderInput): Provider @auth
    }

`;