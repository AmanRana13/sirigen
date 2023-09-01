import React from 'react';
import {Box, Grid} from '@mui/material';
import get from 'lodash.get';
import clsx from 'clsx';

import {roundOff} from 'globals/global.functions';

import {heartRateStyle} from './HearRate.style';

const HeartRateSummary = ({summary, currentState}: any) => {
  const {classes} = heartRateStyle();
  return (
    <Box
      display='flex'
      flexDirection='column'
      width='100%'
      data-testid='heart-rate-summary'
      justifyContent='space-between'>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Box mt={5} mb={5} className={classes.summaryCircle}>
          <span
            className={clsx(classes.summaryBoxValueData, classes.currentRate)}>
            {currentState == 'day'
              ? get(summary, 'last')
              : roundOff(get(summary, 'mean'), 0)}
          </span>
          &nbsp;
          <span className={classes.currentUnit}>bpm</span>
        </Box>
      </Box>

      <Grid
        container
        direction='row'
        justifyContent='space-around'
        alignItems='center'>
        <Grid item sm={3}>
          <Box className={classes.summaryBox}>
            <Box className={classes.summaryBoxLabel}>Resting Avg</Box>
            <Box className={classes.summaryBoxValue}>
              <span className={classes.summaryBoxValueData}>-</span>{' '}
              <span className={classes.currentUnit}>bpm</span>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={3}>
          <Box className={classes.summaryBox}>
            <Box className={classes.summaryBoxLabel}>Overall</Box>
            <Box className={classes.summaryBoxValue}>
              <span className={classes.summaryBoxValueData}>
                {get(summary, 'min')}-{get(summary, 'max')}
              </span>{' '}
              <span className={classes.currentUnit}>bpm</span>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={3}>
          <Box className={classes.summaryBox}>
            <Box className={classes.summaryBoxLabel}>Walking Avg</Box>
            <Box className={classes.summaryBoxValue}>
              <span className={classes.summaryBoxValueData}>-</span>{' '}
              <span className={classes.currentUnit}>bpm</span>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export {HeartRateSummary};
