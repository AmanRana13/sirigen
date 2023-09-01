import React from 'react';
import get from 'lodash.get';

import {Box, Grid} from '@mui/material';
import {respirationStyle} from '../Respiration.styles';

const RespirationSummary = ({summary}: any) => {
  const {classes} = respirationStyle();
  return (
    <Box
      display='flex'
      flexDirection='column'
      width='100%'
      data-testid='respiration-summary'>
      <Box
        mt={5}
        mb={5}
        display='flex'
        alignItems='center'
        justifyContent='center'>
        <Box className={classes.summaryCircle}>
          <span className={classes.summaryBoxValueData}>
            {get(summary, 'last') ?? '-'}&nbsp;
          </span>{' '}
          BrPM
        </Box>
      </Box>
      <Grid
        container
        direction='row'
        justifyContent='space-evenly'
        alignItems='center'>
        <Grid item sm={3}>
          <Box className={classes.summaryBox}>
            <Box className={classes.summaryBoxLabel}>High</Box>
            <Box className={classes.summaryBoxValue}>
              <span className={classes.summaryBoxValueData}>
                {get(summary, 'max') ?? '-'}
              </span>{' '}
              BrPM
            </Box>
          </Box>
        </Grid>
        <Grid item sm={3}>
          <Box className={classes.summaryBox}>
            <Box className={classes.summaryBoxLabel}>Low</Box>
            <Box className={classes.summaryBoxValue}>
              <span className={classes.summaryBoxValueData}>
                {get(summary, 'min') ?? '-'}
              </span>{' '}
              BrPM
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export {RespirationSummary};
