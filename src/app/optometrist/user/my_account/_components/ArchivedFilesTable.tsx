'use client';
import React, { useEffect } from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Box, Button } from '@mui/material';
import { MutationFunction, useLazyQuery, useMutation } from '@apollo/client';
import {
  GET_ARCHIVED_FILES,
  GET_FILE,
} from '../../../../api/graphql/queries/files';
import CenterLoadingIcon from '../../../../../ui/components/CenterLoadingIcon';
import { archivedFileColumns } from '../../../../../constants/dataGridColumnNames/archivedFilesColumns';
import { FileResponse } from '../../../../../constants/types/types';
import { useModal } from '../../../../_components/ModalProvider';
import { useSnackbar } from '../../../../_components/SnackbarProvider';
import CustomDialogContent from '../../../../_components/CustomDialogContent';
import { eventEmitter } from '../../../../_components/EventEmitter';
import { uploadFileNames } from '../../../../../lib/constants/constants';
import {
  DELETE_FILE_BY_ID,
  UNARCHIVE_FILE,
} from '../../../../api/graphql/mutations/fileMutations';

const Toolbar = ({
  fetchArchivedFiles,
}: {
  fetchArchivedFiles: MutationFunction;
}) => {
  return (
    <Button
      color="primary"
      onClick={() => fetchArchivedFiles()}
      size="small"
      sx={{ textTransform: 'capitalize', width: 'fit-content' }}
      variant="contained"
    >
      Fetch
    </Button>
  );
};

const ArchivedFilesTable = () => {
  const { showModal, hideModal } = useModal();
  const { openSnackbar } = useSnackbar();
  const [fetchArchivedFiles, { data, loading, refetch }] =
    useLazyQuery(GET_ARCHIVED_FILES);
  const [fetchFile, { data: fileData, loading: fetchFileLoading }] =
    useLazyQuery(GET_FILE);

  const [deleteFileById, { loading: deleteLoading }] =
    useMutation(DELETE_FILE_BY_ID);
  const [unarchiveFile, { loading: unarchiveLoading }] =
    useMutation(UNARCHIVE_FILE);

  const handleUnarchive = async (row: FileResponse) => {
    const { data } = await fetchFile({ variables: { id: row.id } });
    // if the provider associated with this file is NOT currently associated
    // with the clinic of this the file, then we need to show a warning message
    if (!data?.file?.provider?.clinics.includes(row.clinic?.id)) {
      openSnackbar(
        `${row.provider.firstName} ${row.provider.lastName} is not associated with ${row.clinic.name}. You must associate them with this clinic before unarchiving this file`,
        'warning',
      );
    } else {
      unarchiveFile({
        onCompleted: () => {
          refetch();
          openSnackbar('File unarchived successfully', 'success');
        },
        onError: () => {
          openSnackbar('Error unarchiving file', 'error');
        },
        variables: { id: row.id },
      });
    }
  };

  const handleDeleteClick = (id: string) => {
    hideModal();
    deleteFileById({
      onCompleted: () => {
        refetch();
        openSnackbar('File deleted successfully', 'success');
      },
      onError: () => {
        openSnackbar('Error deleting file', 'error');
      },
      variables: { id },
    });
  };

  useEffect(() => {
    const handleDelete = (row: FileResponse) => {
      showModal(
        <CustomDialogContent
          affirmativeButtonLabel={'Yes'}
          affirmativeOnClick={() => handleDeleteClick(row.id)}
          negativeButtonLabel="No"
          negativeOnClick={hideModal}
          title={`Are you sure you want to delete this ${uploadFileNames[row.name]} file?`}
        />,
      );
    };

    eventEmitter.on('deleteArchivedFile', handleDelete);
    eventEmitter.on('unarchiveFile', handleUnarchive);

    return () => {
      eventEmitter.off('deleteArchivedFile', handleDelete);
      eventEmitter.off('unarchiveFile', handleUnarchive);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box position="relative">
      <DataGridPro
        columns={archivedFileColumns}
        columnVisibilityModel={{
          id: false,
        }}
        disableColumnSelector
        disableRowSelectionOnClick
        getRowClassName={params =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        rows={data?.archivedFiles ?? []}
        slots={{ toolbar: Toolbar }}
        slotProps={{
          toolbar: { fetchArchivedFiles },
        }}
        sx={{
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            mx: 2,
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-overlayWrapper': {
            minHeight: '50px',
          },
          '& .MuiDataGrid-row.odd': {
            backgroundColor: '#f1f1f1',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#e8f4f7',
          },
          '& .MuiDataGrid-virtualScroller': {
            px: 2,
          },
          '& .MuiDataGrid-actionsCell': {
            display: 'block',
          },
        }}
      />
      <CenterLoadingIcon
        show={loading || deleteLoading || fetchFileLoading || unarchiveLoading}
      />
    </Box>
  );
};

export default ArchivedFilesTable;
