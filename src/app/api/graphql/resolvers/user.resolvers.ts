import { User } from '../../../../constants/types/types';
import { assert } from 'superstruct';
import {
  CreateUserStruct,
  UpdateUserStruct,
  UserCreateUpdateInput,
} from '../../../api/graphql/mutations/userMutations';
import { handleAssertDataValidationError } from '../../../../lib/utils/utils';

export const userResolver = {
  Query: {
    organizationUsers: async (
      _parent: User,
      { organizationId }: { organizationId: string },
      context: any,
    ) =>
      await context.prisma.user.findMany({
        where: { organizationId },
        include: { organization: true },
      }),
    user: async (_parent: User, { id }: { id: string }, context: any) =>
      await context.prisma.user.findUnique({
        where: { id },
        include: { organization: true },
      }),
    me: async (_parent: User, { email }: { email: string }, context: any) =>
      await context.prisma.user.findUnique({
        where: { email },
        include: { organization: true },
      }),
  },

  Mutation: {
    createUser: async (
      _parent: User,
      {
        userInput,
      }: {
        userInput: UserCreateUpdateInput;
      },
      context: any,
    ) => {
      try {
        assert(userInput, CreateUserStruct);
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }

      return await context.prisma.user.create({
        data: {
          email: userInput.email,
          firstName: userInput.firstName,
          lastName: userInput.lastName,
          organization: {
            connect: { id: userInput.organizationId },
          },
          role: userInput.role,
        },
      });
    },
    updateUser: async (
      _parent: User,
      {
        id,
        userInput,
      }: {
        id: string;
        userInput: UserCreateUpdateInput;
      },
      context: any,
    ) => {
      try {
        assert(userInput, UpdateUserStruct);
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }

      return await context.prisma.user.update({
        where: { id },
        data: {
          email: userInput.email,
          firstName: userInput.firstName,
          lastName: userInput.lastName,
          role: userInput.role,
        },
      });
    },
    deleteUser: async (_parent: User, args: any, context: any) => {
      return await context.prisma.user.delete({
        where: { id: args.id },
      });
    },
  },
};
