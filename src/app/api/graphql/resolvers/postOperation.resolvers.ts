import { PostOperation } from '../../../../constants/types/types';
import { assert } from 'superstruct';
import {
  CreatePostOperationStruct,
  UpdatePostOperationStruct,
} from '../../../api/graphql/mutations/postOperationMutations';
import { handleAssertDataValidationError } from '../../../../lib/utils/utils';

export const postOperationResolver = {
  Query: {
    postOperation: async (_parent: PostOperation, args: any, context: any) =>
      await context.prisma.postOperation.findUnique({
        where: { id: args.id },
      }),
    postOperations: async (_parent: PostOperation, _args: any, context: any) =>
      await context.prisma.postOperation.findMany(),
    patientPostOperation: async (
      _parent: PostOperation,
      args: any,
      context: any,
    ) =>
      await context.prisma.postOperation.findUnique({
        where: { patientId: args.patientId },
      }),
  },

  Mutation: {
    createPostOperation: async (
      _parent: PostOperation,
      { postOperationInput }: { postOperationInput: PostOperation }, // args
      context: any,
    ) => {
      try {
        // data validation
        assert(postOperationInput, CreatePostOperationStruct);
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }
      return await context.prisma.postOperation.create({
        data: {
          amountToBePaidFromInsurance:
            postOperationInput.amountToBePaidFromInsurance,
          amountToPayProvider: postOperationInput.amountToPayProvider,
          clinics: {
            connect: postOperationInput.clinics.map((id: string) => ({
              id,
            })),
          },
          checkDelivered: postOperationInput.checkDelivered,
          checkDeliveryPaperwork: postOperationInput.checkDeliveryPaperwork,
          checkNumber: postOperationInput.checkNumber,
          contactedReferrer: postOperationInput.contactedReferrer,
          paidOptomDate: postOperationInput.paidOptomDate,
          reasonNotReferredBack: postOperationInput.reasonNotReferredBack,
          referredBackToOriginalClinic:
            postOperationInput.referredBackToOriginalClinic,
          referralCompleted: postOperationInput.referralCompleted,
          referralCanceled: postOperationInput.referralCanceled,
          referralCanceledReason: postOperationInput.referralCanceledReason,
          patient: {
            connect: {
              id: postOperationInput.patientId,
            },
          },
          providers: {
            connect: postOperationInput.providers.map((id: string) => ({
              id,
            })),
          },
          postOpVisitDate: postOperationInput.postOpVisitDate,
          postOpVisitType: postOperationInput.postOpVisitType,
          transferOfCare: postOperationInput.transferOfCare,
          transferOfCareDate: postOperationInput.transferOfCareDate,
          typeOfInsurance: postOperationInput.typeOfInsurance,
        },
      });
    },
    deletePostOperation: async (
      _parent: PostOperation,
      args: any,
      context: any,
    ) =>
      await context.prisma.postOperation.delete({
        where: { id: args.id },
      }),
    updatePostOperation: async (
      _parent: PostOperation,
      { id, postOperationInput }: any,
      context: any,
    ) => {
      try {
        // data validation
        assert(postOperationInput, UpdatePostOperationStruct);
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }
      return await context.prisma.postOperation.update({
        where: { id },
        data: {
          amountToBePaidFromInsurance:
            postOperationInput.amountToBePaidFromInsurance,
          amountToPayProvider: postOperationInput.amountToPayProvider,
          checkDelivered: postOperationInput.checkDelivered,
          checkDeliveryPaperwork: postOperationInput.checkDeliveryPaperwork,
          checkNumber: postOperationInput.checkNumber,
          contactedReferrer: postOperationInput.contactedReferrer,
          paidOptomDate: postOperationInput.paidOptomDate,
          reasonNotReferredBack: postOperationInput.reasonNotReferredBack,
          referredBackToOriginalClinic:
            postOperationInput.referredBackToOriginalClinic,
          referralCompleted: postOperationInput.referralCompleted,
          referralCanceled: postOperationInput.referralCanceled,
          referralCanceledReason: postOperationInput.referralCanceledReason,
          postOpVisitDate: postOperationInput.postOpVisitDate,
          postOpVisitType: postOperationInput.postOpVisitType,
          transferOfCare: postOperationInput.transferOfCare,
          transferOfCareDate: postOperationInput.transferOfCareDate,
          typeOfInsurance: postOperationInput.typeOfInsurance,
        },
      });
    },
  },
};
