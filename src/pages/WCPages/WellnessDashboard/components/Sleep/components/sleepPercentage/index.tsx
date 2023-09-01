import React, {useCallback} from 'react';
import {Typography} from '@mui/material';
import {Box} from '@mui/system';
import {theme} from 'config/theme.config';
import {sleepPercentage} from './SleepPercentage.style';

const SleepPercentage = ({
  percentage,
  sleepGoal,
}: {
  percentage: number;
  sleepGoal: number;
}) => {
  const {classes} = sleepPercentage();

  const sleepScore = useCallback(() => {
    return Math.trunc((percentage / sleepGoal) * 100);
  }, [percentage, sleepGoal]);

  return (
    <Box className={classes.container}>
      <Typography
        variant='boldHeading'
        color={theme.palette.customColor.activityGreen}>
        SLEEP
      </Typography>
      <Typography className={classes.percentage}>{sleepScore()}</Typography>
      <Typography>%</Typography>
    </Box>
  );
};

export default SleepPercentage;
