'use client';
import React from 'react';
import { Button, LinearProgress } from '@mui/material';
import {
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
} from '@mui/x-data-grid-pro';
import Add from '@mui/icons-material/Add';
// data
import { useMutation } from '@apollo/client';
import { useSnackbar } from '../../../_components/SnackbarProvider';
import { ADD_PRE_OPERATION } from '../../../api/graphql/mutations/preOperationMutations';
import { ADD_PATIENT_CONTACT } from '../../../api/graphql/mutations/patientContactMutations';
import { ADD_POST_OPERATION } from '../../../api/graphql/mutations/postOperationMutations';
import { Patient } from '../../../../constants/types/types';
import { pageTitleHeaderBackgroundColor } from '../../../../lib/css/utils';

interface DetailPanelToolbarProps {
  patientContactLoading: boolean;
  patientData: Patient;
  patientId: GridRowId;
  preOpLoading: boolean;
  postOpLoading: boolean;
  selectionName: string;
  rows: GridRowsProp;
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

const DetailPanelToolbar = ({
  patientContactLoading,
  patientData,
  patientId,
  preOpLoading,
  postOpLoading,
  rows,
  selectionName,
  setRows,
  setRowModesModel,
}: DetailPanelToolbarProps) => {
  const { openSnackbar } = useSnackbar();

  const [createPreOperation, { loading: createPreOperationLoading }] =
    useMutation(ADD_PRE_OPERATION);
  const [createPatientContact, { loading: createPatientContactLoading }] =
    useMutation(ADD_PATIENT_CONTACT);
  const [createPostOperation, { loading: createPostOpLoading }] =
    useMutation(ADD_POST_OPERATION);

  const handleClick = () => {
    if (selectionName === 'contact') {
      createPatientContact({
        onCompleted: ({ createPatientContact }) => {
          if (createPatientContact) {
            openSnackbar(
              'Patient contact record added successfully',
              'success',
            );
            setRows(oldRows => [...oldRows, createPatientContact]);
            setRowModesModel(oldModel => ({
              ...oldModel,
              [createPatientContact.id]: {
                mode: GridRowModes.Edit,
                fieldToFocus: 'dateReferralReceived',
              },
            }));
          } else {
            openSnackbar(`Error adding patient contact record`, 'error');
          }
        },
        variables: {
          patientContactInput: {
            clinics: patientData?.referringClinic?.id,
            contactNotes: null,
            dateReferralReceived: null,
            dateComanagerAware: null,
            dateInitialAppointmentScheduled: null,
            dateAttemptedFirstContact: null,
            patientId,
            providers: patientData?.referringProvider?.id,
          },
        },
        onError: error => {
          openSnackbar(
            `Error adding patient contact record: ${error.message}`,
            'error',
          );
        },
      });
    } else if (selectionName === 'preop') {
      createPreOperation({
        onCompleted: ({ createPreOperation }) => {
          if (createPreOperation) {
            setRows(oldRows => [...oldRows, createPreOperation]);
            setRowModesModel(oldModel => ({
              ...oldModel,
              [createPreOperation.id]: {
                mode: GridRowModes.Edit,
                fieldToFocus: 'consultationReportSent',
              },
            }));
            openSnackbar('Pre-operation record added successfully', 'success');
          } else {
            openSnackbar(`Error adding pre-operation record`, 'error');
          }
        },
        variables: {
          preOperationInput: {
            clinics: patientData?.referringClinic?.id,
            consultationReportSent: null,
            delayReason: null,
            delayLetterSent: null,
            eyesToBeDone: null,
            firstEyeSurgeryDate: null,
            firstEyeSurgeryType: null,
            initialAppointmentCompleted: null,
            isComanage: null,
            patientId,
            providers: patientData?.referringProvider?.id,
            reasonNoSurgeryScheduled: null,
            secondEyeSurgeryDate: null,
            secondEyeSurgeryType: null,
            surgeryScheduled: null,
          },
        },
        onError: error => {
          openSnackbar(
            `Error adding pre-operation record: ${error.message}`,
            'error',
          );
        },
      });
    } else if (selectionName === 'postop') {
      createPostOperation({
        onCompleted: ({ createPostOperation }) => {
          if (createPostOperation) {
            setRows(oldRows => [...oldRows, createPostOperation]);
            setRowModesModel(oldModel => ({
              ...oldModel,
              [createPostOperation.id]: {
                mode: GridRowModes.Edit,
                fieldToFocus: 'typeOfInsurance',
              },
            }));
            openSnackbar('Post-operation record added successfully', 'success');
          } else {
            openSnackbar(`Error adding post-operation record`, 'error');
          }
        },
        variables: {
          postOperationInput: {
            amountToBePaidFromInsurance: null,
            amountToPayProvider: null,
            checkDelivered: null,
            checkDeliveryPaperwork: null,
            checkNumber: null,
            clinics: patientData?.referringClinic?.id,
            contactedReferrer: null,
            generalNotes: null,
            reasonNotReferredBack: null,
            referredBackToOriginalClinic: null,
            referralCompleted: null,
            referralCanceled: null,
            referralCanceledReason: null,
            patientId,
            providers: patientData?.referringProvider?.id,
            postOpVisitDate: null,
            postOpVisitType: null,
            transferOfCare: null,
            transferOfCareDate: null,
            typeOfInsurance: null,
          },
        },
        onError: error => {
          openSnackbar(
            `Error adding post-operation record: ${error.message}`,
            'error',
          );
        },
      });
    }
  };

  const showNewRecordButton =
    (!patientContactLoading || !preOpLoading || !postOpLoading) && !rows.length;

  return (
    <GridToolbarContainer>
      {showNewRecordButton && (
        <Button
          disabled={
            createPreOperationLoading ||
            createPatientContactLoading ||
            createPostOpLoading
          }
          startIcon={<Add />}
          onClick={handleClick}
          sx={{ color: pageTitleHeaderBackgroundColor }}>
          New {selectionName} Record
        </Button>
      )}
      {(patientContactLoading ||
        preOpLoading ||
        postOpLoading ||
        createPreOperationLoading ||
        createPatientContactLoading ||
        createPostOpLoading) && (
        <LinearProgress
          sx={{
            backgroundColor: pageTitleHeaderBackgroundColor,
            width: '100%',
          }}
        />
      )}
    </GridToolbarContainer>
  );
};

export default DetailPanelToolbar;
