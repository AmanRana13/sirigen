import React from 'react';
import {isEmpty} from 'lodash';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {Box, Tooltip, Typography} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import {Fields} from 'common/Fields';
import SwitchInput from 'common/SwitchInput/SwitchInput';
import {openDialog} from 'store/commonReducer/common.action';
import {VitalState} from 'globals/enums';
import {DIALOG_TYPES} from 'globals/global.constants';
import {calculatePercentile, roundOff} from 'globals/global.functions';

import {baselineRangeStyle} from './BaselineRange.style';
import {
  updateVitalStateActiveInsight,
  refreshBaseline,
  resetVitalThresholdData,
} from '../Threshold.action';
import ThresholdFields from './ThresholdFields';
import clsx from 'clsx';

/**
 * @description Component to render Baseline Range of threshold
 * @returns JSX
 */
const BaselineRange = () => {
  const {classes} = baselineRangeStyle();
  const dispatch: any = useAppDispatch();

  const selectedVital = useAppSelector(
    (state: any) => state.seniorCareInsights.thresholds.selectedVital,
  );

  const [heartRate, setHeartRate] = React.useState<any>([]);
  const [cutOff, setCutOff] = React.useState<any>({high: 0, low: 0});
  const [percentile, setPercentile] = React.useState<any>({
    high: 0.99,
    low: 0.01,
  });
  const [baseline, setBaseLine] = React.useState<any>({
    high: '-',
    low: '-',
    avg: '-',
  });
  const [actual, setActual] = React.useState<any>({
    high: '-',
    low: '-',
    avg: '-',
  });

  React.useEffect(() => {
    if (selectedVital !== null) {
      setBaseLine({
        high: selectedVital.baseline.high || '-',
        low: selectedVital.baseline.low || '-',
        avg: selectedVital.baseline.avg || '-',
      });
      setActual({
        high: selectedVital.actual.high || '-',
        low: selectedVital.actual.low || '-',
        avg: selectedVital.actual.avg || '-',
      });
    }
  }, [selectedVital]);

  React.useEffect(() => {
    if (!isEmpty(selectedVital.array)) {
      setHeartRate(mapHeartRate(selectedVital.array));
    }
  }, [selectedVital.array]);

  React.useEffect(() => {
    if (!isEmpty(heartRate)) {
      calculateActual(heartRate);
    }
  }, [heartRate]);

  React.useEffect(() => {
    calculateBaseline();
  }, [percentile, heartRate]);

  const resetState = () => {
    setPercentile({
      high: 0.99,
      low: 0.01,
    });
  };

  const mapHeartRate = (arr: any) => {
    return Object.entries(arr).map((el: any) => {
      return el[1].heart_rate;
    });
  };

  const calculateActual = (arr: any) => {
    let actualHigh = Math.max(...arr);
    let actualLow = Math.min(...arr);
    let actualAvg = (actualHigh + actualLow) / 2;
    setActual({high: actualHigh, low: actualLow, avg: actualAvg});
  };

  const calculateBaseline = () => {
    if (!isEmpty(heartRate)) {
      const percentileHigh = calculatePercentile(heartRate, percentile.high);
      const percentileLow = calculatePercentile(heartRate, percentile.low);
      const highCutOff = roundOff(percentileHigh, 2);
      const lowCutOff = roundOff(percentileLow, 2);

      setCutOff({
        high: highCutOff,
        low: lowCutOff,
      });

      const baselineArray = heartRate.filter((element: any) => {
        if (element < highCutOff && element > lowCutOff) {
          return element;
        }
      });

      const baselineHigh = Math.max(...baselineArray);
      const baselineLow = Math.min(...baselineArray);
      const baselineAvg = (baselineHigh + baselineLow) / 2;

      setBaseLine({
        high: baselineHigh,
        low: baselineLow,
        avg: baselineAvg,
      });
    }
  };

  const onCareInsightToggle = (): void => {
    let openDialogProp;

    if (selectedVital.currentState === VitalState.ACTIVE_INSIGHT) {
      openDialogProp = {
        firstMessage: 'Want to switch',
        boldMessage: '"OFF"',
        secondMessage: ' Care Insight messages?',
        successButtonText: 'Confirm',
        type: DIALOG_TYPES.MESSAGE_ACTION_DIALOG,
        isFailButton: true,
        onSuccessButton: () =>
          dispatch(updateVitalStateActiveInsight(VitalState.ASSIGNED)),
      };
    } else {
      openDialogProp = {
        firstMessage: '',
        boldMessage: 'Submit',
        secondMessage:
          ' defined threshold values to turn on Care Insight messages.',
        successButtonText: 'Got it!',
        type: DIALOG_TYPES.MESSAGE_ACTION_DIALOG,
        isFailButton: false,
      };
    }
    dispatch(openDialog({...openDialogProp}));
  };

  const refreshThresholdHandler = () => {
    resetState();
    dispatch(resetVitalThresholdData());
    dispatch(refreshBaseline());
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      width='100%'
      data-testid='baseline-range'>
      <Box display='flex' justifyContent='space-between'>
        <Box>
          <Typography variant='h3v1'>
            {selectedVital.measurementTitle} Baseline Range
          </Typography>
          <Typography variant='subtitle1' className={classes.helperText}>
            Unit of Measure: {selectedVital.measurementUnit}
          </Typography>
        </Box>
        <SwitchInput
          label='Care Insight Message'
          checked={selectedVital.currentState === VitalState.ACTIVE_INSIGHT}
          handleChange={onCareInsightToggle}
          data-testid='switchInput'
        />
      </Box>
      <Box display='flex'>
        <Box className={classes.inputContainer}>
          <Box>
            <Fields
              name='actualHigh'
              fontSize='large'
              defaultValue='-'
              label='Actual High'
              value={actual.high}
              disabled={true}
            />
          </Box>
          <Box>
            <Fields
              name='actualAvg'
              fontSize='large'
              defaultValue='-'
              label='Actual Avg'
              value={actual.avg}
              disabled={true}
            />
          </Box>
          <Box mr={0}>
            <Fields
              name='actualLow'
              fontSize='large'
              defaultValue='-'
              label='Actual Low'
              value={actual.low}
              disabled={true}
            />
          </Box>
        </Box>
        <Box
          className={clsx(classes.refreshButton, {
            [classes.disableRefreshButton]:
              selectedVital.currentState === VitalState.ACTIVE_INSIGHT,
          })}>
          <Tooltip
            classes={{
              tooltip: classes.tooltip,
            }}
            title={<Typography variant='subtitle1'>Refresh</Typography>}>
            <RefreshIcon
              onClick={refreshThresholdHandler}
              data-testid='refresh'></RefreshIcon>
          </Tooltip>
        </Box>
      </Box>

      <Box className={classes.inputContainer}>
        <Box>
          <Fields
            data-testid='baselineHigh'
            name='high'
            fontSize='large'
            defaultValue='-'
            label='Baseline High'
            value={baseline.high}
            disabled={true}
          />
        </Box>
        <Box>
          <Fields
            name='avg'
            fontSize='large'
            defaultValue='-'
            label='Baseline Avg'
            value={baseline.avg}
            disabled={true}
          />
        </Box>
        <Box>
          <Fields
            name='low'
            fontSize='large'
            defaultValue='-'
            label='Baseline Low'
            value={baseline.low}
            disabled={true}
          />
        </Box>
      </Box>
      <ThresholdFields
        baseline={baseline}
        actual={actual}
        setPercentile={setPercentile}
        percentile={percentile}
        highCutOff={cutOff.high}
        lowCutOff={cutOff.low}
      />
    </Box>
  );
};

export default BaselineRange;
