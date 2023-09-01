import React from 'react';
import {Box, useTheme} from '@mui/material';

import {getHourMin, roundOff} from 'globals/global.functions';

import {sleepStyle} from '../Sleep.style';
const SleepDepth = ({graphData}: any) => {
  const theme: any = useTheme();
  const {classes} = sleepStyle();

  const awakeDuration = getHourMin(
    graphData.total_time_in_bed * (graphData.awake / 100),
  );
  const remDuration = getHourMin(
    graphData.total_time_in_bed * (graphData.rem_sleep / 100),
  );
  const lightDuration = getHourMin(
    graphData.total_time_in_bed * (graphData.light_sleep / 100),
  );
  const deepDuration = getHourMin(
    graphData.total_time_in_bed * (graphData.deep_sleep / 100),
  );

  return (
    <>
      <Box
        className={classes.sleepDepthContainer}
        data-testid='sleep-depth-graph'>
        <Box
          width='100%'
          height={`${graphData.awake}%`}
          minHeight={20}
          display='flex'
          alignItems='flex-end'
          justifyContent='space-between'>
          <Box width='20%' color={theme.palette.customColor.info}>
            Awake
          </Box>
          <Box
            height='100%'
            display='flex'
            justifyContent='space-between'
            alignItems='flex-end'>
            <Box height='100%' className={classes.sleepDepthAwake}></Box>
            <Box ml={2} width={20}>{`${roundOff(graphData.awake, 0)}%`}</Box>
          </Box>

          <Box width={100}>{awakeDuration}</Box>
        </Box>
        <Box
          width='100%'
          height={`${graphData.rem_sleep}%`}
          minHeight={20}
          borderTop='1px solid'
          display='flex'
          alignItems='center'
          justifyContent='space-between'>
          <Box width='20%' color={theme.palette.customColor.info}>
            Rem
          </Box>
          <Box
            height='100%'
            display='flex'
            justifyContent='space-between'
            alignItems='center'>
            <Box height='100%' className={classes.sleepDepthRem}></Box>

            <Box ml={2} width={20}>{`${roundOff(
              graphData.rem_sleep,
              0,
            )}%`}</Box>
          </Box>
          <Box width={100}>{remDuration}</Box>
        </Box>
        <Box
          width='100%'
          borderTop='1px solid'
          height={`${graphData.light_sleep}%`}
          minHeight={20}
          display='flex'
          alignItems='center'
          justifyContent='space-between'>
          <Box width='20%' color={theme.palette.customColor.info}>
            Light
          </Box>
          <Box
            height='100%'
            display='flex'
            justifyContent='space-between'
            alignItems='center'>
            <Box height='100%' className={classes.sleepDepthLight}></Box>

            <Box ml={2} width={20}>{`${roundOff(
              graphData.light_sleep,
              0,
            )}%`}</Box>
          </Box>
          <Box width={100}>{lightDuration}</Box>
        </Box>
        <Box
          width='100%'
          borderTop='1px solid'
          height={`${graphData.deep_sleep}%`}
          minHeight={20}
          display='flex'
          justifyContent='space-between'>
          <Box width='20%' color={theme.palette.customColor.info}>
            Deep
          </Box>
          <Box
            height='100%'
            display='flex'
            justifyContent='space-between'
            alignItems='flex-start'>
            <Box height='100%' className={classes.sleepDepthDeep}></Box>

            <Box ml={2} width={20}>{`${roundOff(
              graphData.deep_sleep,
              0,
            )}%`}</Box>
          </Box>
          <Box width={100}>{deepDuration}</Box>
        </Box>
      </Box>
    </>
  );
};

export {SleepDepth};
