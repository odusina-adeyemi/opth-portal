import { gql } from '@apollo/client';

export const GET_INSURANCE_COMPANIES_BY_ORG = gql`
  query GetInsuranceCompanies($id: ID!) {
    insuranceCompaniesByOrg(id: $id) {
      id
      isCommercial
      name
    }
  }
`;
