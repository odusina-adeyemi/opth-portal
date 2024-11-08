import { PatientContact } from '../../../../constants/types/types';
import { assert } from 'superstruct';
import { handleAssertDataValidationError } from '../../../../lib/utils/utils';
import {
  CreatePatientContactStruct,
  UpdatePatientContactStruct,
} from '../mutations/patientContactMutations';

export const patientContactResolver = {
  Query: {
    patientContacts: async (
      _parent: PatientContact,
      _args: any,
      context: any,
    ) =>
      await context.prisma.patientContact.findMany({
        include: { patient: true },
      }),
    patientContact: async (_parent: PatientContact, args: any, context: any) =>
      await context.prisma.patientContact.findUnique({
        include: { patient: true },
        where: { id: args.id },
      }),
    patientContactIndividual: async (
      _parent: PatientContact,
      { patientId }: { patientId: string },
      context: any,
    ) =>
      await context.prisma.patientContact.findUnique({
        include: { patient: true },
        where: { patientId },
      }),
  },

  Mutation: {
    createPatientContact: async (
      _parent: PatientContact,
      { patientContactInput }: any,
      context: any,
    ) => {
      try {
        // data validation
        assert(patientContactInput, CreatePatientContactStruct);
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }
      return await context.prisma.patientContact.create({
        data: {
          clinics: {
            connect: patientContactInput.clinics?.map((id: string) => ({
              id,
            })),
          },
          contactNotes: patientContactInput.contactNotes,
          dateAttemptedFirstContact:
            patientContactInput.dateAttemptedFirstContact,
          dateComanagerAware: patientContactInput.dateComanagerAware,
          dateInitialAppointmentScheduled:
            patientContactInput.dateInitialAppointmentScheduled,
          dateReferralReceived: patientContactInput.dateReferralReceived,
          patient: {
            connect: {
              id: patientContactInput.patientId,
            },
          },
          providers: {
            connect: patientContactInput.providers?.map((id: string) => ({
              id,
            })),
          },
        },
      });
    },
    deletePatientContact: async (
      _parent: PatientContact,
      { id }: { id: string },
      context: any,
    ) =>
      await context.prisma.patientContact.delete({
        where: { id },
      }),
    updatePatientContact: async (
      _parent: PatientContact,
      { id, patientContactInput }: any, // args
      context: any,
    ) => {
      try {
        // data validation
        assert(patientContactInput, UpdatePatientContactStruct);
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }

      return await context.prisma.patientContact.update({
        where: { id },
        data: {
          contactNotes: patientContactInput.contactNotes,
          dateAttemptedFirstContact:
            patientContactInput.dateAttemptedFirstContact,
          dateComanagerAware: patientContactInput.dateComanagerAware,
          dateInitialAppointmentScheduled:
            patientContactInput.dateInitialAppointmentScheduled,
          dateReferralReceived: patientContactInput.dateReferralReceived,
        },
      });
    },
  },
};
