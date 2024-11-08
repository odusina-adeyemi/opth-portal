import { Organization } from '../../../../constants/types/types';
// To come later
// import { assert } from 'superstruct';
// import { handleAssertDataValidationError } from '../../../../lib/utils/utils';

export const organizationResolver = {
  Query: {
    organizations: async (_parent: Organization, _args: any, context: any) =>
      await context.prisma.organization.findMany({
        include: {
          clinics: {
            orderBy: {
              name: 'asc',
            },
          },
          patients: {
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              referringClinic: true,
              referringProvider: true,
              surgeonClinic: true,
              surgeon: true,
            },
          },
          providers: {
            orderBy: {
              lastName: 'asc',
            },
          },
          users: {
            orderBy: {
              lastName: 'asc',
            },
          },
        },
      }),
    organization: async (_parent: Organization, args: any, context: any) =>
      await context.prisma.organization.findUnique({
        where: { id: args.id },
        include: {
          clinics: {
            orderBy: {
              name: 'asc',
            },
          },
          patients: {
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              referringClinic: true,
              referringProvider: true,
              surgeonClinic: true,
              surgeon: true,
            },
          },
          providers: {
            orderBy: {
              lastName: 'asc',
            },
          },
          users: {
            orderBy: {
              lastName: 'asc',
            },
          },
        },
      }),
  },
};
