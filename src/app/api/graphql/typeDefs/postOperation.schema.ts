export const typeDef = `#graphql

    input PostOperationInput {
        amountToBePaidFromInsurance: Float 
        amountToPayProvider: Float 
        checkDelivered: Boolean
        checkDeliveryPaperwork: Boolean
        checkNumber: Int
        clinics: [ID]
        contactedReferrer: Boolean
        generalNotes: String
        paidOptomDate: String
        reasonNotReferredBack: String
        referredBackToOriginalClinic: Boolean
        referralCompleted: Boolean
        referralCanceled: Boolean
        referralCanceledReason: String
        patientId: ID
        providers: [ID]
        postOpVisitDate: String
        postOpVisitType: String
        typeOfInsurance: String
        transferOfCare: Boolean
        transferOfCareDate: String
    }

    type PostOperation {
        id: ID!
        amountToBePaidFromInsurance: Float
        amountToPayProvider: Float   
        clinics: [Clinic]
        checkDelivered: Boolean
        checkDeliveryPaperwork: Boolean
        checkNumber: Int
        contactedReferrer: Boolean
        generalNotes: String
        paidOptomDate: String
        reasonNotReferredBack: String
        referredBackToOriginalClinic: Boolean
        referralCompleted: Boolean
        referralCanceled: Boolean
        referralCanceledReason: String
        patientId: ID
        providers: [Provider]
        postOpVisitDate: String
        postOpVisitType: String
        transferOfCare: Boolean
        transferOfCareDate: String
        typeOfInsurance: String
    }

    type Query {
        patientPostOperation(patientId: ID!): PostOperation
        postOperations: [PostOperation]
        postOperation(id: ID!): PostOperation
    }

    type Mutation {
        createPostOperation(postOperationInput: PostOperationInput): PostOperation @auth
        deletePostOperation(id: ID!): PostOperation @auth
        updatePostOperation(id: ID!, postOperationInput: PostOperationInput): PostOperation @auth
    }
`;
