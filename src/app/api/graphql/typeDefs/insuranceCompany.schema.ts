export const typeDef = `#graphql

    input InsuranceCompanyInput {
        isCommercial: Boolean
        name: String
        organizationId: ID
    }

    type InsuranceCompany {
        id: ID!
        isCommercial: Boolean
        name: String
        organizationId: ID
    }

    type Query {
        insuranceCompany(id: ID!): InsuranceCompany
        insuranceCompaniesByOrg(id: ID!): [InsuranceCompany] #id = organizationId
    }

    type Mutation {
        createInsuranceCompany(insuranceCompanyInput: InsuranceCompanyInput): InsuranceCompany @auth
        deleteInsuranceCompany(id: ID!): InsuranceCompany @auth
        updateInsuranceCompany(id: ID!, insuranceCompanyInput: InsuranceCompanyInput): InsuranceCompany @auth
    }

`;
