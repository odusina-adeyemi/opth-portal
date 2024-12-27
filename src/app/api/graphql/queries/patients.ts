// import { gql } from '@apollo/client';
// import prisma from '../../../../../lib/prisma';
// import { Patient } from '../../../../constants/types/types';
// import query from '../../_apolloClient/apolloClientServerSide';

// export const GET_PATIENT = gql`
//   query GetPatient($id: ID!) {
//     patient(id: $id) {
//       id
//       firstName
//       generalNotes
//       lastName
//       dob
//       email
//       phoneNumber
//       clinics {
//         id
//         city
//         name
//         state
//         type
//       }
//       providers {
//         id
//         clinics {
//           id
//           city
//           name
//         }
//         firstName
//         lastName
//         specialties
//         status
//         type
//       }
//       referringClinicId
//       referringProviderId
//       surgeonClinicId
//       surgeonId
//     }
//   }
// `;

// export const GET_ORGANIZATION_PATIENTS = gql`
//   query GetOrganizationPatients($organizationId: ID!) {
//     organizationPatients(organizationId: $organizationId) {
//       id
//       createdAt
//       dob
//       email
//       firstName
//       generalNotes
//       lastName
//       phoneNumber
//       referringClinic {
//         id
//         city
//         name
//         state
//       }
//       referringProvider {
//         id
//         firstName
//         lastName
//         status
//       }
//       surgeonClinic {
//         id
//         city
//         name
//         state
//       }
//       surgeon {
//         id
//         firstName
//         lastName
//       }
//     }
//   }
// `;

// export const GET_PATIENT_ALL_OPERATION_STAGES = gql`
//   query GetPatientAllOperationStages($patientId: ID!) {
//     patient(id: $patientId) {
//       id
//       firstName
//       generalNotes
//       lastName
//       clinics {
//         id
//       }
//       providers {
//         id
//       }
//       patientContacts {
//         id
//         contactNotes
//         dateAttemptedFirstContact
//         dateComanagerAware
//         dateInitialAppointmentScheduled
//         dateReferralReceived
//       }
//       preOperations {
//         id
//         consultationReportSent
//         delayInSurgery
//         delayReason
//         delayLetterSent
//         eyesToBeDone
//         firstEyeSurgeryDate
//         firstEyeSurgeryType
//         initialAppointmentCompleted
//         isComanage
//         isMedicare
//         reasonNotComanage
//         reasonNoSurgeryScheduled
//         secondEyeSurgeryDate
//         secondEyeSurgeryType
//         surgeryScheduled
//       }
//       postOperations {
//         id
//         amountToBePaidFromInsurance
//         amountToPayProvider
//         checkNumber
//         checkDelivered
//         checkDeliveryPaperwork
//         contactedReferrer
//         generalNotes
//         paidOptomDate
//         postOpVisitDate
//         postOpVisitType
//         reasonNotReferredBack
//         referredBackToOriginalClinic
//         referralCanceled
//         referralCanceledReason
//         referralCompleted
//         transferOfCare
//         transferOfCareDate
//         typeOfInsurance
//       }
//     }
//   }
// `;

// export const fetchDateOfLastReferralSentByProvider = async (ids: string[]) => {
//   const latestReferrals = await Promise.all(
//     ids.map(async id => {
//       const referral = await prisma.patient.findFirst({
//         where: {
//           referringProviderId: id,
//         },
//       });
//       return { referringProviderId: id, lastReferralDate: referral?.createdAt };
//     }),
//   );
//   return latestReferrals;
// };

// export const fetchOrganizationPatients = async (
//   organizationId: string,
// ): Promise<Patient[]> => {
//   try {
//     const {
//       data: { organizationPatients },
//     } = await query.query({
//       query: GET_ORGANIZATION_PATIENTS,
//       variables: { organizationId },
//     });

//     return organizationPatients ?? [];
//   } catch (error) {
//     return [];
//   }
// };

// export const fetchPatient = async (id: string): Promise<Patient> => {
//   try {
//     const {
//       data: { patient },
//     } = await query.query({
//       query: GET_PATIENT,
//       fetchPolicy: 'network-only',
//       variables: { id },
//     });
//     return patient ?? ({} as Patient);
//   } catch (error) {
//     return {} as Patient;
//   }
// };

import { gql } from '@apollo/client';
import prisma from '../../../../../lib/prisma';
import { Patient } from '../../../../constants/types/types';
import query from '../../_apolloClient/apolloClientServerSide';

export const GET_PATIENT = gql`
  query GetPatient($id: ID!) {
    patient(id: $id) {
      id
      firstName
      lastName
      dob
      email
      phoneNumber
      gender
      address
      city
      zip
      fax
      interpreterNeeded
      language
      okToText
      urgentReferral
      preferredLocations
      consultationType
      comanageYes
      comanageNo
      signUpNewsLetter
      generalNotes
      attachedFiles {
        name
        url
      }
      appointmentInfo {
        id
        doctorSpecialty
        preferredLocations
        consultationType
        urgentReferral
        additionalConditions
        chartNotesAttachments
        coManageCare
        dlvAssumePostOpCare
      }
      referralInfo {
        id
        referringClinicId
        referringProviderId
        referringEmail
        referringPhone
        referringFax
        referringAddress
        referringCity
        referringStateZip
      }
      surgeon {
        id
        clinicId
      }
      insuranceInfo {
        id
        primaryInsuranceProviderId
        primaryInsuranceProviderName
        primaryInsuranceIdNumber
        primaryInsuranceGroupNumber
        secondaryInsuranceProviderId
        secondaryInsuranceProviderName
        secondaryInsuranceIdNumber
        secondaryInsuranceGroupNumber
      }
      clinics {
        id
        city
        name
        state
        type
      }
      providers {
        id
        clinics {
          id
          city
          name
        }
        firstName
        lastName
        specialties
        status
        type
      }
    }
  }
`;

export const GET_ORGANIZATION_PATIENTS = gql`
  query GetOrganizationPatients($organizationId: ID!) {
    organizationPatients(organizationId: $organizationId) {
      id
      firstName
      lastName
      dob
      email
      phoneNumber
      createdAt
      gender
      referringClinic {
        id
        city
        name
        state
      }
      referringProvider {
        id
        firstName
        lastName
        status
      }
      surgeonClinic {
        id
        city
        name
        state
      }
      surgeon {
        id
        firstName
        lastName
      }
      clinics {
        id
        city
        name
      }
    }
  }
`;

export const GET_PATIENT_ALL_OPERATION_STAGES = gql`
  query GetPatientAllOperationStages($patientId: ID!) {
    patient(id: $patientId) {
      id
      firstName
      lastName
      clinics {
        id
      }
      providers {
        id
      }
      patientContacts {
        id
        contactNotes
        dateAttemptedFirstContact
        dateComanagerAware
        dateInitialAppointmentScheduled
        dateReferralReceived
      }
      preOperations {
        id
        consultationReportSent
        delayInSurgery
        delayReason
        delayLetterSent
        eyesToBeDone
        firstEyeSurgeryDate
        firstEyeSurgeryType
        initialAppointmentCompleted
        isComanage
        isMedicare
        reasonNotComanage
        reasonNoSurgeryScheduled
        secondEyeSurgeryDate
        secondEyeSurgeryType
        surgeryScheduled
      }
      postOperations {
        id
        amountToBePaidFromInsurance
        amountToPayProvider
        checkNumber
        checkDelivered
        checkDeliveryPaperwork
        contactedReferrer
        generalNotes
        paidOptomDate
        postOpVisitDate
        postOpVisitType
        reasonNotReferredBack
        referredBackToOriginalClinic
        referralCanceled
        referralCanceledReason
        referralCompleted
        transferOfCare
        transferOfCareDate
        typeOfInsurance
      }
    }
  }
`;

export const fetchDateOfLastReferralSentByProvider = async (ids: string[]) => {
  const latestReferrals = await Promise.all(
    ids.map(async id => {
      const referral = await prisma.patient.findFirst({
        where: {
          referringProviderId: id,
        },
      });
      return { referringProviderId: id, lastReferralDate: referral?.createdAt };
    }),
  );
  return latestReferrals;
};

export const fetchOrganizationPatients = async (
  organizationId: string,
): Promise<Patient[]> => {
  try {
    const {
      data: { organizationPatients },
    } = await query.query({
      query: GET_ORGANIZATION_PATIENTS,
      variables: { organizationId },
    });

    return organizationPatients ?? [];
  } catch (error) {
    return [];
  }
};

export const fetchPatient = async (id: string): Promise<Patient> => {
  try {
    const {
      data: { patient },
    } = await query.query({
      query: GET_PATIENT,
      fetchPolicy: 'network-only',
      variables: { id },
    });
    return patient ?? ({} as Patient);
  } catch (error) {
    return {} as Patient;
  }
};
