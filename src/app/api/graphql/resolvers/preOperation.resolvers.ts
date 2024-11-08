import { PreOperationData } from '../../../../constants/types/types';
import {
  CreatePreOperationStruct,
  UpdatePreOperationStruct,
} from '../../../api/graphql/mutations/preOperationMutations';
import { assert } from 'superstruct';
import { handleAssertDataValidationError } from '../../../../lib/utils/utils';

export const preOperationResolver = {
  Query: {
    preOperation: async (_parent: PreOperationData, args: any, context: any) =>
      await context.prisma.preOperation.findUnique({
        where: { id: args.id },
      }),
    preOperations: async (
      _parent: PreOperationData,
      _args: any,
      context: any,
    ) => await context.prisma.preOperation.findMany(),
    patientPreOperation: async (
      _parent: PreOperationData,
      args: any,
      context: any,
    ) =>
      await context.prisma.preOperation.findUnique({
        where: { patientId: args.patientId },
      }),
  },
  Mutation: {
    createPreOperation: async (
      _parent: PreOperationData,
      { preOperationInput }: any,
      context: any,
    ) => {
      try {
        // data validation
        assert(preOperationInput, CreatePreOperationStruct);
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }
      return await context.prisma.preOperation.create({
        data: {
          clinics: {
            connect: preOperationInput.clinics.map((id: string) => ({
              id,
            })),
          },
          consultationReportSent: preOperationInput.consultationReportSent,
          delayInSurgery: preOperationInput.delayInSurgery,
          delayReason: preOperationInput.delayReason,
          delayLetterSent: preOperationInput.delayLetterSent,
          eyesToBeDone: preOperationInput.eyesToBeDone,
          firstEyeSurgeryDate: preOperationInput.firstEyeSurgeryDate,
          firstEyeSurgeryType: preOperationInput.firstEyeSurgeryType,
          initialAppointmentCompleted:
            preOperationInput.initialAppointmentCompleted,
          isComanage: preOperationInput.isComanage,
          isMedicare: preOperationInput.isMedicare,
          patient: {
            connect: {
              id: preOperationInput.patientId,
            },
          },
          providers: {
            connect: preOperationInput.providers.map((id: string) => ({
              id,
            })),
          },
          reasonNotComanage: preOperationInput.reasonNotComanage,
          reasonNoSurgeryScheduled: preOperationInput.reasonNoSurgeryScheduled,
          secondEyeSurgeryDate: preOperationInput.secondEyeSurgeryDate,
          secondEyeSurgeryType: preOperationInput.secondEyeSurgeryType,
          surgeryScheduled: preOperationInput.surgeryScheduled,
        },
      });
    },

    deletePreOperation: async (
      _parent: PreOperationData,
      args: any,
      context: any,
    ) =>
      await context.prisma.preOperation.delete({
        where: { id: args.id },
      }),
    updatePreOperation: async (
      _parent: PreOperationData,
      { id, preOperationInput }: any, // args
      context: any,
    ) => {
      try {
        // data validation
        assert(preOperationInput, UpdatePreOperationStruct);
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }

      return await context.prisma.preOperation.update({
        where: { id: id },
        data: {
          consultationReportSent: preOperationInput.consultationReportSent,
          delayInSurgery: preOperationInput.delayInSurgery,
          delayReason: preOperationInput.delayReason,
          delayLetterSent: preOperationInput.delayLetterSent,
          eyesToBeDone: preOperationInput.eyesToBeDone,
          firstEyeSurgeryDate: preOperationInput.firstEyeSurgeryDate,
          firstEyeSurgeryType: preOperationInput.firstEyeSurgeryType,
          initialAppointmentCompleted:
            preOperationInput.initialAppointmentCompleted,
          isComanage: preOperationInput.isComanage,
          isMedicare: preOperationInput.isMedicare,
          reasonNotComanage: preOperationInput.reasonNotComanage,
          reasonNoSurgeryScheduled: preOperationInput.reasonNoSurgeryScheduled,
          secondEyeSurgeryDate: preOperationInput.secondEyeSurgeryDate,
          secondEyeSurgeryType: preOperationInput.secondEyeSurgeryType,
          surgeryScheduled: preOperationInput.surgeryScheduled,
        },
      });
    },
  },
};
