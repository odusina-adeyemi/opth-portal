'use client';
import React, { Fragment, useState } from 'react';
import {
  Collapse,
  CardContent,
  Grid,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import ExpandMore from '../../../../ui/components/ExpandMore';
import { User } from '../../../../constants/types/types';
import { GridExpandMoreIcon } from '@mui/x-data-grid-pro';
import { Delete, Edit } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { DELETE_USER } from '../../../api/graphql/mutations/userMutations';
import { useSnackbar } from '../../../_components/SnackbarProvider';
import { useModal } from '../../../_components/ModalProvider';
import CustomDialogContent from '../../../_components/CustomDialogContent';
import CenterLoadingIcon from '../../../../ui/components/CenterLoadingIcon';

const UsersListExpand = ({
  loggedInUser,
  users,
}: {
  loggedInUser: User;
  users: User[];
}) => {
  const [expanded, setExpanded] = useState(false);
  const [currentUsers, setCurrentUsers] = useState<User[]>(users);

  const [deleteUser, { loading: deleteUserLoading }] = useMutation(DELETE_USER);

  const router = useRouter();
  const { openSnackbar } = useSnackbar();
  const { showModal, hideModal } = useModal();

  const isLoggedInUserAdmin = loggedInUser.role === 'admin';

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = (id: string) => {
    deleteUser({
      onCompleted: () => {
        openSnackbar('User deleted successfully', 'success');
        hideModal();
        setCurrentUsers(currentUsers.filter(user => user.id !== id));
      },
      onError: error => {
        openSnackbar(`Failed to delete user ${error}`, 'error');
      },
      variables: { id },
    });
  };

  const handleDeleteClick = (user: User) => {
    // open dialog to confirm delete
    showModal(
      <CustomDialogContent
        affirmativeButtonLabel="Yes"
        affirmativeOnClick={() => handleDelete(user.id)}
        negativeButtonLabel="No"
        negativeOnClick={hideModal}
        title={`Are you sure you want to delete ${user.firstName} ${user.lastName}?`}
      />,
    );
  };

  return (
    <>
      <CenterLoadingIcon show={deleteUserLoading} />
      <Typography variant="h6">
        Total users: {currentUsers.length}{' '}
        <ExpandMore expand={expanded} onClick={handleExpandClick}>
          <GridExpandMoreIcon />
        </ExpandMore>
      </Typography>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container>
            {currentUsers.map((user: User) => (
              <Fragment key={user.id}>
                <Grid item xs={8} paddingRight={2}>
                  <Typography>
                    {user.firstName} {user.lastName}
                  </Typography>
                </Grid>
                {(loggedInUser.id === user.id || isLoggedInUserAdmin) && (
                  <Grid item xs={4}>
                    <IconButton
                      onClick={() => router.push(`/user/edit/${user.id}`)}>
                      <Edit fontSize="small" />
                    </IconButton>

                    <IconButton onClick={() => handleDeleteClick(user)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Grid>
                )}
                <Divider variant="fullWidth" sx={{ my: 2, width: '100%' }} />
              </Fragment>
            ))}
          </Grid>
        </CardContent>
      </Collapse>
    </>
  );
};

export default UsersListExpand;
