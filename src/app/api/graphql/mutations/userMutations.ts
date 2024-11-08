import { gql } from '@apollo/client';
import { User } from '../../../../constants/types/types';
import { enums, object, optional, pattern, string } from 'superstruct';
import { email, idRegex, nameRegex } from '../../../../lib/utils/regexStructs';
import { USER_ROLES } from '../../../../constants/enums';

export const CreateUserStruct = object({
  email: email(),
  firstName: pattern(string(), nameRegex),
  lastName: pattern(string(), nameRegex),
  organizationId: pattern(string(), idRegex),
  role: enums(USER_ROLES),
});

export const UpdateUserStruct = object({
  email: optional(email()),
  firstName: optional(pattern(string(), nameRegex)),
  lastName: optional(pattern(string(), nameRegex)),
  organizationId: optional(pattern(string(), idRegex)),
  role: optional(enums(USER_ROLES)),
});

export type UserCreateUpdateInput = Omit<User, 'id'> & {
  organizationId: string;
};

export const ADD_USER = gql`
  mutation createUser($userInput: UserCreateUpdateInput!) {
    createUser(userInput: $userInput) {
      id
      email
      firstName
      lastName
      role
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $userInput: UserCreateUpdateInput!) {
    updateUser(id: $id, userInput: $userInput) {
      id
      email
      firstName
      lastName
      role
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
