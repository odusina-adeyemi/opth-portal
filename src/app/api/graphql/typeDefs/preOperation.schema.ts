export const typeDef = `#graphql

    input PreOperationInput {
        clinics: [ID]
        consultationReportSent: Boolean
        delayInSurgery: Boolean
        delayReason: String
        delayLetterSent: Boolean
        eyesToBeDone: String
        firstEyeSurgeryDate: String
        firstEyeSurgeryType: String
        initialAppointmentCompleted: Boolean
        isComanage: Boolean
        isMedicare: Boolean
        patientId: ID
        providers: [ID]
        reasonNotComanage: String
        reasonNoSurgeryScheduled: String
        secondEyeSurgeryDate: String
        secondEyeSurgeryType: String
        surgeryScheduled: Boolean
    }

      type PreOperation {
        id: ID!
        clinics: [Clinic]
        consultationReportSent: Boolean
        delayInSurgery: Boolean
        delayReason: String
        delayLetterSent: Boolean
        eyesToBeDone: String
        firstEyeSurgeryDate: String
        firstEyeSurgeryType: String
        initialAppointmentCompleted: Boolean
        isComanage: Boolean
        isMedicare: Boolean
        patientId: ID
        providers: [Provider]
        reasonNotComanage: String
        reasonNoSurgeryScheduled: String
        secondEyeSurgeryDate: String
        secondEyeSurgeryType: String
        surgeryScheduled: Boolean
    }

    type Query {
        preOperations: [PreOperation]
        preOperation(id: ID!): PreOperation
        patientPreOperation(patientId: ID!): PreOperation
    }

    type Mutation {
        createPreOperation(preOperationInput: PreOperationInput): PreOperation @auth
        deletePreOperation(id: ID!): PreOperation @auth
        updatePreOperation(id: ID!, preOperationInput: PreOperationInput): PreOperation @auth
    }

`;
