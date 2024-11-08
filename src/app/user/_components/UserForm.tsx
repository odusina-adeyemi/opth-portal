'use client';
import React, { useRef } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { Form, Field } from 'react-final-form';
import { ArrowBack } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { User } from '../../../constants/types/types';
import { useSnackbar } from '../../_components/SnackbarProvider';
import { required } from '../../../lib/utils/utils';
import { USER_ROLES } from '../../../constants/enums';
import {
  ADD_USER,
  UPDATE_USER,
} from '../../api/graphql/mutations/userMutations';
import PageTitleHeader from '../../../ui/components/PageTitleHeader';

interface UserFormProps {
  loggedInUser: User;
  user?: User;
}

const UserForm = ({ loggedInUser, user }: UserFormProps) => {
  const { openSnackbar } = useSnackbar();
  const textFieldRef = useRef<HTMLInputElement>(null);

  const [createUser, { data, loading: createUserLoading }] =
    useMutation(ADD_USER);
  const [updateUser, { data: updatedData, loading: updateUserLoading }] =
    useMutation(UPDATE_USER);

  const onSubmit = async (values: any, form: any) => {
    if (user) {
      updateUser({
        onCompleted: () => {
          openSnackbar('User updated successfully', 'success');
        },
        onError: error => {
          openSnackbar('Error updating user: ' + error.message, 'error');
        },
        variables: {
          id: user.id,
          userInput: { ...values, organizationId: loggedInUser.organizationId },
        },
      });
    } else {
      createUser({
        onCompleted: () => {
          openSnackbar('User created successfully', 'success');
          textFieldRef.current?.click();
          form.reset();
        },
        onError: error => {
          openSnackbar('Oops! Error creating user: ' + error.message, 'error');
        },
        variables: {
          userInput: { ...values, organizationId: loggedInUser.organizationId },
        },
      });
    }
  };

  return (
    <Paper>
      <Grid container>
        <Grid item xs={12}>
          <Box p={2}>
            <PageTitleHeader title={user ? 'Edit User' : 'Add User'} />
          </Box>
          <Box pl={1}>
            <Box display="flex" alignItems="center">
              <Link
                href="/user/my_account"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                }}>
                <ArrowBack sx={{ m: 1 }} />
                My Account
              </Link>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={6} mt={2} pl={1}>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit}>
                <Grid container>
                  <Grid item xs={12} alignContent={'center'}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 'bold', m: 1 }}>
                      User Information
                    </Typography>
                  </Grid>
                  <Grid item xs={6} alignContent={'center'}>
                    <Field
                      name="firstName"
                      initialValue={user?.firstName ?? ''}
                      validate={required}>
                      {({ input, meta }) => (
                        <TextField
                          id="firstName"
                          error={meta.error && meta.touched}
                          label="First name *"
                          fullWidth
                          name={input.name}
                          onChange={input.onChange}
                          ref={textFieldRef}
                          sx={{ m: 1 }}
                          type="text"
                          variant="outlined"
                          value={input.value}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={6} alignContent={'center'} px={1}>
                    <Field
                      name="lastName"
                      initialValue={user?.lastName ?? ''}
                      validate={required}>
                      {({ input, meta }) => (
                        <TextField
                          id="lastName"
                          error={meta.error && meta.touched}
                          label="Last name *"
                          fullWidth
                          name={input.name}
                          onChange={input.onChange}
                          sx={{ m: 1 }}
                          type="text"
                          value={input.value}
                          variant="outlined"
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={6} alignContent={'center'}>
                    <Field
                      name="email"
                      initialValue={user?.email ?? ''}
                      validate={required}>
                      {({ input, meta }) => (
                        <TextField
                          id="email"
                          error={meta.error && meta.touched}
                          fullWidth
                          label="Email *"
                          name={input.name}
                          onChange={input.onChange}
                          sx={{ m: 1 }}
                          type="email"
                          value={input.value}
                          variant="outlined"
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={6} alignContent={'center'} pl={2}>
                    <Field
                      name="role"
                      initialValue={user?.role ?? ''}
                      validate={required}>
                      {({ input, meta }) => (
                        <FormControl
                          fullWidth
                          error={meta.error && meta.touched}>
                          <InputLabel id="role">Role *</InputLabel>
                          <Select
                            id="role"
                            label="Role *"
                            name={input.name}
                            onChange={input.onChange}
                            value={input.value}
                            variant="outlined">
                            <MenuItem value={''}>Select a Role</MenuItem>
                            {USER_ROLES?.map((role, index) => {
                              return (
                                <MenuItem key={index} value={role}>
                                  {role}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    display={'flex'}
                    justifyContent={'right'}
                    m={1}
                    mr={0}
                    p={1}
                    pr={0}>
                    <Button
                      color="primary"
                      disabled={
                        submitting || createUserLoading || updateUserLoading
                      }
                      onSubmit={handleSubmit}
                      sx={{ textTransform: 'capitalize' }}
                      startIcon={
                        (submitting ||
                          createUserLoading ||
                          updateUserLoading) && <CircularProgress size={20} />
                      }
                      type="submit"
                      variant="contained">
                      {user ? 'Update' : 'Create'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserForm;
