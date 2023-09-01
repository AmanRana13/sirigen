import {Box, Typography, Grid} from '@mui/material';
import React from 'react';
import med from 'assets/med.svg';
import {publicWrapperStyle} from './PublicWrapper.style';

const PublicWrapper = ({heading, subHeading, children}: any) => {
  const {classes} = publicWrapperStyle();

  return (
    <Box boxShadow={1} className={classes.container}>
      <Grid container>
        <Grid item sm={6}>
          <Box className={classes.loginImageContainer}>
            <Box className={classes.polygon}></Box>
            <img src={med} className={classes.loginImage} />
          </Box>
        </Grid>
        <Grid item sm={6} className={classes.loginArea}>
          <Typography variant='h1' className={classes.welcomeText}>
            {heading}
          </Typography>
          {subHeading && (
            <Typography variant='body1' className={classes.subText}>
              {subHeading}
            </Typography>
          )}
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default React.memo(PublicWrapper);
