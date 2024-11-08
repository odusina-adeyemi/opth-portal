import { Clinic } from '../../../../constants/types/types';
import { handleAssertDataValidationError } from '../../../../lib/utils/utils';
import {
  ClinicCreateUpdateInput,
  CreateClinicStruct,
  UpdateClinicStruct,
  UpdateReferrerStatusTimelineStruct,
} from '../../../api/graphql/mutations/clinicMutations';
import { assert } from 'superstruct';

export const clinicResolver = {
  Query: {
    clinic: async (_parent: Clinic, args: any, context: any) =>
      await context.prisma.clinic.findUnique({
        include: { patients: true, providers: true },
        where: { id: args.id },
      }),
    clinics: async (_parent: Clinic, _args: any, context: any) =>
      await context.prisma.clinic.findMany({
        include: { patients: true, providers: true },
      }),
    organizationClinics: async (
      _parent: Clinic,
      { organizationId }: { organizationId: string },
      context: any,
    ) =>
      await context.prisma.clinic.findMany({
        where: {
          organization: {
            id: organizationId,
          },
        },
      }),
    providersClinics: async (_parent: Clinic, args: any, context: any) =>
      await context.prisma.clinic.findMany({
        where: {
          providers: {
            some: {
              id: {
                in: args.providerIds,
              },
            },
          },
          type: {
            equals: args.type,
          },
        },
      }),
  },
  Clinic: {
    //   users: async (parent: Clinic, _args: any, context: any) =>
    //     await context.prisma.user.findMany({
    //       where: {
    //         users: {
    //           some: {
    //             id: parent.id,
    //           },
    //         },
    //       },
    //     }),
    providers: async (parent: Clinic, _args: any, context: any) =>
      await context.prisma.provider.findMany({
        where: {
          clinics: {
            some: {
              id: parent.id,
            },
          },
        },
      }),
  },

  Mutation: {
    createClinic: async (
      _parent: Clinic,
      { clinicInput }: { clinicInput: ClinicCreateUpdateInput }, // args
      context: any,
    ) => {
      try {
        // data validation
        assert(clinicInput, CreateClinicStruct);
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }

      return await context.prisma.clinic.create({
        data: {
          address: clinicInput.address,
          city: clinicInput.city,
          email: clinicInput.email,
          faxNumber: clinicInput.faxNumber,
          name: clinicInput.name,
          notes: clinicInput.notes,
          organization: {
            connect: {
              id: clinicInput.organizationId,
            },
          },
          phoneNumber: clinicInput.phoneNumber,
          providers: {
            connect: clinicInput.providers?.map((id: string | number) => ({
              id,
            })),
          },
          referralManager: clinicInput.referralManager,
          state: clinicInput.state,
          type: clinicInput.type,
          zipCode: clinicInput.zipCode,
        },
      });
    },
    deleteClinic: async (
      _parent: Clinic,
      { id }: { id: string },
      context: any,
    ) =>
      await context.prisma.clinic.delete({
        where: { id },
      }),
    updateClinic: async (
      _parent: Clinic,
      { id, clinicInput }: { id: string; clinicInput: ClinicCreateUpdateInput },
      context: any,
    ) => {
      try {
        // data validation
        assert(clinicInput, UpdateClinicStruct);
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }

      const newProviderIds = clinicInput.providers;

      const existingProviderIds = clinicInput.existingProviderIds;

      const providersToDisconnect = existingProviderIds.filter(
        (id: string) => !newProviderIds.includes(id),
      );

      const providersToConnect = newProviderIds.filter(
        (id: string) => !existingProviderIds.includes(id),
      );

      return await context.prisma.clinic.update({
        data: {
          address: clinicInput.address,
          city: clinicInput.city,
          email: clinicInput.email,
          faxNumber: clinicInput.faxNumber,
          name: clinicInput.name,
          notes: clinicInput.notes,
          phoneNumber: clinicInput.phoneNumber,
          providers: {
            connect: providersToConnect.map(id => ({ id })),
            disconnect: providersToDisconnect.map((id: string) => ({ id })),
          },
          referralManager: clinicInput.referralManager,
          state: clinicInput.state,
          type: clinicInput.type,
          zipCode: clinicInput.zipCode,
        },
        where: { id },
      });
    },
    updateClinicReferrerStatusTimeline: async (
      parent: Clinic,
      {
        ids,
        referrerStatus,
        timeline,
      }: { ids: string[]; referrerStatus: string; timeline: string },
      context: any,
    ) => {
      // try {
      //   // data validation
      //   assert(
      //     { ids, referrerStatus, timeline },
      //     UpdateReferrerStatusTimelineStruct,
      //   );
      // } catch (error: any) {
      //   handleAssertDataValidationError(error);
      // }
      // if (surgeonVisitTimeline) parent.referrerStatusTimeline[referrerStatus].surgeonVisitTimeline = surgeonVisitTimeline;
      // if (liaisonVisitTimeline) parent.referrerStatusTimeline[referrerStatus].liaisonVisitTimeline = liaisonVisitTimeline;

      // Sanitize data inputs here before injecting straight into this query
      // const query = `
      // UPDATE clinics
      // SET "referrerStatusTimeline" = json_set(
      //   referrerStatusTimeline,
      //   '{${referrerStatus},surgeonVisitTimeline}',
      //   '"${timeline}"'
      //   )
      //   WHERE id IN ('{$ids}')
      //   `;

      // jsonb_set(target         jsonb,
      //   path           text[],
      //   new_value      jsonb,
      //   create_missing boolean default true)

      // Figure out this query
      // const query = `
      // UPDATE clinics
      // SET referrerStatusTimeline = jsonb_set(referrerStatusTimeline, '{${referrerStatus}}: { "surgeonVisitTimeline" }', jsonb '${timeline}')
      // WHERE id IN ('${ids}')`;
      // const query = `
      // UPDATE clinics ( "referrerStatusTimeline['{${referrerStatus}}']" )
      // VALUES
      // {
      //   "surgeonVisitTimeline": "{${timeline}}"
      // }
      // WHERE id IN ('{$ids}')
      // `;

      // return await context.prisma.$executeRaw(query);
      // return await context.prisma.$executeRawUnsafe(query);
      return await context.prisma.clinic.update({
        data: {
          // @ts-ignore
          referrerStatusTimeline: (referrerStatusTimeline[
            referrerStatus
          ].surgeonVisitTimeline = timeline),
        },
        where: { id: { in: ids } },
      });
    },
  },
};
