'use client';
import React from 'react';
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Field } from 'react-final-form';
import { required } from '../../../../../lib/utils/utils';

const ProviderStatusForm = ({
  loading,
  onSubmit,
}: {
  loading: boolean;
  onSubmit: (values: any) => Promise<void>;
}) => {
  return (
    <Grid container>
      <Grid item xs={12} pl={1}>
        <Typography variant="h6">Add provider status</Typography>
      </Grid>
      <Grid item xs={12}>
        <Field name="status" validate={required}>
          {({ input, meta }) => (
            <TextField
              id="status"
              error={meta.error && meta.touched}
              label="Status *"
              fullWidth
              name={input.name}
              onChange={input.onChange}
              placeholder="Active"
              sx={{ m: 1 }}
              type="text"
              value={input.value}
              variant="outlined"
            />
          )}
        </Field>
      </Grid>
      <Grid item xs={12}>
        <Field name="description" validate={required}>
          {({ input, meta }) => (
            <TextField
              id="description"
              error={meta.error && meta.touched}
              label="Description *"
              fullWidth
              multiline
              name={input.name}
              onChange={input.onChange}
              placeholder="Refers at least twice a month"
              rows={4}
              sx={{ m: 1 }}
              type="text"
              value={input.value}
              variant="outlined"
            />
          )}
        </Field>
      </Grid>
      <Grid item xs={12} textAlign={'right'}>
        <Button
          color="primary"
          disabled={loading}
          endIcon={loading && <CircularProgress size={10} />}
          onSubmit={onSubmit}
          sx={{ textTransform: 'capitalize' }}
          variant="contained"
          type="submit"
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProviderStatusForm;
