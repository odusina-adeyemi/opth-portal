import { gql } from '@apollo/client';
import { User } from '../../../../constants/types/types';
import client from '../../_apolloClient/apolloClientServerSide';

export const GET_ORGANIZATION_USERS = gql`
  query GetOrganizationUsers($organizationId: ID!) {
    organizationUsers(organizationId: $organizationId) {
      id
      email
      firstName
      lastName
      role
    }
  }
`;

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      firstName
      lastName
      organizationId
      provider{
      providerId
      }
      
      organization {
        name
      }
      role
    }
  }
`;

export const GET_USER_WITH_EMAIL = gql`
  query GetUserWithEmail($email: String!) {
    me(email: $email) {
      id
      email
      firstName
      lastName
      organizationId
      providerId
      organization {
        name
      }
      role
    }
  }
`;


const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    user(email: $email) {
      id
      email
      firstName
      lastName
      organizationId
      providerId
    }
  }
`;

export const fetchUserByEmail = async (email: string) => {
  try {
    const { data } = await client.query({
      query: GET_USER_BY_EMAIL,
      variables: { email },
    });

    console.log("Fetched User by Email:", data.user);
    return data.user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};

export const fetchUser = async (id: string): Promise<User> => {
  try {
    const {
      data: { user },
    } = await client.query({
      query: GET_USER,
      variables: { id },
    });
    return user;
  } catch (error) {
    return {} as User;
  }
};

export const fetchOrganizationUsers = async (
  organizationId: string,
): Promise<User[]> => {
  try {
    const {
      data: { organizationUsers },
    } = await client.query({
      query: GET_ORGANIZATION_USERS,
      variables: { organizationId },
    });
    return organizationUsers ?? [];
  } catch (error) {
    return [];
  }
};
