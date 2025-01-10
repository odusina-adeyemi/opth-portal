// import React from 'react';
// import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
// import { Button, Grid, Typography } from '@mui/material';

// const LoginPage = () => {
//   return (
//     <Grid container position={'absolute'} top={'50%'}>
//       <Grid item xs={12} display="flex" justifyContent={'center'} py={2}>
//         <Typography>Viewpoint Comanagement</Typography>
//       </Grid>
//       <Grid item xs={12} display="flex" justifyContent={'center'}>
//         <Button variant="contained" sx={{ textTransform: 'capitalize' }}>
//           <LoginLink>Login</LoginLink>
//         </Button>
//       </Grid>
//     </Grid>
//   );
// };

// export default LoginPage;




import React from 'react';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { Button, Grid, Typography } from '@mui/material';

const LoginPage = () => {
  return (
    <Grid container position={'absolute'} top={'50%'}>
      <Grid item xs={12} display="flex" justifyContent={'center'} py={2}>
        <Typography>Viewpoint Comanagement</Typography>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent={'center'}>
        <Button variant="contained" sx={{ textTransform: 'capitalize' }}>
          <LoginLink>Login</LoginLink>
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
