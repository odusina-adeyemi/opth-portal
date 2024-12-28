import { gql } from '@apollo/client';
import { Organization } from '../../../../constants/types/types';
import client from '../../_apolloClient/apolloClientServerSide';

export const GET_ORGANIZATION = gql`
  query organization($id: ID!) {
    organization(id: $id) {
      id
      name
    }
  }
`;

export const GET_ORGANIZATIONS = gql`
  query organizations {
    organizations {
      id
      name
    }
  }
`;

export const fetchOrganization = async (
  id: string | number,
): Promise<Organization> => {
  try {
    const {
      data: { organization },
    } = await client.query({
      query: GET_ORGANIZATION,
      variables: { id },
    });
    return organization ?? ({} as Organization);
  } catch (error) {
    return {} as Organization;
  }
};
