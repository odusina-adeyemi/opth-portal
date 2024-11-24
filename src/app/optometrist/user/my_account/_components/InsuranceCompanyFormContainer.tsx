'use client';
import React, { useState } from 'react';
import { Form } from 'react-final-form';
import InsuranceCompanyForm from './InsuranceCompanyForm';
import { useMutation } from '@apollo/client';
import { ADD_INSURANCE_COMPANY } from '../../../../api/graphql/mutations/insuranceCompanyMutations';
import { useSnackbar } from '../../../../_components/SnackbarProvider';
import { InsuranceCompany } from '../../../../../constants/types/types';
import { capitalizeFirstLetter } from '../../../../../lib/utils/utils';

const InsuranceCompanyFormContainer = ({
  company,
  orgId,
}: {
  company: InsuranceCompany | null;
  orgId: string;
}) => {
  const [isCommercial, setIsCommercial] = useState<boolean>(
    company?.isCommercial ?? false,
  );

  const { openSnackbar } = useSnackbar();

  const [createInsuranceCompany, { loading }] = useMutation(
    ADD_INSURANCE_COMPANY,
  );

  const onSubmit = async (values: any) => {
    values.name = capitalizeFirstLetter(values.name);
    values.isCommercial = isCommercial;

    await createInsuranceCompany({
      onCompleted: () => {
        openSnackbar('Insurance company added successfully', 'success');
      },
      onError: error => {
        openSnackbar(
          `Error adding insurance company: ${error.message}`,
          'error',
        );
      },
      variables: {
        insuranceCompanyInput: { ...values, organizationId: orgId },
      },
    });
  };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <InsuranceCompanyForm
              company={company}
              isCommercial={isCommercial}
              loading={loading}
              setIsCommercial={setIsCommercial}
              formValues={values}
            />
          </form>
        )}
      />
    </>
  );
};

export default InsuranceCompanyFormContainer;
