'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { Box, Button } from '@mui/material';
import Add from '@mui/icons-material/Add';
import {
  DataGridPro,
  GridRowParams,
  GridRowHeightParams,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GridValidRowModel,
} from '@mui/x-data-grid-pro';
import { providersColumns } from '../../../constants/dataGridColumnNames/providersColumns';
import { Provider } from '../../../constants/types/types';
import CustomDialogContent from '../../_components/CustomDialogContent';
import { eventEmitter } from '../../_components/EventEmitter';
import { useModal } from '../../_components/ModalProvider';
import { useSnackbar } from '../../_components/SnackbarProvider';
import { DELETE_PROVIDER } from '../../api/graphql/mutations/providerMutations';
import { ProviderWithReferral } from '../../api/graphql/queries/providers';
import { providersAdditionalColumns } from '../../../constants/dataGridColumnNames/providersAdditionalColumns';
import { pageTitleHeaderBackgroundColor } from '../../../lib/css/utils';

const EditToolbar = () => {
  return (
    <GridToolbarContainer
      sx={{
        justifyContent: 'space-between',
        padding: '0 16px',
      }}
    >
      <Box>
        <Link href="/providers/new">
          <Button
            startIcon={<Add />}
            sx={{ color: pageTitleHeaderBackgroundColor, pt: 1 }}
          >
            new provider
          </Button>
        </Link>
      </Box>
      <Box>
        <GridToolbarFilterButton
          style={{ color: pageTitleHeaderBackgroundColor }}
        />
        <GridToolbarDensitySelector
          style={{ color: pageTitleHeaderBackgroundColor }}
        />
        <GridToolbarExport style={{ color: pageTitleHeaderBackgroundColor }} />
      </Box>
      <Box>
        <GridToolbarQuickFilter />
      </Box>
    </GridToolbarContainer>
  );
};

const ProvidersTable = ({
  providers,
}: {
  providers: ProviderWithReferral[];
}) => {
  const { showModal, hideModal } = useModal();
  const { openSnackbar } = useSnackbar();

  const [currentProviderData, setCurrentProviderData] =
    useState<ProviderWithReferral[]>(providers);
  const [deleteProvider, { data, loading, error }] =
    useMutation(DELETE_PROVIDER);

  const handleDeleteClick = async (id: string) => {
    deleteProvider({
      onCompleted: () => {
        // mimics a cache update
        setCurrentProviderData(
          currentProviderData.filter(provider => provider.id !== id),
        );
        hideModal();
        openSnackbar('Provider deleted successfully', 'success');
      },
      onError: () => {
        openSnackbar(`Error deleting provider: ${error}`, 'error');
        hideModal();
      },
      variables: { id },
    });
  };

  // opens the detail panel when the user clicks on a row + button
  const DetailPanel = useCallback(
    ({ id }: GridRowParams<GridValidRowModel>) => (
      <DataGridPro
        columns={providersAdditionalColumns}
        columnVisibilityModel={{ id: false }}
        disableColumnMenu
        disableColumnFilter
        getRowHeight={() => 'auto'}
        hideFooterRowCount
        rows={currentProviderData.filter(provider => provider.id === id)}
        slotProps={{
          filterPanel: {
            columnsSort: 'asc',
          },
        }}
      />
    ),
    [currentProviderData],
  );

  const getRowHeight = useCallback(({ model }: GridRowHeightParams) => {
    if (model.clinics?.length > 2 || model.notes?.length > 50) {
      return 'auto';
    }
    return null;
  }, []);

  useEffect(() => {
    const handleDelete = (row: Provider) => {
      showModal(
        <CustomDialogContent
          affirmativeButtonLabel={'Yes'}
          affirmativeOnClick={() => handleDeleteClick(row.id)}
          negativeButtonLabel="No"
          negativeOnClick={hideModal}
          title={`Are you sure you want to delete provider ${row.firstName} ${row.lastName}?`}
        />,
      );
    };

    eventEmitter.on('deleteProvider', handleDelete);

    return () => {
      eventEmitter.off('deleteProvider', handleDelete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataGridPro
      // if use pagination, use filterMode="server" otherwise use "client"
      columns={providersColumns}
      columnVisibilityModel={{
        id: false,
        consentFormOnFile: false,
        hasDemographics: false,
        hasW9: false,
        specialties: false,
        dateVisitedByProvider: false,
        dateVisitedByLiaison: false,
      }}
      disableColumnSelector
      getDetailPanelContent={DetailPanel}
      getDetailPanelHeight={() => 'auto'}
      getRowClassName={params =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      getRowHeight={getRowHeight}
      rows={currentProviderData}
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

export default ProvidersTable;
