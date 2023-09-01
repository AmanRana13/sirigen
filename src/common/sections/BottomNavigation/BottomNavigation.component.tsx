import React from 'react';
import clsx from 'clsx';
import {Box, Typography} from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {bottomNavigationStyle} from './BottomNavigation.style';
import SharedStorage from 'store/SharedStorage';

const BottomNavigation = ({
  prevLabel = '',
  nextLabel = '',
  navigate = '',
  nextValue = null,
  prevValue = null,
}: any) => {
  const {classes} = bottomNavigationStyle();
  return (
    <Box
      className={classes.container}
      data-testid='bottom-navigation-container'>
      <Grid container alignItems='center'>
        <Grid item xs={6}>
          {prevLabel && (
            <Box
              className={classes.navigationButton}
              onClick={() =>
                SharedStorage.navigationEnable && navigate(prevValue)
              }
              data-testid='prevButton'>
              <ArrowBackIcon className={classes.arrow} />
              <Box marginLeft={1}>
                <Typography variant='body1'>{prevLabel}</Typography>
              </Box>
            </Box>
          )}
        </Grid>
        <Grid item xs={6}>
          {nextLabel && (
            <Box
              className={clsx(classes.navigationButton, classes.next)}
              onClick={() =>
                SharedStorage.navigationEnable && navigate(nextValue)
              }
              data-testid='nextButton'>
              <Box marginRight={1}>
                <Typography variant='body1'>{nextLabel}</Typography>
              </Box>
              <ArrowForwardIcon className={classes.arrow} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export {BottomNavigation};
