import React from 'react';
import {
  PROVIDER_REFERRER_STATUS,
  PROVIDER_REFERRER_STATUS_DESCRIPTIONS,
} from '../../../constants/enums';
import {
  Grid,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import SelectVisitsTimeline from './SelectVisitsTimeline';
import { ReferringProviderStatusType } from '../../../constants/types/types';

const ReferrerVisitTimelineSelection = async () => {
  // Provider referrer status are in the db now
  // fetch referrer statuses and then map over those

  return (
    <Grid container>
      <Grid item xs={12}>
        <Table>
          <TableBody>
            {PROVIDER_REFERRER_STATUS.map(
              (status: ReferringProviderStatusType, index: number) => {
                return (
                  <TableRow key={`${status}-${index}`}>
                    <TableCell>
                      <ListItemText
                        primary={status}
                        secondary={
                          PROVIDER_REFERRER_STATUS_DESCRIPTIONS[status]
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Typography>Surgeon:</Typography>
                      {/* ADD Tooltip for describing the visits every {value} months */}
                      {/* <SelectVisitsTimeline
                        provider
                        status={status}
                        userClinics={userClinics}
                      /> */}
                    </TableCell>
                    <TableCell>
                      <Typography>Liaison:</Typography>
                      {/* <SelectVisitsTimeline
                        status={status}
                        userClinics={userClinics}
                      /> */}
                    </TableCell>
                  </TableRow>
                );
              },
            )}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default ReferrerVisitTimelineSelection;
