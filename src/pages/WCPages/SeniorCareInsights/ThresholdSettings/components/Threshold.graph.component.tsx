import React from 'react';
import clsx from 'clsx';
import {Box, Typography, InputAdornment} from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import {Fields} from 'common/Fields';
import {VitalState} from 'globals/enums';
import {roundOff} from 'globals/global.functions';

import Chart from './ThresholdChart';
import {thresholdsStyle} from './Threshold.style';

const ThresholdGraph = ({
  highCutOff,
  lowCutOff,
  actual,
  selectedVital,
  setPercentile,
  percentile,
}: any) => {
  const {classes} = thresholdsStyle();

  return (
    <Box className={classes.thresholdGraph} data-testid='thresholdGraph'>
      <Box display='flex' justifyContent='center' width='100%'>
        <Box className={classes.thresholdGraphBox}>
          <Box height={22} width={132}>
            <Typography className={classes.thresholdGraphBoxContent}>
              Percentile (H)
            </Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <Box className={classes.valueSetter}>
              <Fields
                value={percentile.high}
                props={{type: 'number'}}
                name='graphHighValue'
                onChange={(e: any) => e.preventDefault()}
                InputProps={{
                  name: 'graphHighValue',
                  inputProps: {step: 0.01, min: 0.9, max: 0.99},
                  endAdornment: (
                    <InputAdornment position='end'>%</InputAdornment>
                  ),
                  style: {
                    backgroundColor: 'rgba(255, 192, 0, 0.75)',
                    border: 'none',
                    fontSize: '14px',
                    padding: '14px 0px',
                    paddingRight: '6px',
                    height: '1px',
                  },
                }}
              />
            </Box>
            <Box
              padding='0px'
              width='10px'
              height='16px'
              display='block'
              alignItems='center'>
              <Box
                display='flex'
                style={{
                  alignItems: 'center',
                }}>
                <ArrowDropUpIcon
                  style={{fontSize: 30}}
                  className={clsx({
                    [classes.disableIcon]:
                      selectedVital.currentState === VitalState.ACTIVE_INSIGHT,
                  })}
                  data-testid='percentileHighIncrease'
                  onClick={() => {
                    if (percentile.high < 0.99) {
                      setPercentile((prevState: any) => {
                        return {
                          ...prevState,
                          high: parseFloat(roundOff(prevState.high + 0.01, 2)),
                        };
                      });
                    }
                  }}
                />
              </Box>
              <Box
                display='flex'
                style={{
                  position: 'relative',
                  bottom: '85%',
                }}>
                <ArrowDropDownIcon
                  style={{fontSize: 30}}
                  className={clsx({
                    [classes.disableIcon]:
                      selectedVital.currentState === VitalState.ACTIVE_INSIGHT,
                  })}
                  data-testid='percentileHighDecrease'
                  onClick={() => {
                    if (percentile.high > 0.9) {
                      setPercentile((prevState: any) => {
                        return {
                          ...prevState,
                          high: parseFloat(roundOff(prevState.high - 0.01, 2)),
                        };
                      });
                    }
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={classes.thresholdGraphBox}>
          <Box height={22} width={132}>
            <Typography className={classes.thresholdGraphBoxContent}>
              Percentile (L)
            </Typography>
          </Box>
          <Box display='flex' style={{alignItems: 'center'}}>
            <Box className={classes.valueSetter}>
              <Fields
                value={percentile.low}
                name='graphLowValue'
                props={{type: 'number'}}
                onChange={(e: any) => e.preventDefault()}
                InputProps={{
                  name: 'graphLowValue',
                  inputProps: {step: 0.01, min: 0.01, max: 0.2},
                  endAdornment: (
                    <InputAdornment position='end'>%</InputAdornment>
                  ),
                  style: {
                    backgroundColor: '#9ace5d',
                    border: 'none',
                    fontSize: '14px',
                    padding: '14px 0px',
                    paddingRight: '6px',
                    height: '1px',
                  },
                }}
              />
            </Box>
            <Box width='10px' height='16px'>
              <Box
                display='flex'
                style={{
                  alignItems: 'center',
                }}>
                <ArrowDropUpIcon
                  style={{fontSize: 30}}
                  className={clsx({
                    [classes.disableIcon]:
                      selectedVital.currentState === VitalState.ACTIVE_INSIGHT,
                  })}
                  data-testid='percentileLowIncrease'
                  onClick={() => {
                    if (percentile.low < 0.2) {
                      setPercentile((prevState: any) => {
                        return {
                          ...prevState,
                          low: parseFloat(roundOff(prevState.low + 0.01, 2)),
                        };
                      });
                    }
                  }}
                />
              </Box>
              <Box
                align-items='center'
                style={{
                  position: 'relative',
                  bottom: '85%',
                }}>
                <ArrowDropDownIcon
                  style={{fontSize: 30}}
                  className={clsx({
                    [classes.disableIcon]:
                      selectedVital.currentState === VitalState.ACTIVE_INSIGHT,
                  })}
                  data-testid='percentileLowDecrease'
                  onClick={() => {
                    if (percentile.low > 0.01) {
                      setPercentile((prevState: any) => {
                        return {
                          ...prevState,
                          low: parseFloat(roundOff(prevState.low - 0.01, 2)),
                        };
                      });
                    }
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className={classes.thresholdGraphBox}>
          <Box height={22} width={132}>
            <Typography className={classes.thresholdGraphBoxContent}>
              High Cut off
            </Typography>
          </Box>
          <Box className={classes.cutOffValueContainer}>
            <Typography> {highCutOff || '-'}</Typography>
          </Box>
        </Box>

        <Box className={classes.thresholdGraphBox}>
          <Box height={22} width={132}>
            <Typography className={classes.thresholdGraphBoxContent}>
              Low Cut off
            </Typography>
          </Box>
          <Box className={classes.cutOffValueContainer}>
            <Typography> {lowCutOff || '-'}</Typography>
          </Box>
        </Box>
        <Box className={classes.thresholdGraphBoxLast}>
          <ColorIndicator />
        </Box>
      </Box>

      <ThresholdChart
        selectedVital={selectedVital}
        highCutOff={highCutOff}
        lowCutOff={lowCutOff}
        actual={actual}
      />
    </Box>
  );
};

const ColorIndicator = React.memo<any>(() => {
  const {classes} = thresholdsStyle();
  const item = [
    {
      label: 'Actual Value',
      color: 'rgba(15, 174, 210, 0.75)',
    },
    {
      label: 'Value After cut off',
      color: '#af0902',
    },
    {
      label: 'High cut off',
      color: 'rgba(255, 192, 0, 0.75)',
    },
    {
      label: 'Low cut off',
      color: 'rgba(121, 190, 39, 0.75)',
    },
  ];

  return item.map(({label, color}: any) => (
    <Box display='flex' alignItems='center' key={label}>
      <Box
        className={classes.identifierLabel}
        style={{backgroundColor: color}}
      />
      <Box alignItems='center'>
        <Typography className={classes.identifierLabelText}>{label}</Typography>
      </Box>
    </Box>
  ));
});

const ThresholdChart = React.memo(
  ({selectedVital, highCutOff, lowCutOff, actual}: any) => {
    const {classes} = thresholdsStyle();
    if (selectedVital.array) {
      return (
        <Box className={classes.thresholdGraphComponent}>
          <Chart
            selectedVital={selectedVital}
            baseline={{
              high: Math.floor(highCutOff),
              low: Math.floor(lowCutOff),
            }}
            actual={actual}
          />
        </Box>
      );
    } else {
      return (
        <Box
          className={classes.thresholdGraphComponent}
          justifyContent='center'>
          <Typography className={classes.noData} textAlign='center'>
            No Data
          </Typography>
        </Box>
      );
    }
  },
);
export default ThresholdGraph;
