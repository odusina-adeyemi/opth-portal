import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Provider } from '../../../constants/types/types';

const NoReferralsCard = ({ noReferrals }: { noReferrals: Provider[] }) => {
  return (
    <Card>
      <CardHeader
        avatar={<SentimentVeryDissatisfiedIcon color="error" />}
        title={'No referrals in last 4 weeks'}
      />

      <CardContent>
        <List>
          {noReferrals.map((provider: Provider) => (
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

export default NoReferralsCard;
