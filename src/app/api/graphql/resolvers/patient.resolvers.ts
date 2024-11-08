import { Patient, TDateISO } from '../../../../constants/types/types';
import { assert } from 'superstruct';
import {
  CreatePatientStruct,
  PatientCreateUpdateInputType,
  UpdatePatientStruct,
} from '../../../api/graphql/mutations/patientMutations';
import { handleAssertDataValidationError } from '../../../../lib/utils/utils';

type OrgPatientArgs = {
  startDate: TDateISO;
  endDate: TDateISO;
  organizationId: string;
  referringClinicId: string;
  referringProviderId: string;
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
        },
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
          organizationId: organizationId,
          referringClinicId,
          referringProviderId,
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
          patientContacts: true,
          preOperations: true,
          postOperations: true,
          providers: true,
          referringClinic: true,
        },
        where: { id },
      }),
  },

  Mutation: {
    createPatient: async (
      _parent: Patient,
      { patientInput }: { patientInput: PatientCreateUpdateInputType }, // args
      context: any,
    ) => {
      try {
        // data validation
        assert(patientInput, CreatePatientStruct);
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }

      return await context.prisma.patient.create({
        data: {
          clinics: {
            connect: patientInput.clinics.map((id: string) => ({
              id,
            })),
          },
          dob: patientInput.dob,
          email: patientInput.email,
          firstName: patientInput.firstName,
          generalNotes: patientInput.generalNotes,
          lastName: patientInput.lastName,
          organization: {
            connect: {
              id: patientInput.organizationId,
            },
          },
          phoneNumber: patientInput.phoneNumber,
          providers: {
            connect: patientInput.providers.map((id: string) => ({ id })),
          },
          referringClinic: {
            connect: { id: patientInput.referringClinicId },
          },
          referringProvider: {
            connect: { id: patientInput.referringProviderId },
          },
          surgeonClinic: patientInput.surgeonClinicId && {
            connect: { id: patientInput.surgeonClinicId },
          },
          surgeon: patientInput.surgeonId && {
            connect: { id: patientInput.surgeonId },
          },
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
        // data validation
        assert(patientInput, UpdatePatientStruct);
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }

      return await context.prisma.patient.update({
        where: { id },
        data: {
          clinics: {
            connect: patientInput?.clinics?.map((id: string) => ({
              id,
            })),
          },
          dob: patientInput.dob,
          email: patientInput.email,
          firstName: patientInput.firstName,
          generalNotes: patientInput.generalNotes,
          lastName: patientInput.lastName,
          organization: {
            connect: {
              id: patientInput.organizationId,
            },
          },
          phoneNumber: patientInput.phoneNumber,
          providers: {
            connect: patientInput?.providers?.map((id: string) => ({ id })),
          },
          referringClinic: {
            connect: { id: patientInput.referringClinicId },
          },
          referringProvider: {
            connect: { id: patientInput.referringProviderId },
          },
          surgeonClinic: patientInput.surgeonClinicId && {
            connect: { id: patientInput.surgeonClinicId },
          },
          surgeon: patientInput.surgeonId && {
            connect: { id: patientInput.surgeonId },
          },
        },
      });
    },
  },
};
