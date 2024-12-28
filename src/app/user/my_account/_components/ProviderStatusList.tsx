'use client';
import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import { ProviderStatus } from '../../../../constants/types/types';
import { Cancel, Delete, Edit, Save } from '@mui/icons-material';
import { Field, Form } from 'react-final-form';
import { useModal } from '../../../_components/ModalProvider';
import { useSnackbar } from '../../../_components/SnackbarProvider';
import CustomDialogContent from '../../../_components/CustomDialogContent';
import { useMutation, useQuery } from '@apollo/client';
import {
  DELETE_PROVIDER_STATUS,
  UPDATE_PROVIDER_STATUS,
} from '../../../api/graphql/mutations/providerStatusMutations';
import { GET_PROVIDER_STATUSES } from '../../../api/graphql/queries/providerStatuses';

const ProviderStatusList = ({ orgId }: { orgId: string }) => {
  const [editStatusId, setEditStatusId] = useState('');

  const { showModal, hideModal } = useModal();
  const { openSnackbar } = useSnackbar();

  const { data } = useQuery(GET_PROVIDER_STATUSES, {
    variables: { orgId },
  });
  const [deleteProviderStatus] = useMutation(DELETE_PROVIDER_STATUS);
  const [updateProviderStatus, { loading: updateProviderStatusLoading }] =
    useMutation(UPDATE_PROVIDER_STATUS, {
      refetchQueries: [GET_PROVIDER_STATUSES, 'GetProviderStatuses'],
      variables: {
        orgId,
      },
    });

  const handleConfirmDelete = (id: string) => {
    deleteProviderStatus({
      onCompleted: () => {
        openSnackbar(
          'Provider status deleted successfully. Refresh page to see current list.',
          'success',
        );
        hideModal();
      },
      onError: error => {
        openSnackbar(`Failed to delete provider status ${error}`, 'error');
      },
      variables: { id },
    });
  };

  const handleDelete = (id: string) => {
    showModal(
      <CustomDialogContent
        affirmativeButtonLabel={'Yes'}
        affirmativeOnClick={() => handleConfirmDelete(id)}
        negativeButtonLabel="No"
        negativeOnClick={hideModal}
        title={`Deleting this will affect providers with this status assigned to them. Continue?`}
      />,
    );
  };

  const handleSave = (values: { status: string; description: string }) => {
    updateProviderStatus({
      onCompleted: () => {
        openSnackbar('Provider status updated successfully', 'success');

        setEditStatusId('');
      },
      onError: error => {
        openSnackbar(
          `Error updating Provider status: ${error.message}`,
          'error',
        );
      },
      variables: {
        id: editStatusId,
        providerStatusInput: { ...values, organizationId: orgId },
      },
    });
  };

  const handleCancel = () => {
    setEditStatusId('');
  };

  return (
    <List>
      {data?.providerStatuses?.map((providerStatus: ProviderStatus) => {
        if (providerStatus.id === editStatusId) {
          return (
            <Form
              key={providerStatus.id}
              onSubmit={handleSave}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Field name="status" initialValue={providerStatus.status}>
                    {({ input }) => (
                      <TextField
                        id="status"
                        name="status"
                        onChange={input.onChange}
                        sx={{ pb: 1 }}
                        value={input.value}
                        variant="standard"
                      />
                    )}
                  </Field>
                  <Field
                    name="description"
                    initialValue={providerStatus.description}
                  >
                    {({ input }) => (
                      <TextField
                        id="description"
                        multiline
                        name="description"
                        onChange={input.onChange}
                        rows={4}
                        value={input.value}
                        variant="outlined"
                      />
                    )}
                  </Field>
                  <Button
                    startIcon={
                      updateProviderStatusLoading && (
                        <CircularProgress size={10} />
                      )
                    }
                    type="submit"
                    onClick={handleSubmit}
                    endIcon={<Save color="success" />}
                  />
                  <IconButton onClick={handleCancel}>
                    <Cancel fontSize="small" />
                  </IconButton>
                </form>
              )}
            />
          );
        }
        return (
          <ListItem key={providerStatus.id}>
            <ListItemText
              primary={providerStatus.status}
              secondary={providerStatus.description}
            />
            <IconButton onClick={() => setEditStatusId(providerStatus.id)}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton onClick={() => handleDelete(providerStatus.id)}>
              <Delete fontSize="small" color="error" />
            </IconButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ProviderStatusList;
