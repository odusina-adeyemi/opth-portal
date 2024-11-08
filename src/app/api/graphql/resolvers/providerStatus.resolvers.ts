import { ProviderStatus } from '../../../../constants/types/types';
import { handleAssertDataValidationError } from '../../../../lib/utils/utils';
import {
  CreateProviderStatusStruct,
  ProviderStatusCreateUpdateInput,
  UpdateProviderStatusStruct,
} from '../../../api/graphql/mutations/providerStatusMutations';

import { assert } from 'superstruct';

export const providerStatusResolver = {
  Query: {
    providerStatus: async (
      _parent: ProviderStatus,
      { id }: { id: string },
      context: any,
    ) =>
      await context.prisma.providerStatus.findUnique({
        where: { id },
      }),
    providerStatuses: async (
      _parent: ProviderStatus,
      { orgId }: { orgId: string },
      context: any,
    ) =>
      await context.prisma.providerStatus.findMany({
        where: {
          organizationId: orgId,
        },
        orderBy: {
          status: 'asc',
        },
      }),
  },

  Mutation: {
    createProviderStatus: async (
      _parent: ProviderStatus,
      {
        providerStatusInput,
      }: { providerStatusInput: ProviderStatusCreateUpdateInput },
      context: any,
    ) => {
      try {
        assert(providerStatusInput, CreateProviderStatusStruct);
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }
      return await context.prisma.providerStatus.create({
        data: {
          description: providerStatusInput.description,
          status: providerStatusInput.status,
          organization: {
            connect: {
              id: providerStatusInput.organizationId,
            },
          },
        },
      });
    },
    updateProviderStatus: async (
      _parent: ProviderStatus,
      {
        id,
        providerStatusInput,
      }: { id: string; providerStatusInput: ProviderStatusCreateUpdateInput },
      context: any,
    ) => {
      try {
        assert(providerStatusInput, UpdateProviderStatusStruct);
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }
      return await context.prisma.providerStatus.update({
        where: { id },
        data: {
          description: providerStatusInput.description,
          status: providerStatusInput.status,
        },
      });
    },
    deleteProviderStatus: async (
      _parent: ProviderStatus,
      { id }: { id: string },
      context: any,
    ) => {
      return await context.prisma.providerStatus.delete({
        where: { id },
      });
    },
  },
};
