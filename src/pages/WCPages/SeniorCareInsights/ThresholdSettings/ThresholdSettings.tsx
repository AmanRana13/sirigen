import * as React from 'react';
import {Box, Grid, Typography} from '@mui/material';
import BaselineRange from './components/BaselineRange';
import {seniorCareInsightsStyle} from '../SeniorCareInsights.style';
import VitalsListing from './VitalsListing';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {
  assignVitalState,
  getVitals,
  removeSelectedVital,
  setSelectedVital,
} from './Threshold.action';
import {IThresholdVitalsData} from './ThresholdSettings.type';

/**
 * @description React component to handle threshold setting
 * @returns JSX
 */
const ThresholdSettings = () => {
  const {classes} = seniorCareInsightsStyle();
  const dispatch: any = useAppDispatch();
  const milestoneVital = new URLSearchParams(window.location.search).get(
    'vital',
  );

  const seniorId: string = useAppSelector(
    (state: any) => state.common.seniorDetail.minimalInfo.user_id,
  );

  const selectedVital: IThresholdVitalsData = useAppSelector(
    (state: any) => state.seniorCareInsights.thresholds.selectedVital,
  );

  const activeVital: IThresholdVitalsData[] = useAppSelector(
    (state: any) => state.seniorCareInsights.thresholds.vitals.active,
  );

  const showSelectedVital = async (data: any) => {
    const activeData = data.active.find(
      (item: any) => item.measurementName == milestoneVital,
    );
    const inActiveData = data.inactive.find(
      (item: any) => item.measurementName == milestoneVital,
    );

    if (activeData) {
      dispatch(setSelectedVital(activeData));
    } else if (inActiveData) {
      await dispatch(assignVitalState(inActiveData));
      dispatch(setSelectedVital(inActiveData));
    }
  };

  const getCIVitals = async () => {
    const vitalsData: any = await dispatch(getVitals());
    if (milestoneVital) {
      showSelectedVital(vitalsData);
    } else {
      dispatch(removeSelectedVital());
    }
  };

  React.useEffect(() => {
    if (seniorId) {
      getCIVitals();
    }
  }, [seniorId, dispatch]);

  /**
   * remove selected vital from redux state on unmount.
   */
  React.useEffect(() => {
    return () => {
      dispatch(removeSelectedVital());
    };
  }, [dispatch]);

  return (
    <Box className={classes.settingContainer} data-testid='threshold-settings'>
      <Grid container>
        <Grid item xs={2} className={classes.leftPane}>
          <VitalsListing />
        </Grid>
        <Grid item xs={10}>
          {activeVital.length === 0 && (
            <Box
              component='section'
              display='flex'
              flexDirection='row'
              justifyContent='center'
              alignItems='center'
              mx={10}
              my={5}
              height={500}>
              <Typography
                variant='h2'
                style={{color: '#A0A1A5', fontSize: 40, fontWeight: 400}}>
                No Active Vital Signs
              </Typography>
            </Box>
          )}
          {activeVital.length > 0 && !selectedVital && (
            <Box
              component='section'
              display='flex'
              flexDirection='row'
              justifyContent='center'
              alignItems='center'
              mx={10}
              my={5}
              height={500}>
              <Typography
                variant='h2'
                style={{color: '#A0A1A5', fontSize: 40, fontWeight: 400}}>
                Select Active Vital Sign
              </Typography>
            </Box>
          )}
          {activeVital.length > 0 && selectedVital && (
            <Box
              component='section'
              display='flex'
              flexDirection='column'
              alignItems='center'
              mx={10}
              my={5}>
              <BaselineRange />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ThresholdSettings;
