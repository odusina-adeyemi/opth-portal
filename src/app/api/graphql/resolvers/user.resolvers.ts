// import { User } from '../../../../constants/types/types';
// import { assert } from 'superstruct';
// import {
//   CreateUserStruct,
//   UpdateUserStruct,
//   UserCreateUpdateInput,
// } from '../../../api/graphql/mutations/userMutations';
// import { handleAssertDataValidationError } from '../../../../lib/utils/utils';

// export const userResolver = {
//   Query: {
//     organizationUsers: async (
//       _parent: User,
//       { organizationId }: { organizationId: string },
//       context: any,
//     ) =>
//       await context.prisma.user.findMany({
//         where: { organizationId },
//         include: { organization: true },
//       }),
//     user: async (_parent: User, { id }: { id: string }, context: any) =>
//       await context.prisma.user.findUnique({
//         where: { id },
//         include: { organization: true },
//       }),
//     me: async (_parent: User, { email }: { email: string }, context: any) =>
//       await context.prisma.user.findUnique({
//         where: { email },
//         include: { organization: true },
//       }),
//   },

//   Mutation: {
//     createUser: async (
//       _parent: User,
//       {
//         userInput,
//       }: {
//         userInput: UserCreateUpdateInput;
//       },
//       context: any,
//     ) => {
//       try {
//         assert(userInput, CreateUserStruct);
//       } catch (error: any) {
//         handleAssertDataValidationError(error);
//       }

//       return await context.prisma.user.create({
//         data: {
//           email: userInput.email,
//           firstName: userInput.firstName,
//           lastName: userInput.lastName,
//           organization: {
//             connect: { id: userInput.organizationId },
//           },
//           role: userInput.role,
//         },
//       });
//     },
//     updateUser: async (
//       _parent: User,
//       {
//         id,
//         userInput,
//       }: {
//         id: string;
//         userInput: UserCreateUpdateInput;
//       },
//       context: any,
//     ) => {
//       try {
//         assert(userInput, UpdateUserStruct);
//       } catch (error: any) {
//         handleAssertDataValidationError(error);
//       }

//       return await context.prisma.user.update({
//         where: { id },
//         data: {
//           email: userInput.email,
//           firstName: userInput.firstName,
//           lastName: userInput.lastName,
//           role: userInput.role,
//         },
//       });
//     },
//     deleteUser: async (_parent: User, args: any, context: any) => {
//       return await context.prisma.user.delete({
//         where: { id: args.id },
//       });
//     },
//   },
// };



import { User } from '../../../../constants/types/types';
import { assert } from 'superstruct';
import {
  CreateUserStruct,
  UpdateUserStruct,
  UserCreateUpdateInput,
} from '../../../api/graphql/mutations/userMutations';
import { handleAssertDataValidationError } from '../../../../lib/utils/utils';

interface Context {
  prisma: {
    user: {
      findMany: (args: any) => Promise<any>;
      findUnique: (args: any) => Promise<any>;
      create: (args: any) => Promise<any>;
      update: (args: any) => Promise<any>;
      delete: (args: any) => Promise<any>;
    };
    provider: {
      findUnique: (args: any) => Promise<any>;
    };
  };
}

interface OrganizationUsersArgs {
  organizationId: string;
}

interface UserArgs {
  id: string;
}

interface MeArgs {
  email: string;
}

interface ProviderArgs {
  providerId: string;
}

interface CreateUserArgs {
  userInput: UserCreateUpdateInput;
}

interface UpdateUserArgs {
  id: string;
  userInput: UserCreateUpdateInput;
}

interface SyncUserArgs {
  userInput: UserCreateUpdateInput;
}

export const userResolver = {
  Query: {
    organizationUsers: async (
      _parent: User,
      { organizationId }: OrganizationUsersArgs,
      context: Context,
    ) =>
      await context.prisma.user.findMany({
        where: { organizationId },
        include: { organization: true },
      }),
    user: async (_parent: User, { id }: UserArgs, context: Context) =>
      await context.prisma.user.findUnique({
        where: { id },
        include: { organization: true },
      }),
    me: async (_parent: User, { email }: MeArgs, context: Context) =>
      await context.prisma.user.findUnique({
        where: { email },
        include: { organization: true },
      }),
    provider: async (_parent: User, { providerId }: ProviderArgs, context: Context) =>
      await context.prisma.provider.findUnique({
        where: { id: providerId },
      }),
  },

  Mutation: {
    createUser: async (
      _parent: User,
      { userInput }: CreateUserArgs,
      context: Context,
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
      { id, userInput }: UpdateUserArgs,
      context: Context,
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
    deleteUser: async (_parent: User, args: UserArgs, context: Context) => {
      return await context.prisma.user.delete({
        where: { id: args.id },
      });
    },
    syncUser: async (
      _parent: User,
      { userInput }: SyncUserArgs,
      context: Context,
    ) => {
      try {
        assert(userInput, CreateUserStruct); // Validate the input
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }

      const { email } = userInput;

      // Check if the user already exists
      const existingUser = await context.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        // Update the existing user
        return await context.prisma.user.update({
          where: { email },
          data: {
            firstName: userInput.firstName,
            lastName: userInput.lastName,
            role: userInput.role,
            organization: {
              connect: { id: userInput.organizationId },
            },
          },
        });
      }

      // Create a new user if one does not exist
      return await context.prisma.user.create({
        data: {
          email: userInput.email,
          firstName: userInput.firstName,
          lastName: userInput.lastName,
          role: userInput.role,
          organization: {
            connect: { id: userInput.organizationId },
          },
        },
      });
    },
  },
};
