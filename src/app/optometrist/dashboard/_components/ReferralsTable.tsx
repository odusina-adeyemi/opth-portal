'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { eventEmitter } from '../../../_components/EventEmitter';
import Link from 'next/link';
import { Patient } from '../../../../constants/types/types';
import { Box, Button, LinearProgress } from '@mui/material';
import Add from '@mui/icons-material/Add';
import {
  DataGridPro,
  // GridFilterModel,
  GridRowHeightParams,
  GridRowParams,
  GridToolbarExport,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GridValidRowModel,
} from '@mui/x-data-grid-pro';
import CustomDialogContent from '../../../_components/CustomDialogContent';
import DetailPanelContent from './DetailPanelContent';
import { referralsColumns } from '../../../../constants/dataGridColumnNames/referralsColumns';
import {ProviderPatientsColumns} from '../../../../constants/dataGridColumnNames/providerPatientTable';
import { useModal } from '../../../_components/ModalProvider';
import { useSnackbar } from '../../../_components/SnackbarProvider';
import { DELETE_PATIENT } from '../../../api/graphql/mutations/patientMutations';
// import { GET_ORGANIZATION } from '../../api/graphql/queries/organizations';
import { patientContactColumns } from '../../../../constants/dataGridColumnNames/patientContactColumns';
import { preOpDataColumns } from '../../../../constants/dataGridColumnNames/preOpDataColumns';
import { postOpDataColumns } from '../../../../constants/dataGridColumnNames/postOpDataColumns';
import { pageTitleHeaderBackgroundColor } from '../../../../lib/css/utils';
// import { getLoggedInUser } from 'lib/getLoggedInUser';


const EditToolbar = async() => {
  // console.log("PreOpDataColumns:", preOpDataColumns)
  // console.log("PostOpDataColumns:", postOpDataColumns)
  // console.log("PatientContactColumns:", patientContactColumns)
  



  
  return (
    <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
      <Link href="/optometrist/referrals/new">
        <Button
          startIcon={<Add />}
          sx={{ color: pageTitleHeaderBackgroundColor, padding: '0 16px' }}
        >
          new referral
        </Button>
      </Link>
      <Box>
        <GridToolbarFilterButton
          style={{ color: pageTitleHeaderBackgroundColor }}
        />
        <GridToolbarDensitySelector
          style={{ color: pageTitleHeaderBackgroundColor }}
        />
        <GridToolbarExport style={{ color: pageTitleHeaderBackgroundColor }} />
      </Box>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};
interface ReferralsTableProps {
  orgId: string;
  patientData: Patient[];
}

export default function ReferralsTable({
  orgId,
  patientData,
}: ReferralsTableProps) {
  const [currentPatientData, setCurrentPatientData] =
    useState<Patient[]>(patientData);

    console.log("PatientData:", patientData)
    console.log("OrgId:", orgId)

  const [deletePatient, { data, loading: deleteLoading, error }] =
    useMutation(DELETE_PATIENT);
  const { showModal, hideModal } = useModal();
  const { openSnackbar } = useSnackbar();

  // opens the detail panel when the user clicks on a row + button
  const DetailPanel = useCallback(
    ({ id, row }: GridRowParams<GridValidRowModel>) => (
      <DetailPanelContent orgId={orgId} patientId={id} rowData={row} />
    ),
    [orgId],
  );

  const handleDeleteClick = async (id: string) => {
    deletePatient({
      onCompleted: () => {
        // mimics a cache update...TODO test: this is frontend "filtering" tho
        // we have filterMode='server' in the DataGrid
        // Although with Virtualization in the table it might not be a problem
        // to filter on the client side
        setCurrentPatientData(
          currentPatientData.filter(patient => patient.id !== id),
        );
        hideModal();
        openSnackbar('Patient deleted successfully', 'success');
      },
      onError: () => {
        openSnackbar('Error deleting patient', 'error');
        hideModal();
      },
      variables: { id },
    });
  };

  // Keep for when we need to implement server side filtering
  // const onFilterChange = useCallback((filterModel: GridFilterModel) => {
  //   // Here you save the data you need from the filter model
  //   setQueryOptions({ filterModel: { ...filterModel } });
  //   // fetchPatients function here?
  // }, []);

  const getRowHeight = useCallback(({ model }: GridRowHeightParams) => {
    if (model.generalNotes?.length > 50) {
      return 'auto';
    }
    return null;
  }, []);

  useEffect(() => {
    const handleDelete = (row: Patient) => {
      showModal(
        <CustomDialogContent
          affirmativeButtonLabel={'Yes'}
          affirmativeOnClick={() => handleDeleteClick(row.id)}
          negativeButtonLabel="No"
          negativeOnClick={hideModal}
          title={`Are you sure you want to delete patient ${row.firstName} ${row.lastName}?`}
        />,
      );
    };

    eventEmitter.on('deletePatient', handleDelete);
    return () => {
      eventEmitter.off('deletePatient', handleDelete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataGridPro
      autoHeight
      columns={ProviderPatientsColumns}
      columnVisibilityModel={{ createdAt: false, id: false }}
      // columnVisibilityModel={REFERRAL_TABLE_COLUMN_VISIBILITY} // TODO to be used with filterMode="server"
      disableColumnSelector
      // filterMode="server" eventually will need to figure this out
      getDetailPanelContent={DetailPanel}
      getDetailPanelHeight={() => 'auto'}
      getRowClassName={params =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      getRowHeight={getRowHeight}
      // for later - https://mui.com/x/react-data-grid/row-updates/#infinite-loading
      // onRowsScrollEnd={() => handleOnRowsScrollEnd()}
      loading={deleteLoading}
      // onFilterModelChange={onFilterChange}
      rows={currentPatientData}
      slots={{
        loadingOverlay: LinearProgress,
        toolbar: EditToolbar,
      }}
      slotProps={{
        filterPanel: {
          columnsSort: 'asc',
        },
        footer: {
          sx: {
            border: 'none',
          },
        },
      }}
      sx={{
        border: 'none',
        '& .MuiDataGrid-columnHeaders': {
          mx: 2,
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 'bold',
        },
        '& .MuiDataGrid-row.odd': {
          backgroundColor: '#f1f1f1',
        },
        '& .MuiDataGrid-row:hover': {
          backgroundColor: '#e8f4f7',
        },
        // '& .MuiDataGrid-cell': {
        '& .MuiDataGrid-virtualScroller': {
          px: 2,
        },
        '& .MuiDataGrid-actionsCell': {
          display: 'block',
        },
      }}
    />
  );
}
