import { InsuranceCompany } from '../../../../constants/types/types';
import { gql } from '@apollo/client';
import { boolean, object, string } from 'superstruct';

export type InsuranceCompanyCreateUpdateInput = Omit<InsuranceCompany, 'id'>;

export const CreateInsuranceCompanyStruct = object({
  isCommercial: boolean(),
  name: string(),
  organizationId: string(),
});

export const UpdateInsuranceCompanyStruct = object({
  isCommercial: boolean(),
  name: string(),
});

export const ADD_INSURANCE_COMPANY = gql`
  mutation AddInsuranceCompany($insuranceCompanyInput: InsuranceCompanyInput) {
    createInsuranceCompany(insuranceCompanyInput: $insuranceCompanyInput) {
      id
      isCommercial
      name
    }
  }
`;

export const UPDATE_INSURANCE_COMPANY = gql`
  mutation UpdateInsuranceCompany(
    $id: ID!
    $insuranceCompanyInput: InsuranceCompanyInput
  ) {
    updateInsuranceCompany(
      id: $id
      insuranceCompanyInput: $insuranceCompanyInput
    ) {
      id
      isCommercial
      name
    }
  }
`;

export const DELETE_INSURANCE_COMPANY = gql`
  mutation DeleteInsuranceCompany($id: ID!) {
    deleteInsuranceCompany(id: $id) {
      id
    }
  }
`;
