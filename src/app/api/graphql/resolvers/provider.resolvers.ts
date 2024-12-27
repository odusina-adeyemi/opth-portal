import {
  FileResponse,
  Provider,
  ProviderType,
} from '../../../../constants/types/types';
import {
  CreateProviderStruct,
  ProviderCreateUpdateInput,
  UpdateProviderStruct,
} from '../../../api/graphql/mutations/providerMutations';
import { assert } from 'superstruct';
import { handleAssertDataValidationError } from '../../../../lib/utils/utils';

export const providerResolver = {
  Query: {
    organizationProviders: async (
      _parent: Provider,
      { organizationId }: { organizationId: string },
      context: any,
    ) =>
      await context.prisma.provider.findMany({
        where: {
          organization: {
            id: organizationId,
          },
        },
        include: { clinics: true, providerClinics: true },
      }),
    providers: async (
      _parent: Provider,
      { state, type }: { state?: string; type?: ProviderType },
      context: any,
    ) => {
      const stateFilter = state
        ? {
            clinics: {
              some: {
                state: {
                  equals: state,
                },
              },
            },
          }
        : {};

      const typeFilter = type
        ? {
            type: {
              equals: type,
            },
          }
        : {};

      return await context.prisma.provider.findMany({
        where: {
          ...typeFilter,
          ...stateFilter,
        },
        include: { clinics: true, patients: true },
      });
    },
    provider: async (_parent: Provider, args: any, context: any) =>
      await context.prisma.provider.findUnique({
        include: { clinics: true, patients: true },
        where: { id: args.id },
      }),
  },
  // so when you query for a Provider type, it will come to this special resolver
  // and then depending on what scalar fields are available on the Provider schema
  // you can choose how to resolve each field
  // here I'm choosing to resolve the "patients" field by fetching all patients associated with
  // this provider
  Provider: {
    patients: async (parent: Provider, _args: any, context: any) =>
      await context.prisma.patient.findMany({
        where: {
          providers: {
            some: {
              id: parent.id,
            },
          },
        },
        include: { providers: true, clinics: true },
      }),
    clinics: async (parent: Provider, _args: any, context: any) =>
      await context.prisma.clinic.findMany({
        where: {
          providers: {
            some: {
              id: parent.id,
            },
          },
        },
      }),
  },

  Mutation: {
    createProvider: async (
      _parent: Provider,
      { providerInput }: { providerInput: ProviderCreateUpdateInput }, // args
      context: any,
    ) => {
      try {
        // data validation
        assert(providerInput, CreateProviderStruct);
        // check here for valid user role? E.g. don't allow optometrist roles to mutate
        // might have to pass in userId to the "providerInput" object in order to
        // fetch the user object and check the role
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }
      const provider = await context.prisma.provider.create({
        data: {
          clinics: {
            connect: providerInput.clinics.map((id: string) => ({
              id,
            })),
          },
          dateVisitedByLiaison: providerInput.dateVisitedByLiaison,
          dateVisitedByProvider: providerInput.dateVisitedByProvider,
          email: providerInput.email,
          firstName: providerInput.firstName,
          lastName: providerInput.lastName,
          organization: {
            connect: {
              id: providerInput.organizationId,
            },
          },
          notes: providerInput.notes,
          phoneNumber: providerInput.phoneNumber,
          specialties: providerInput.specialties,
          status: providerInput.status,
          type: providerInput.type,
        },
      });
      // Check if the provider type is "optometrist" and has an email, then create a user
      if (providerInput.type === 'optometrist' && providerInput.email) {
        await context.prisma.user.create({
          data: {
            email: providerInput.email,
            role: 'optometrist',
            provider: {
              connect: { id: provider.id },
            },
          },
        });
      }
      return provider;
    },
    deleteProvider: async (
      _parent: Provider,
      { id }: { id: string },
      context: any,
    ) =>
      await context.prisma.provider.delete({
        where: { id },
      }),
    updateProvider: async (
      _parent: Provider,
      {
        id,
        providerInput,
      }: { id: string; providerInput: ProviderCreateUpdateInput },
      context: any,
    ) => {
      try {
        // data validation
        assert(providerInput, UpdateProviderStruct);
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }

      const newClinicIds = providerInput.clinics;

      const existingClinicIds = providerInput.existingClinicIds;

      const clinicsToDisconnect = existingClinicIds?.filter(
        (id: string) => !newClinicIds.includes(id),
      );
      const clinicsToConnect = newClinicIds.filter(
        (id: string) => !existingClinicIds.includes(id),
      );

      // automatically archive any uploaded files associated
      // with this clinic and provider
      clinicsToDisconnect.forEach(async (clinicId: string) => {
        const files: FileResponse[] = await context.prisma.file.findMany({
          where: {
            clinicId,
            providerId: id,
          },
        });

        files.forEach(async (file: FileResponse) => {
          await context.prisma.file.update({
            data: {
              isArchived: true,
            },
            where: {
              id: file.id,
            },
          });
        });
      });

      return await context.prisma.provider.update({
        data: {
          clinics: {
            connect: clinicsToConnect.map(id => ({ id })),
            disconnect: clinicsToDisconnect.map((id: string) => ({ id })),
          },
          consentFormOnFile: providerInput.consentFormOnFile,
          dateVisitedByLiaison: providerInput.dateVisitedByLiaison,
          dateVisitedByProvider: providerInput.dateVisitedByProvider,
          email: providerInput.email,
          firstName: providerInput.firstName,
          hasDemographics: providerInput.hasDemographics,
          hasW9: providerInput.hasW9,
          lastName: providerInput.lastName,
          notes: providerInput.notes,
          phoneNumber: providerInput.phoneNumber,
          specialties: providerInput.specialties,
          status: providerInput.status,
          type: providerInput.type,
        },
        where: { id },
      });
    },
  },
};
