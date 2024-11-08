import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import MoodIcon from '@mui/icons-material/Mood';
import { Provider } from '../../../constants/types/types';

const DateRangeReferralsCard = ({ providers }: { providers: Provider[] }) => {
  return (
    <Card>
      <CardHeader
        avatar={<MoodIcon color="success" />}
        title={'Referrals in last 4 weeks'}
      />

      <CardContent>
        <List>
          {providers.map((provider: Provider) => (
            <ListItem key={provider.id}>
              {/* Add Link to navigate to provider View page? */}
              <Typography>
                {provider.firstName} {provider.lastName}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default DateRangeReferralsCard;
