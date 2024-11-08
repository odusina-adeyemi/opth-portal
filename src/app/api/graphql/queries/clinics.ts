import { gql } from '@apollo/client';
import { Clinic } from '../../../../constants/types/types';
import { query } from '../../_apolloClient/apolloClientServerSide';

export const GET_CLINIC = gql`
  query clinic($id: ID!) {
    clinic(id: $id) {
      id
      address
      city
      email
      faxNumber
      name
      notes
      phoneNumber
      providers {
        id
        firstName
        lastName
        type
      }
      referralManager
      referrerStatusTimeline
      state
      type
      zipCode
    }
  }
`;

export const GET_ORGANIZATION_CLINICS = gql`
  query GetOrganizationClinics($organizationId: ID!) {
    organizationClinics(organizationId: $organizationId) {
      id
      address
      city
      email
      faxNumber
      name
      notes
      phoneNumber
      providers {
        id
        firstName
        lastName
      }
      referralManager
      state
      type
      zipCode
    }
  }
`;

export const fetchOrganizationClinics = async (
  organizationId: string,
): Promise<Clinic[]> => {
  try {
    const {
      data: { organizationClinics },
    } = await query({
      query: GET_ORGANIZATION_CLINICS,
      variables: { organizationId },
    });
    return organizationClinics ?? [];
  } catch (error) {
    return [];
  }
};

export const fetchClinic = async (id: string): Promise<Clinic> => {
  try {
    const {
      data: { clinic },
    } = await query({
      fetchPolicy: 'network-only',
      query: GET_CLINIC,
      variables: { id },
    });
    return clinic;
  } catch (error) {
    return {} as Clinic;
  }
};
