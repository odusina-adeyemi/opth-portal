'use client';
import React from 'react';
import { Form } from 'react-final-form';
import { useMutation } from '@apollo/client';
import { useSnackbar } from '../../../../_components/SnackbarProvider';
import ProviderStatusForm from './ProviderStatusForm';
import { ADD_PROVIDER_STATUS } from '../../../../api/graphql/mutations/providerStatusMutations';

const ProviderStatusFormContainer = ({ orgId }: { orgId: string }) => {
  const { openSnackbar } = useSnackbar();

  const [createProviderStatus, { loading }] = useMutation(ADD_PROVIDER_STATUS);

  const onSubmit = async (values: any) => {
    await createProviderStatus({
      onCompleted: () => {
        openSnackbar(
          'Provider status added successfully. Refresh page to see current list.',
          'success',
        );
      },
      onError: error => {
        openSnackbar(`Error adding Provider status: ${error.message}`, 'error');
      },
      variables: {
        providerStatusInput: { ...values, organizationId: orgId },
      },
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <ProviderStatusForm loading={loading} onSubmit={onSubmit} />
        </form>
      )}
    />
  );
};

export default ProviderStatusFormContainer;
