//@TODO: NEED TO REMOVE THE COMMENTED CODE LATER ON
import React from 'react';
import {useAppSelector} from 'hooks/reduxHooks';
import {Box, Button} from '@mui/material';
import {VitalState} from 'globals/enums';

const ThresholdActionButtons = ({handleClear}: any) => {
  const selectedVital: any = useAppSelector(
    (state: any) => state.seniorCareInsights.thresholds.selectedVital,
  );

  React.useMemo(() => {
    const hasAllValueEmpty: boolean = Object.keys(
      selectedVital.threshold,
    ).every(
      (value: number | string) =>
        selectedVital.threshold[value] === null ||
        selectedVital.threshold[value] === '',
    );
    return (
      hasAllValueEmpty ||
      selectedVital.currentState === VitalState.ACTIVE_INSIGHT
    );
  }, [selectedVital.threshold, selectedVital.currentState]);

  React.useMemo(() => {
    const hasAllValueEmpty: boolean = Object.keys(
      selectedVital.threshold,
    ).every(
      (value: number | string) =>
        selectedVital.threshold[value] === '' ||
        selectedVital.threshold[value] === null,
    );
    return (
      hasAllValueEmpty ||
      selectedVital.currentState === VitalState.ACTIVE_INSIGHT
    );
  }, [selectedVital.threshold, selectedVital.currentState]);
  return (
    <Box display='flex' justifyContent='center'>
      <Button
        //disabled={isDisableClear}
        style={{marginRight: 10}}
        type='button'
        size='large'
        variant='outlined'
        className='secondaryButton'
        onClick={handleClear}>
        Clear
      </Button>
      <Button
        //disabled={isDisableSubmit}
        type='submit'
        size='large'
        color='primary'
        variant='contained'>
        Submit
      </Button>
    </Box>
  );
};

export default ThresholdActionButtons;
