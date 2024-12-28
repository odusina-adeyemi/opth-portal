// import { Patient, TDateISO } from '../../../../constants/types/types';
// import { assert } from 'superstruct';
// import {
//   CreatePatientStruct,
//   PatientCreateUpdateInputType,
//   UpdatePatientStruct,
// } from '../../../api/graphql/mutations/patientMutations';
// import { handleAssertDataValidationError } from '../../../../lib/utils/utils';

// type OrgPatientArgs = {
//   startDate: TDateISO;
//   endDate: TDateISO;
//   organizationId: string;
//   referringClinicId: string;
//   referringProviderId: string;
// };

// export const patientResolver = {
//   Query: {
//     organizationPatients: async (
//       _parent: Patient,
//       {
//         startDate,
//         endDate,
//         organizationId,
//         referringClinicId,
//         referringProviderId,
//       }: OrgPatientArgs,
//       context: any,
//     ) =>
//       await context.prisma.patient.findMany({
//         include: {
//           referringClinic: true,
//           referringProvider: true,
//           surgeonClinic: true,
//           surgeon: true,
//         },
//         where: {
//           createdAt: {
//             gte: startDate,
//             lte: endDate,
//           },
//           organizationId: organizationId,
//           referringClinicId,
//           referringProviderId,
//         },
//         orderBy: {
//           createdAt: 'desc',
//         },
//       }),
//     patients: async (_parent: Patient, _args: any, context: any) =>
//       await context.prisma.patient.findMany({
//         include: { clinics: true, providers: true },
//       }),
//     patient: async (_parent: Patient, { id }: { id: string }, context: any) =>
//       await context.prisma.patient.findUnique({
//         include: {
//           clinics: true,
//           patientContacts: true,
//           preOperations: true,
//           postOperations: true,
//           providers: true,
//           referringClinic: true,
//         },
//         where: { id },
//       }),
//   },

//   Mutation: {
//     createPatient: async (
//       _parent: Patient,
//       { patientInput }: { patientInput: PatientCreateUpdateInputType }, // args
//       context: any,
//     ) => {
//       try {
//         // data validation
//         assert(patientInput, CreatePatientStruct);
//       } catch (error: any) {
//         handleAssertDataValidationError(error);
//       }

//       return await context.prisma.patient.create({
//         data: {
//           clinics: {
//             connect: patientInput.clinics.map((id: string) => ({
//               id,
//             })),
//           },
//           dob: patientInput.dob,
//           email: patientInput.email,
//           firstName: patientInput.firstName,
//           generalNotes: patientInput.generalNotes,
//           lastName: patientInput.lastName,
//           organization: {
//             connect: {
//               id: patientInput.organizationId,
//             },
//           },
//           phoneNumber: patientInput.phoneNumber,
//           providers: {
//             connect: patientInput.providers.map((id: string) => ({ id })),
//           },
//           referringClinic: {
//             connect: { id: patientInput.referringClinicId },
//           },
//           referringProvider: {
//             connect: { id: patientInput.referringProviderId },
//           },
//           surgeonClinic: patientInput.surgeonClinicId && {
//             connect: { id: patientInput.surgeonClinicId },
//           },
//           surgeon: patientInput.surgeonId && {
//             connect: { id: patientInput.surgeonId },
//           },
//         },
//       });
//     },
//     deletePatient: async (
//       _parent: Patient,
//       { id }: { id: string },
//       context: any,
//     ) =>
//       await context.prisma.patient.delete({
//         where: { id },
//       }),
//     updatePatient: async (
//       _parent: Patient,
//       {
//         id,
//         patientInput,
//       }: { id: string; patientInput: PatientCreateUpdateInputType },
//       context: any,
//     ) => {
//       try {
//         // data validation
//         assert(patientInput, UpdatePatientStruct);
//       } catch (error: any) {
//         handleAssertDataValidationError(error);
//       }

//       return await context.prisma.patient.update({
//         where: { id },
//         data: {
//           clinics: {
//             connect: patientInput?.clinics?.map((id: string) => ({
//               id,
//             })),
//           },
//           dob: patientInput.dob,
//           email: patientInput.email,
//           firstName: patientInput.firstName,
//           generalNotes: patientInput.generalNotes,
//           lastName: patientInput.lastName,
//           organization: {
//             connect: {
//               id: patientInput.organizationId,
//             },
//           },
//           phoneNumber: patientInput.phoneNumber,
//           providers: {
//             connect: patientInput?.providers?.map((id: string) => ({ id })),
//           },
//           referringClinic: {
//             connect: { id: patientInput.referringClinicId },
//           },
//           referringProvider: {
//             connect: { id: patientInput.referringProviderId },
//           },
//           surgeonClinic: patientInput.surgeonClinicId && {
//             connect: { id: patientInput.surgeonClinicId },
//           },
//           surgeon: patientInput.surgeonId && {
//             connect: { id: patientInput.surgeonId },
//           },
//         },
//       });
//     },
//   },
// };

// type OrgPatientArgs = {
//   startDate: TDateISO;
//   endDate: TDateISO;
//   organizationId: string;
//   referringClinicId: string;
//   referringProviderId: string;
// };

// export const patientResolver = {
//   Query: {
//     organizationPatients: async (
//       _parent: Patient,
//       {
//         startDate,
//         endDate,
//         organizationId,
//         referringClinicId,
//         referringProviderId,
//       }: OrgPatientArgs,
//       context: any,
//     ) =>
//       await context.prisma.patient.findMany({
//         include: {
//           referringClinic: true,
//           referringProvider: true,
//           surgeonClinic: true,
//           surgeon: true,
//           clinics: true,
//           providers: true,
//         },
//         where: {
//           createdAt: {
//             gte: startDate,
//             lte: endDate,
//           },
//           organizationId: organizationId,
//           referringClinicId,
//           referringProviderId,
//         },
//         orderBy: {
//           createdAt: 'desc',
//         },
//       }),
//     patients: async (_parent: Patient, _args: any, context: any) =>
//       await context.prisma.patient.findMany({
//         include: { clinics: true, providers: true },
//       }),
//     patient: async (_parent: Patient, { id }: { id: string }, context: any) =>
//       await context.prisma.patient.findUnique({
//         include: {
//           clinics: true,
//           patientContacts: true,
//           preOperations: true,
//           postOperations: true,
//           providers: true,
//           referringClinic: true,
//           surgeonClinic: true,
//           attachedFiles: true,
//         },
//         where: { id },
//       }),
//   },

//   Mutation: {
//     createPatient: async (
//       _parent: Patient,
//       { patientInput }: { patientInput: PatientCreateUpdateInputType }, // args
//       context: any,
//     ) => {
//       try {
//         // Data validation
//         assert(patientInput, CreatePatientStruct);
//       } catch (error: any) {
//         handleAssertDataValidationError(error);
//       }

//       return await context.prisma.patient.create({
//         data: {
//           clinics: {
//             connect: patientInput.clinics.map((id: string) => ({
//               id,
//             })),
//           },
//           dob: patientInput.dob,
//           email: patientInput.email,
//           firstName: patientInput.firstName,
//           generalNotes: patientInput.generalNotes,
//           notes: patientInput.notes,
//           lastName: patientInput.lastName,
//           organization: {
//             connect: {
//               id: patientInput.organizationId,
//             },
//           },
//           phoneNumber: patientInput.phoneNumber,
//           providers: {
//             connect: patientInput.providers.map((id: string) => ({ id })),
//           },
//           referringClinic: {
//             connect: { id: patientInput.referringClinicId },
//           },
//           referringProvider: {
//             connect: { id: patientInput.referringProviderId },
//           },
//           surgeonClinic: patientInput.surgeonClinicId && {
//             connect: { id: patientInput.surgeonClinicId },
//           },
//           surgeon: patientInput.surgeonId && {
//             connect: { id: patientInput.surgeonId },
//           },
//           gender: patientInput.gender,
//           address: patientInput.address,
//           city: patientInput.city,
//           zip: patientInput.zip,
//           interpreterNeeded: patientInput.interpreterNeeded,
//           language: patientInput.language,
//           okToText: patientInput.okToText,
//           urgentReferral: patientInput.urgentReferral,
//           preferredLocations: patientInput.preferredLocations,
//           consultationType: patientInput.consultationType,
//           attachedFiles: {
//             create: patientInput.attachedFiles?.map(file => ({
//               name: file.name,
//               url: file.url,
//             })),
//           },
//           comanageNo: patientInput.comanageNo,
//           comanageYes: patientInput.comanageYes,
//         },
//       });
//     },
//     deletePatient: async (
//       _parent: Patient,
//       { id }: { id: string },
//       context: any,
//     ) =>
//       await context.prisma.patient.delete({
//         where: { id },
//       }),
//     updatePatient: async (
//       _parent: Patient,
//       {
//         id,
//         patientInput,
//       }: { id: string; patientInput: PatientCreateUpdateInputType },
//       context: any,
//     ) => {
//       try {
//         // Data validation
//         assert(patientInput, UpdatePatientStruct);
//       } catch (error: any) {
//         handleAssertDataValidationError(error);
//       }

//       return await context.prisma.patient.update({
//         where: { id },
//         data: {
//           clinics: {
//             connect: patientInput?.clinics?.map((id: string) => ({
//               id,
//             })),
//           },
//           dob: patientInput.dob,
//           email: patientInput.email,
//           firstName: patientInput.firstName,
//           generalNotes: patientInput.generalNotes,
//           notes: patientInput.notes,
//           lastName: patientInput.lastName,
//           organization: {
//             connect: {
//               id: patientInput.organizationId,
//             },
//           },
//           phoneNumber: patientInput.phoneNumber,
//           providers: {
//             connect: patientInput?.providers?.map((id: string) => ({ id })),
//           },
//           referringClinic: {
//             connect: { id: patientInput.referringClinicId },
//           },
//           referringProvider: {
//             connect: { id: patientInput.referringProviderId },
//           },
//           surgeonClinic: patientInput.surgeonClinicId && {
//             connect: { id: patientInput.surgeonClinicId },
//           },
//           surgeon: patientInput.surgeonId && {
//             connect: { id: patientInput.surgeonId },
//           },
//           gender: patientInput.gender,
//           address: patientInput.address,
//           city: patientInput.city,
//           zip: patientInput.zip,
//           interpreterNeeded: patientInput.interpreterNeeded,
//           language: patientInput.language,
//           okToText: patientInput.okToText,
//           urgentReferral: patientInput.urgentReferral,
//           preferredLocations: patientInput.preferredLocations,
//           consultationType: patientInput.consultationType,
//           attachedFiles: {
//             upsert: patientInput.attachedFiles?.map(file => ({
//               where: { name: file.name },
//               create: { name: file.name, url: file.url },
//               update: { url: file.url },
//             })),
//           },
//           comanageNo: patientInput.comanageNo,
//           comanageYes: patientInput.comanageYes,
//         },
//       });
//     },
//   },
// };

import { Patient, TDateISO } from '../../../../constants/types/types';
import { assert } from 'superstruct';
import {
  CreatePatientStruct,
  PatientCreateUpdateInputType,
  UpdatePatientStruct,
} from '../../../api/graphql/mutations/patientMutations';
import { handleAssertDataValidationError } from '../../../../lib/utils/utils';
import { Note } from '@mui/icons-material';

type OrgPatientArgs = {
  startDate: TDateISO;
  endDate: TDateISO;
  organizationId: string;
  referringClinicId?: string;
  referringProviderId?: string;
};

export const patientResolver = {
  Query: {
    organizationPatients: async (
      _parent: Patient,
      {
        startDate,
        endDate,
        organizationId,
        referringClinicId,
        referringProviderId,
      }: OrgPatientArgs,
      context: any,
    ) =>
      await context.prisma.patient.findMany({
        include: {
          referringClinic: true,
          referringProvider: true,
          surgeonClinic: true,
          surgeon: true,
          clinics: true,
          providers: true,
        },
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
          organizationId: organizationId,
          ...(referringClinicId && { referringClinicId }),
          ...(referringProviderId && { referringProviderId }),
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    patients: async (_parent: Patient, _args: any, context: any) =>
      await context.prisma.patient.findMany({
        include: { clinics: true, providers: true },
      }),
    patient: async (_parent: Patient, { id }: { id: string }, context: any) =>
      await context.prisma.patient.findUnique({
        include: {
          clinics: true,
          appointmentInfo: true,
          referralInfo: true,
          insuranceInfo: true,
          attachedFiles: true,
          referringClinic: true,
          referringProvider: true,
          surgeonClinic: true,
          surgeon: true,
        },
        where: { id },
      }),
  },

  Mutation: {
    createPatient: async (
      _parent: Patient,
      { patientInput }: { patientInput: PatientCreateUpdateInputType },
      context: any,
    ) => {
      try {
        // Data validation
        assert(patientInput, CreatePatientStruct);
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }

      return await context.prisma.patient.create({
        data: {
          // Clinics and Providers
          clinics: patientInput.clinics?.length
            ? { connect: patientInput.clinics.map(id => ({ id })) }
            : undefined,
          providers: patientInput.providers?.length
            ? { connect: patientInput.providers.map(id => ({ id })) }
            : undefined,

          // Appointment Info
          appointmentInfo: patientInput.appointmentInfo
            ? {
                create: {
                  doctorSpecialty: patientInput.appointmentInfo.doctorSpecialty,
                  preferredLocations:
                    patientInput.appointmentInfo.preferredLocations,
                  consultationType: patientInput.consultationType?.[0] || null, // Adjusted for a single string
                  urgentReferral: patientInput.appointmentInfo.urgentReferral,
                  additionalConditions:
                    patientInput.appointmentInfo.additionalConditions,
                  chartNotesAttachments:
                    patientInput.appointmentInfo.chartNotesAttachments?.map(
                      file => ({
                        name: (file as unknown as { name: string; url: string })
                          .name,
                        url: (file as unknown as { name: string; url: string })
                          .url,
                      }),
                    ) || [],
                },
              }
            : undefined,

          // Referral Info
          referralInfo: patientInput.referralInfo?.length
            ? {
                create: patientInput.referralInfo.map(info => ({
                  referringClinicId: info.referringClinicId,
                  referringProviderId: info.referringProviderId,
                  referringEmail: info.referringEmail,
                  referringPhone: info.referringPhone,
                  referringFax: info.referringFax,
                  referringAddress: info.referringAddress,
                  referringCity: info.referringCity,
                  referringStateZip: info.referringStateZip,
                })),
              }
            : undefined,

          // Insurance Info
          insuranceInfo: patientInput.insuranceInfo?.length
            ? {
                create: patientInput.insuranceInfo.map(info => ({
                  primaryInsuranceProviderId: info.primaryInsuranceProviderId,
                  primaryInsuranceProviderName:
                    info.primaryInsuranceProviderName,
                  primaryInsuranceIdNumber: info.primaryInsuranceIdNumber,
                  primaryInsuranceGroupNumber: info.primaryInsuranceGroupNumber,
                  secondaryInsuranceProviderId:
                    info.secondaryInsuranceProviderId,
                  secondaryInsuranceProviderName:
                    info.secondaryInsuranceProviderName,
                  secondaryInsuranceIdNumber: info.secondaryInsuranceIdNumber,
                  secondaryInsuranceGroupNumber:
                    info.secondaryInsuranceGroupNumber,
                })),
              }
            : undefined,

          // Attached Files
          attachedFiles: patientInput.attachedFiles?.length
            ? {
                create: patientInput.attachedFiles.map(file => ({
                  name: file.name,
                  url: file.url,
                })),
              }
            : undefined,

          // Optional Relationships
          referringClinic: patientInput.referralInfo?.[0]?.referringClinicId
            ? {
                connect: { id: patientInput.referralInfo[0].referringClinicId },
              }
            : undefined,
          referringProvider: patientInput.referralInfo?.[0]?.referringProviderId
            ? {
                connect: {
                  id: patientInput.referralInfo[0].referringProviderId,
                },
              }
            : undefined,
          surgeonClinic: patientInput.surgeon?.clinics?.[0]?.id
            ? { connect: { id: patientInput.surgeon.clinics[0].id } }
            : undefined,
          surgeon: patientInput.surgeon?.id
            ? { connect: { id: patientInput.surgeon.id } }
            : undefined,
          organization: patientInput.organizationId
            ? { connect: { id: patientInput.organizationId } }
            : undefined,

          // Basic Information
          dob: patientInput.dob,
          email: patientInput.email,
          firstName: patientInput.firstName,
          lastName: patientInput.lastName,
          gender: patientInput.gender,
          address: patientInput.address,
          city: patientInput.city,
          zip: patientInput.zip,
          fax: patientInput.fax || undefined,
          interpreterNeeded: patientInput.interpreterNeeded,
          language: patientInput.language,
          okToText: patientInput.okToText,
          urgentReferral: patientInput.urgentReferral,
          preferredLocations: patientInput.preferredLocations,
          consultationType: patientInput.consultationType,
          generalNotes: patientInput.generalNotes,
          notes: patientInput.notes,
          comanageNo: patientInput.comanageNo,
          comanageYes: patientInput.comanageYes,
          signUpNewsLetter: patientInput.signUpNewsLetter,
        },
      });
    },

    deletePatient: async (
      _parent: Patient,
      { id }: { id: string },
      context: any,
    ) =>
      await context.prisma.patient.delete({
        where: { id },
      }),
    updatePatient: async (
      _parent: Patient,
      {
        id,
        patientInput,
      }: { id: string; patientInput: PatientCreateUpdateInputType },
      context: any,
    ) => {
      try {
        // Data validation
        assert(patientInput, UpdatePatientStruct);
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }

      return await context.prisma.patient.update({
        where: { id },
        data: {
          clinics: {
            connect: patientInput?.clinics?.map(id => ({ id })),
          },

          appointmentInfo: {
            upsert: {
              create: patientInput.appointmentInfo,
              update: patientInput.appointmentInfo,
            },
          },
          referralInfo: {
            upsert: {
              create: patientInput.referralInfo,
              update: patientInput.referralInfo,
            },
          },
          insuranceInfo: {
            upsert: {
              create: patientInput.insuranceInfo,
              update: patientInput.insuranceInfo,
            },
          },
          dob: patientInput.dob,
          email: patientInput.email,
          firstName: patientInput.firstName,
          lastName: patientInput.lastName,
          gender: patientInput.gender,
          address: patientInput.address,
          city: patientInput.city,
          zip: patientInput.zip,
          fax: patientInput.fax,
          interpreterNeeded: patientInput.interpreterNeeded,
          language: patientInput.language,
          okToText: patientInput.okToText,
          urgentReferral: patientInput.urgentReferral,
          preferredLocations: patientInput.preferredLocations,
          consultationType: patientInput.consultationType?.[0] || null, // Adjusted for a single string
          attachedFiles: {
            upsert: patientInput.attachedFiles?.map(file => ({
              where: { name: file.name },
              create: { name: file.name, url: file.url },
              update: { url: file.url },
            })),
          },
          generalNotes: patientInput.generalNotes,
          comanageNo: patientInput.comanageNo,
          comanageYes: patientInput.comanageYes,
          signUpNewsLetter: patientInput.signUpNewsLetter,
          organization: {
            connect: {
              id: patientInput.organizationId,
            },
          },
          providers: {
            connect: patientInput?.providers?.map(id => ({ id })),
          },
          referringClinic: {
            connect: { id: patientInput.referralInfo?.[0]?.referringClinicId },
          },

          referringProvider: {
            connect: {
              id: patientInput.referralInfo?.[0]?.referringProviderId,
            },
          },
          surgeonClinic: patientInput.surgeon?.clinics?.[0]?.id && {
            connect: { id: patientInput.surgeon.clinics[0].id },
          },
          surgeon: patientInput.surgeon?.id && {
            connect: { id: patientInput.surgeon.id },
          },
        },
      });
    },
  },
};
