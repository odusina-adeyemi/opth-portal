'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { Box, Button, List, ListItem } from '@mui/material';
import Add from '@mui/icons-material/Add';
import {
  DataGridPro,
  GridRowParams,
  GridValidRowModel,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid-pro';
import { clinicsColumns } from '../../../constants/dataGridColumnNames/clinicsColumns';
import { Clinic, Provider } from '../../../constants/types/types';
import CustomDialogContent from '../../_components/CustomDialogContent';
import { eventEmitter } from '../../_components/EventEmitter';
import { useModal } from '../../_components/ModalProvider';
import { useSnackbar } from '../../_components/SnackbarProvider';
import { DELETE_CLINIC } from '../../api/graphql/mutations/clinicMutations';
import {
  pageTitleHeaderBackgroundColor,
  textLinkColor,
} from '../../../lib/css/utils';

const EditToolbar = () => {
  return (
    <GridToolbarContainer
      sx={{
        justifyContent: 'space-between',
        padding: '0 16px',
      }}
    >
      <Link href="/clinics/new">
        <Button
          sx={{ color: pageTitleHeaderBackgroundColor }}
          startIcon={<Add />}
        >
          New clinic
        </Button>
      </Link>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};

const ClinicsTable = ({ clinics }: { clinics: Clinic[] }) => {
  const { showModal, hideModal } = useModal();
  const { openSnackbar } = useSnackbar();

  const [currentClinicData, setCurrentClinicData] = useState<Clinic[]>(clinics);

  const [deleteClinic, { data, loading, error }] = useMutation(DELETE_CLINIC);

  const handleDeleteClick = async (id: string) => {
    deleteClinic({
      onCompleted: () => {
        // mimics a cache update
        setCurrentClinicData(
          currentClinicData.filter(clinic => clinic.id !== id),
        );
        hideModal();
        openSnackbar('Clinic deleted successfully', 'success');
      },
      onError: () => {
        openSnackbar(`Error deleting clinic: ${error}`, 'error');
        hideModal();
      },
      variables: { id },
    });
  };

  useEffect(() => {
    const handleDelete = (row: Clinic) => {
      showModal(
        <CustomDialogContent
          affirmativeButtonLabel={'Yes'}
          affirmativeOnClick={() => handleDeleteClick(row.id)}
          negativeButtonLabel="No"
          negativeOnClick={hideModal}
          title={`Are you sure you want to delete clinic ${row.name} in ${row.city}?`}
        />,
      );
    };

    eventEmitter.on('deleteClinic', handleDelete);

    return () => {
      eventEmitter.off('deleteClinic', handleDelete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DetailPanel = useCallback(
    ({ row }: GridRowParams<GridValidRowModel>) => {
      return (
        <Box display={'flex'}>
          <List>
            {row.providers?.map((provider: Provider) => {
              return (
                <ListItem key={provider.id}>
                  <Link
                    // if we have a view page, it'll be that href
                    // instead of the edit url
                    href={`/providers/edit/${provider.id}`}
                    key={provider.id}
                  >
                    <Button
                      sx={{
                        color: textLinkColor,
                        textTransform: 'capitalize',
                      }}
                    >
                      {provider.firstName} {provider.lastName}
                    </Button>
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Box>
      );
    },
    [],
  );

  return (
    <DataGridPro
      columns={clinicsColumns}
      columnVisibilityModel={{ id: false }}
      // filterMode="server"
      getDetailPanelContent={DetailPanel}
      getDetailPanelHeight={() => 'auto'}
      getRowClassName={params =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      rows={currentClinicData}
      rowHeight={75}
      slots={{ toolbar: EditToolbar }}
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
};

export default ClinicsTable;
