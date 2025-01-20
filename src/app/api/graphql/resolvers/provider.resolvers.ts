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
import { PrismaClient } from '@prisma/client';

interface RevenueCalculation {
  ytdRevenue: number;
  mtdRevenue: number;
  totalPatientsYTD: number;
  totalPatientsMTD: number;
}
interface Patient {
  postOperations?: {
    amountToPayProvider?: number;
  };
}

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

    // providerPatients: async (
    //   _parent: Provider,
    //   { providerId }: { providerId: string },
    //   context: any,
    // ) => {
    //   return await context.prisma.patient.findMany({
    //     where: {
    //       providers: {
    //         some: {
    //           id: providerId,
    //         },
    //       },
    //     },
    //     include: {
    //       preOperations: true,
    //       postOperations: true,
    //       patientContacts: true,
    //     },
    //   });
    // },


    // revenueStats..............

    // revenueStats: async (_parent: any, { providerId }: { providerId: string }, context: any) => {
    //   const today = new Date();
    //   const startOfYear = new Date(today.getFullYear(), 0, 1);
    //   const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    //   // Fetch YTD revenue and patient count
    //   const ytdData = await context.prisma.patientContact.findMany({
    //     where: {
    //       providerId,
    //       dateReferralReceived: {
    //         gte: startOfYear,
    //         lte: today,
    //       },
    //     },
    //     include: {
    //       postOperations: true,
    //     },
    //   });

    //   interface PostOperations {
    //     amountToPayProvider?: number;
    //   }

    //   interface PatientContact {
    //     postOperations?: PostOperations;
    //   }

    //   const ytdRevenue = ytdData.reduce(
    //     (total: number, contact: PatientContact) => total + (contact.postOperations?.amountToPayProvider || 0),
    //     0
    //   );
    //   const ytdPatients = ytdData.length;

    //   // Fetch MTD revenue and patient count
    //   const mtdData = await context.prisma.patientContact.findMany({
    //     where: {
    //       providerId,
    //       dateReferralReceived: {
    //         gte: startOfMonth,
    //         lte: today,
    //       },
    //     },
    //     include: {
    //       postOperations: true,
    //     },
    //   });

    //   interface PostOperations {
    //     amountToPayProvider?: number;
    //   }

    //   interface PatientContact {
    //     postOperations?: PostOperations;
    //   }

    //   const mtdRevenue = mtdData.reduce(
    //     (total: number, contact: PatientContact) => total + (contact.postOperations?.amountToPayProvider || 0),
    //     0
    //   );
    //   const mtdPatients = mtdData.length;

    //   return {
    //     ytdRevenue,
    //     mtdRevenue,
    //     ytdPatients,
    //     mtdPatients,
    //   };
    // },
  

  


    // organizationPatients: async (
    //   _parent: Provider,
    //   { orgId }: { orgId: string },
    //   context: any,
    // ) => {
    //   return await context.prisma.patient.findMany({
    //     where: {
    //       organizationId: orgId,
    //     },
    //     include: {
    //       preOperations: true,
    //       postOperations: true,
    //       patientContacts: true,
    //     },
    //   });
    // },

    // currentProviderPatients: async (_parent: any, _args: any, context: any) => {
    //   const { userId } = context;

    //   if (!userId) {
    //     throw new Error('Not authenticated');
    //   }

    //   // Fetch the logged-in provider and ensure they are an optometrist
    //   const provider = await context.prisma.provider.findUnique({
    //     where: { id: userId },
    //     select: { type: true },
    //   });

    //   if (!provider || provider.type !== 'optometrist') {
    //     throw new Error(
    //       'Access denied. Only optometrists can access this data.',
    //     );
    //   }

    //   // Fetch patients referred by the current provider
    //   return await context.prisma.patient.findMany({
    //     where: {
    //       referringProviderId: userId, // Match referring provider
    //     },
    //     include: {
    //       preOperations: true,
    //       postOperations: true,
    //       patientContacts: true,
    //     },
    //   });
    // },



    // providerPatients..............

    // providerPatients: async (_parent: any, _args: any, context: any) => {
    //   const userId = context.user.id;
  
    //   // Fetch the user's provider ID
    //   const provider = await context.prisma.provider.findFirst({
    //     where: { email: context.user.email },
    //     select: { id: true },
    //   });
  
    //   if (!provider) {
    //     throw new Error('No provider found for the logged-in user');
    //   }
  
    //   // Fetch patients linked to the provider
    //   return await context.prisma.patient.findMany({
    //     where: { providers: { some: { id: provider.id } } },
    //   });
    // },

    // providerRevenue..............

    // providerRevenue: async (
    //   _parent: any,
    //   { providerId }: { providerId: string },
    //   context: any,
    // ) => {
    //   const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    //   const startOfMonth = new Date(
    //     new Date().getFullYear(),
    //     new Date().getMonth(),
    //     1,
    //   );

    //   const ytdPatients = await context.prisma.patient.findMany({
    //     where: {
    //       providers: { some: { id: providerId } },
    //       patientContacts: { dateReferralReceived: { gte: startOfYear } },
    //     },
    //   });

    //   const mtdPatients = await context.prisma.patient.findMany({
    //     where: {
    //       providers: { some: { id: providerId } },
    //       patientContacts: { dateReferralReceived: { gte: startOfMonth } },
    //     },
    //   });

    //   const ytdRevenue: number = ytdPatients.reduce(
    //     (sum: number, patient: any) =>
    //       sum + (patient.postOperations?.amountToPayProvider || 0),
    //     0,
    //   );

    //   const mtdRevenue: number = mtdPatients.reduce(
    //     (sum: number, patient: Patient) =>
    //       sum + (patient.postOperations?.amountToPayProvider || 0),
    //     0,
    //   );

    //   return {
    //     ytd: ytdRevenue,
    //     mtd: mtdRevenue,
    //     totalPatientsYTD: ytdPatients.length,
    //     totalPatientsMTD: mtdPatients.length,
    //   };
    // },



   

    // currentProviderPatients: async (_parent: any, _args: any, context: any) => {
    //   const userId = context.user.id;

    //   // Fetch the Action_Item linking User and Provider
    //   const actionItem = await context.prisma.action_Item.findUnique({
    //     where: { userId },
    //     select: { providerId: true },
    //   });

    //   // Validate if the Action_Item and providerId exist
    //   if (!actionItem || !actionItem.providerId) {
    //     throw new Error('No provider found for the current user');
    //   }

    //   // Use the providerId to fetch the Provider's patients
    //   const providerId = actionItem.providerId;
    //   return await context.prisma.patient.findMany({
    //     where: {
    //       providers: { some: { id: providerId } },
    //       postOperations: { none: { transferOfCare: true } },
    //     },
    //     include: {
    //       preOperations: true,
    //       postOperations: true,
    //       patientContacts: true,
    //     },
    //     orderBy: { createdAt: 'desc' },
    //   });
    // },

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
    // createProvider: async (
    //   _parent: Provider,
    //   { providerInput }: { providerInput: ProviderCreateUpdateInput }, // args
    //   context: any,
    // ) => {
    //   try {
    //     // data validation
    //     assert(providerInput, CreateProviderStruct);
    //     // check here for valid user role? E.g. don't allow optometrist roles to mutate
    //     // might have to pass in userId to the "providerInput" object in order to
    //     // fetch the user object and check the role
    //   } catch (error: any) {
    //     handleAssertDataValidationError(error);
    //   }
    //   const provider = await context.prisma.provider.create({
    //     data: {
    //       clinics: {
    //         connect: providerInput.clinics.map((id: string) => ({
    //           id,
    //         })),
    //       },
    //       dateVisitedByLiaison: providerInput.dateVisitedByLiaison,
    //       dateVisitedByProvider: providerInput.dateVisitedByProvider,
    //       email: providerInput.email,
    //       firstName: providerInput.firstName,
    //       lastName: providerInput.lastName,
    //       organization: {
    //         connect: {
    //           id: providerInput.organizationId,
    //         },
    //       },
    //       notes: providerInput.notes,
    //       phoneNumber: providerInput.phoneNumber,
    //       specialties: providerInput.specialties,
    //       status: providerInput.status,
    //       type: providerInput.type,
    //     },
    //   });
    //   // If the provider is an optometrist with an email, create a user
    //   if (
    //     providerInput.type === 'optometrist' &&
    //     providerInput.email &&
    //     providerInput.email.trim() !== ''
    //   ) {
    //     await context.prisma.user.create({
    //       data: {
    //         email: providerInput.email,
    //         firstName: providerInput.firstName,
    //         lastName: providerInput.lastName,
    //         role: 'optometrist',
    //         organization: {
    //           connect: { id: providerInput.organizationId },
    //         },
    //         provider: {
    //           connect: { id: provider.id }, // Link the User to the Provider
    //         }
            
    //       },
    //     });
    //   }
    //   return provider;
    // },


    createProvider: async (
      _parent: Provider,
      { providerInput }: { providerInput: ProviderCreateUpdateInput },
      context: any
    ) => {
      try {
        // Validate input
        assert(providerInput, CreateProviderStruct);
    
        // Create the Provider
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
              connect: { id: providerInput.organizationId },
            },
            notes: providerInput.notes,
            phoneNumber: providerInput.phoneNumber,
            specialties: providerInput.specialties,
            status: providerInput.status,
            type: providerInput.type,
          },
        });
    
        console.log('Created Provider:', provider);
    
        // Create a User linked to the Provider if applicable
        if (
          providerInput.type === 'optometrist' &&
          providerInput.email &&
          providerInput.email.trim() !== ''
        ) {
          try {
            await context.prisma.user.create({
              data: {
                email: providerInput.email,
                firstName: providerInput.firstName,
                lastName: providerInput.lastName,
                role: 'optometrist',
                organization: {
                  connect: { id: providerInput.organizationId },
                },
                provider: {
                  connect: { id: provider.id }, // Link the User to the Provider
                },
              },
            });
          } catch (error) {
            console.error('Error creating user linked to provider:', error);
            throw new Error('Failed to create user linked to provider');
          }
        }
    
        return provider;
      } catch (error: any) {
        handleAssertDataValidationError(error as Error);
        throw new Error('Failed to create provider');
      }
      },

      deleteProvider: async (
        _parent: Provider,
        { id }: { id: string },
        context: any,
      ) =>
        await context.prisma.provider.delete({
          where: { id },
        }),
      },
  
      // updateProvider: async (
      //   _parent: Provider,
      //   {
      //     id,
      //     providerInput,
      //   }: { id: string; providerInput: ProviderCreateUpdateInput },
      //   context: any,
      // ) => {
      //   try {
      //     // data validation
      //     assert(providerInput, UpdateProviderStruct);
      //   } catch (error: any) {
      //     handleAssertDataValidationError(error);
      //   }
  
      //   const newClinicIds = providerInput.clinics;
  
      //   const existingClinicIds = providerInput.existingClinicIds;
  
      //   const clinicsToDisconnect = existingClinicIds?.filter(
      //     (id: string) => !newClinicIds.includes(id),
      //   );
      //   const clinicsToConnect = newClinicIds.filter(
      //     (id: string) => !existingClinicIds.includes(id),
      //   );
  
      //   // automatically archive any uploaded files associated
      //   // with this clinic and provider
      //   clinicsToDisconnect.forEach(async (clinicId: string) => {
      //     const files: FileResponse[] = await context.prisma.file.findMany({
      //       where: {
      //         clinicId,
      //         providerId: id,
      //       },
      //     });
  
      //     files.forEach(async (file: FileResponse) => {
      //       await context.prisma.file.update({
      //         data: {
      //           isArchived: true,
      //         },
      //         where: {
      //           id: file.id,
      //         },
      //       });
      //     });
      //   });
  
      //   return await context.prisma.provider.update({
      //     data: {
      //       clinics: {
      //         connect: clinicsToConnect.map(id => ({ id })),
      //         disconnect: clinicsToDisconnect.map((id: string) => ({ id })),
      //       },
      //       consentFormOnFile: providerInput.consentFormOnFile,
      //       dateVisitedByLiaison: providerInput.dateVisitedByLiaison,
      //       dateVisitedByProvider: providerInput.dateVisitedByProvider,
      //       email: providerInput.email,
      //       firstName: providerInput.firstName,
      //       hasDemographics: providerInput.hasDemographics,
      //       hasW9: providerInput.hasW9,
      //       lastName: providerInput.lastName,
      //       notes: providerInput.notes,
      //       phoneNumber: providerInput.phoneNumber,
      //       specialties: providerInput.specialties,
      //       status: providerInput.status,
      //       type: providerInput.type,
      //     },
      //     where: { id },
      //   });
      // },
  
      // deleteProvider: async (
      //   _parent: Provider,
      //   { id }: { id: string },
      //   context: any,
      // ) =>
      //   await context.prisma.provider.delete({
      //     where: { id },
      //   }),
    };
  

