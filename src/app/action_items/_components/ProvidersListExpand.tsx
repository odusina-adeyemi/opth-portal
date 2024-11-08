'use client';
import React, { useState } from 'react';
import {
  Collapse,
  CardContent,
  Grid,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import ExpandMore from '../../../ui/components/ExpandMore';
import { GridExpandMoreIcon } from '@mui/x-data-grid-pro';
import Link from 'next/link';
import { Delete, Edit } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { useSnackbar } from '../../_components/SnackbarProvider';
import { useModal } from '../../_components/ModalProvider';
import CustomDialogContent from '../../_components/CustomDialogContent';
import CenterLoadingIcon from '../../../ui/components/CenterLoadingIcon';
import { Provider } from '../../../constants/types/types';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { PROVIDER_REFERRER_STATUS_DESCRIPTIONS } from '../../../constants/enums';
import { formatStringToDateString } from '../../../lib/utils/utils';

const ProvidersListExpand = ({ providers }: { providers: Provider[] }) => {
  const [expanded, setExpanded] = useState(false);
  //   const [currentUsers, setCurrentUsers] = useState<User[]>(users);

  //   const [deleteUser, { loading: deleteUserLoading }] = useMutation(DELETE_USER);

  const { openSnackbar } = useSnackbar();
  const { showModal, hideModal } = useModal();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //   const handleDelete = (id: string) => {
  //     deleteUser({
  //       onCompleted: () => {
  //         openSnackbar('User deleted successfully', 'success');
  //         hideModal();
  //         setCurrentUsers(currentUsers.filter(user => user.id !== id));
  //       },
  //       onError: error => {
  //         openSnackbar(`Failed to delete user ${error}`, 'error');
  //       },
  //       variables: { id },
  //     });
  //   };

  //   const handleDeleteClick = (user: User) => {
  //     // open dialog to confirm delete
  //     showModal(
  //       <CustomDialogContent
  //         affirmativeButtonLabel="Yes"
  //         affirmativeOnClick={() => handleDelete(user.id)}
  //         negativeButtonLabel="No"
  //         negativeOnClick={hideModal}
  //         title={`Are you sure you want to delete ${user.firstName} ${user.lastName}?`}
  //       />,
  //     );
  //   };

  return (
    <>
      {/* <CenterLoadingIcon show={deleteUserLoading} /> */}
      <Typography variant="h6">
        View Providers
        <ExpandMore expand={expanded} onClick={handleExpandClick}>
          <GridExpandMoreIcon />
        </ExpandMore>
      </Typography>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container>
            <Grid item xs={12} paddingRight={2} display={'flex'}>
              {/* Table Needs designing */}
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Referrer status</TableCell>
                    <TableCell>Last surgeon visit</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {providers.map((provider: Provider) => (
                    <TableRow key={provider.id}>
                      <TableCell>
                        {provider.firstName} {provider.lastName}
                      </TableCell>
                      <TableCell>
                        {provider.status}
                        <Tooltip
                          title={
                            PROVIDER_REFERRER_STATUS_DESCRIPTIONS[
                              provider.status
                            ]
                          }>
                          <InfoOutlinedIcon sx={{ pl: 1 }} fontSize="small" />
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        {`${typeof provider.dateVisitedByProvider === 'string' ? formatStringToDateString(provider.dateVisitedByProvider) : 'No visit recorded'}`}
                      </TableCell>
                      <TableCell>
                        <Link href={`/providers/edit/${provider.id}`}>
                          <IconButton>
                            <Edit fontSize="small" />
                          </IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/* <Typography pr={1} display={'flex'} alignItems={'center'}>
                    {provider.firstName} {provider.lastName} - {provider.status}{' '}
                    <Tooltip
                      title={
                        PROVIDER_REFERRER_STATUS_DESCRIPTIONS[provider.status]
                      }>
                      <InfoOutlinedIcon sx={{ pl: 1 }} fontSize="small" />
                    </Tooltip>{' '}
                    -{' '}
                    {`${provider.dateVisitedByProvider ?? 'No visit recorded'}`}
                  </Typography> */}
              {/* <Link href={`/providers/edit/${provider.id}`}>
                    <IconButton>
                      <Edit fontSize="small" />
                    </IconButton>
                  </Link> */}
              {/* <Typography display={'flex'} alignItems={'center'}>
                    {provider.status}{' '}
                    <Tooltip
                      title={
                        PROVIDER_REFERRER_STATUS_DESCRIPTIONS[provider.status]
                      }>
                      <InfoOutlinedIcon sx={{ pl: 1 }} fontSize="small" />
                    </Tooltip>
                  </Typography> */}
              {/* <Typography display={'flex'} alignItems={'center'}>
                    {`${provider.dateVisitedByProvider ?? 'No visit recorded'}`}
                  </Typography> */}
            </Grid>
            {/* <Grid item xs={2}> */}
            {/* Or a view Provider button/page ?? */}
            {/* <Link href={`/providers/edit/${provider.id}`}>
                    <IconButton>
                      <Edit fontSize="small" />
                    </IconButton>
                  </Link> */}
            {/* <IconButton onClick={() => handleDeleteClick(user)}>
                    <Delete fontSize="small" />
                  </IconButton> */}
            {/* </Grid> */}
            {/* <Divider variant="fullWidth" sx={{ my: 2, width: '100%' }} /> */}
          </Grid>
        </CardContent>
      </Collapse>
    </>
  );
};

export default ProvidersListExpand;
