import { Clinic } from '../../../../constants/types/types';
import { gql } from '@apollo/client';
import {
  array,
  defaulted,
  object,
  optional,
  pattern,
  string,
} from 'superstruct';
import {
  addressRegex,
  cityRegex,
  emailOrEmpty,
  idRegex,
  nameRegex,
  phoneNumberRegex,
  stateRegex,
  typeRegex,
  zipCodeRegex,
} from '../../../../lib/utils/regexStructs';

export type ClinicCreateUpdateInput = Omit<Clinic, 'id' | 'users'> & {
  existingProviderIds: string[];
  providers: string[];
  users: string[] | number[];
};

export const CreateClinicStruct = object({
  address: pattern(string(), addressRegex),
  city: pattern(string(), cityRegex),
  email: optional(defaulted(emailOrEmpty(), undefined)),
  existingProviderIds: optional(array(pattern(string(), idRegex))),
  faxNumber: optional(
    defaulted(pattern(string(), phoneNumberRegex), undefined),
  ),
  name: pattern(string(), nameRegex),
  notes: optional(string()),
  organizationId: pattern(string(), idRegex),
  phoneNumber: optional(
    defaulted(pattern(string(), phoneNumberRegex), undefined),
  ),
  providers: optional(array(pattern(string(), idRegex))),
  referralManager: optional(string()),
  referrerStatusTimeline: optional(object()),
  state: pattern(string(), stateRegex),
  type: pattern(string(), typeRegex),
  users: optional(array(pattern(string(), idRegex))),
  zipCode: pattern(string(), zipCodeRegex),
});

export const UpdateClinicStruct = object({
  address: optional(pattern(string(), addressRegex)),
  city: optional(pattern(string(), cityRegex)),
  email: optional(emailOrEmpty()),
  existingProviderIds: optional(array(pattern(string(), idRegex))),
  faxNumber: optional(pattern(string(), phoneNumberRegex)),
  name: optional(pattern(string(), nameRegex)),
  notes: optional(string()),
  organizationId: pattern(string(), idRegex),
  phoneNumber: optional(pattern(string(), phoneNumberRegex)),
  providers: optional(array(string())),
  referralManager: optional(string()),
  referrerStatusTimeline: optional(object()),
  state: optional(pattern(string(), stateRegex)),
  type: optional(pattern(string(), typeRegex)),
  users: optional(array(string())),
  zipCode: optional(pattern(string(), zipCodeRegex)),
});

export const UpdateReferrerStatusTimelineStruct = object({
  ids: array(pattern(string(), idRegex)),
  referrerStatus: string(),
  timeline: string(),
});

export const ADD_CLINIC = gql`
  mutation createClinic($clinicInput: ClinicInput) {
    createClinic(clinicInput: $clinicInput) {
      id
      address
      city
      email
      name
      phoneNumber
      state
      type
      zipCode
    }
  }
`;

export const DELETE_CLINIC = gql`
  mutation deleteClinic($id: ID!) {
    deleteClinic(id: $id) {
      id
    }
  }
`;

export const UPDATE_CLINIC = gql`
  mutation updateClinic($id: ID!, $clinicInput: ClinicInput) {
    updateClinic(id: $id, clinicInput: $clinicInput) {
      id
      address
      city
      email
      name
      phoneNumber
      referrerStatusTimeline
      state
      type
      zipCode
    }
  }
`;

export const UPDATE_CLINIC_REFERRER_STATUS_TIMELINE = gql`
  mutation updateClinicReferrerStatusTimeline(
    $ids: [ID!]
    $referrerStatus: String
    $timeline: string
  ) {
    updateClinicReferrerStatusTimeline(
      ids: $ids
      referrerStatusTimeline: $referrerStatusTimeline
      timeline: $timeline
    ) {
      id
      referrerStatusTimeline
    }
  }
`;
