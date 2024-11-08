import React from 'react';
import { Field } from 'react-final-form';
import { Box, Checkbox, FormControl, FormControlLabel } from '@mui/material';
import UploadDocument from '../../../ui/components/UploadDocument';

interface CheckboxProviderFormProps {
  checked: boolean;
  handleCheckboxChange: (name: string, value: boolean) => void;
  label: string; // label of the checkbox
  name: string; // name of <Field />
  providerId: string | undefined;
  selectedDocumentsClinicId: string; // clinicId
}

const CheckboxProviderClinicDocs = ({
  checked,
  handleCheckboxChange,
  label,
  name,
  providerId,
  selectedDocumentsClinicId,
}: CheckboxProviderFormProps) => {
  return (
    <>
      <Field name={name} type="checkbox">
        {({ input }) => (
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  disabled={!selectedDocumentsClinicId}
                  onChange={event => {
                    handleCheckboxChange(input.name, event.target.checked);
                  }}
                />
              }
              label={label}
            />
          </FormControl>
        )}
      </Field>
      <Box>
        <UploadDocument
          clinicId={selectedDocumentsClinicId}
          documentName={name}
          providerId={providerId}
        />
      </Box>
    </>
  );
};

export default CheckboxProviderClinicDocs;
