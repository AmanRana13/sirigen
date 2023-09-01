import React from 'react';
import {Box, Grid} from '@mui/material';
import {getHourMin} from 'globals/global.functions';
import {sleepStyle} from '../Sleep.style';
import get from 'lodash.get';
import SleepQualityGoals from './SleepQualityGoal';

const SleepQuality = ({sleepSummary}: any) => {
  const {classes} = sleepStyle();

  return (
    <Box data-testid='sleep-quality-graph'>
      <Box display='flex' alignItems='center' gap='20px'>
        <SleepQualityGoals
          value={get(sleepSummary, 'sleepScoreAvg', 0)}
          sleepGoal={80}
        />
        <Box
          className={classes.sleepDataContainer}
          width='43%'
          height='fit-content'
          style={{alignSelf: 'end', paddingBottom: '25px'}}>
          <Grid spacing={2} className={classes.cycleDataContainer} container>
            <Grid item sm={6}>
              <Box className={classes.cycleData}>
                <Box className={classes.cycleDataValue}>
                  {getHourMin(sleepSummary.totalSleepTime)}
                </Box>
                <Box className={classes.cycleDataLabel}>Duration</Box>
              </Box>
            </Grid>
            <Grid item sm={6}>
              <Box className={classes.cycleData}>
                <Box className={classes.cycleDataValue}>
                  {sleepSummary.interruptions} times
                </Box>
                <Box className={classes.cycleDataLabel}>Interuptions</Box>
              </Box>
            </Grid>
          </Grid>
          <Grid spacing={2} className={classes.cycleDataContainer} container>
            <Grid item sm={6}>
              <Box className={classes.cycleData}>
                <Box className={classes.cycleDataValue}>
                  {getHourMin(sleepSummary.sleepLatency)}
                </Box>
                <Box className={classes.cycleDataLabel}>Time to Sleep</Box>
              </Box>
            </Grid>
            <Grid item sm={6}>
              <Box className={classes.cycleData}>
                <Box className={classes.cycleDataValue}>
                  {getHourMin(sleepSummary.timeToGetUp)}
                </Box>
                <Box className={classes.cycleDataLabel}>Time to Get Up</Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export {SleepQuality};
