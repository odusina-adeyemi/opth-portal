import { InsuranceCompany } from '../../../../constants/types/types';
import { assert } from 'superstruct';
import { handleAssertDataValidationError } from '../../../../lib/utils/utils';
import {
  CreateInsuranceCompanyStruct,
  InsuranceCompanyCreateUpdateInput,
  UpdateInsuranceCompanyStruct,
} from '../mutations/insuranceCompanyMutations';

export const insuranceCompanyResolver = {
  Query: {
    insuranceCompaniesByOrg: async (
      _parent: InsuranceCompany,
      { id }: { id: string },
      context: any,
    ) =>
      await context.prisma.insuranceCompanies.findMany({
        where: {
          organizationId: id,
        },
        orderBy: {
          name: 'asc',
        },
      }),
    insuranceCompany: async (
      _parent: InsuranceCompany,
      { id }: { id: string },
      context: any,
    ) =>
      await context.prisma.insuranceCompanies.findUnique({
        where: { id },
      }),
  },

  Mutation: {
    createInsuranceCompany: async (
      _parent: InsuranceCompany,
      {
        insuranceCompanyInput,
      }: { insuranceCompanyInput: InsuranceCompanyCreateUpdateInput },
      context: any,
    ) => {
      try {
        assert(insuranceCompanyInput, CreateInsuranceCompanyStruct);
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }
      return await context.prisma.insuranceCompanies.create({
        data: {
          isCommercial: insuranceCompanyInput.isCommercial,
          name: insuranceCompanyInput.name,
          organization: {
            connect: {
              id: insuranceCompanyInput.organizationId,
            },
          },
        },
      });
    },
    updateInsuranceCompany: async (
      _parent: InsuranceCompany,
      {
        id,
        insuranceCompanyInput,
      }: {
        id: string;
        insuranceCompanyInput: InsuranceCompanyCreateUpdateInput;
      },

      context: any,
    ) => {
      try {
        assert(insuranceCompanyInput, UpdateInsuranceCompanyStruct);
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }
      return await context.prisma.insuranceCompanies.update({
        where: { id },
        data: {
          isCommercial: insuranceCompanyInput.isCommercial,
          name: insuranceCompanyInput.name,
        },
      });
    },
    deleteInsuranceCompany: async (
      _parent: InsuranceCompany,
      { id }: { id: string },
      context: any,
    ) => {
      return await context.prisma.insuranceCompanies.delete({
        where: { id },
      });
    },
  },
};
