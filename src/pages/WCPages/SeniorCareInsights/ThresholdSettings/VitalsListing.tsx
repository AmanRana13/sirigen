import * as React from 'react';
import {isEmpty} from 'lodash';
import {Box, Typography} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {seniorCareInsightsStyle} from '../SeniorCareInsights.style';
import clsx from 'clsx';
import {
  assignVitalState,
  getHeartRateData,
  setSelectedVital,
  unAssignVitalState,
} from './Threshold.action';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {IThresholdVitalsData} from './ThresholdSettings.type';
import {openDialog} from 'store/commonReducer/common.action';
import {DIALOG_TYPES} from 'globals/global.constants';
import {VitalState} from 'globals/enums';

const VitalsListing = () => {
  const {classes} = seniorCareInsightsStyle();

  const dispatch: any = useAppDispatch();
  const activeVitals = useAppSelector(
    (state: any) => state.seniorCareInsights.thresholds.vitals.active,
  );
  const inActiveVitals = useAppSelector(
    (state: any) => state.seniorCareInsights.thresholds.vitals.inactive,
  );
  const selectedVital = useAppSelector(
    (state: any) => state.seniorCareInsights.thresholds.selectedVital,
  );

  React.useEffect(() => {
    if (!isEmpty(selectedVital) && selectedVital.timestamp) {
      dispatch(
        getHeartRateData(
          selectedVital.timestamp.start,
          selectedVital.timestamp.end,
        ),
      );
    }
  }, [selectedVital]);

  const handleAddVitals = (selectedVital: any) => {
    dispatch(assignVitalState(selectedVital));
  };
  const handleRemoveVitals = (selectedVital: IThresholdVitalsData) => {
    let openDialogProp;

    if (selectedVital.currentState === VitalState.ACTIVE_INSIGHT) {
      openDialogProp = {
        firstMessage: 'First',
        boldMessage: 'Switch Care Insight Messages OFF,',
        secondMessage: ' then you can remove the vital.',
        successButtonText: 'Got it!',
        type: DIALOG_TYPES.MESSAGE_ACTION_DIALOG,
        isFailButton: false,
      };
    } else {
      openDialogProp = {
        firstMessage: 'Are you sure you want to remove',
        boldMessage: selectedVital.measurementTitle,
        secondMessage: '?',
        successButtonText: 'Remove',
        type: DIALOG_TYPES.MESSAGE_ACTION_DIALOG,
        isFailButton: true,
        onSuccessButton: () => dispatch(unAssignVitalState(selectedVital)),
      };
    }

    dispatch(openDialog({...openDialogProp}));
  };

  const handleSelected = (selectedVital: any) => {
    dispatch(setSelectedVital(selectedVital));
  };
  return (
    <React.Fragment>
      <Box color='#fff' pt={1} data-testid='active-vitals-listing'>
        <Box className={classes.headingVital} pl={2} pb={1}>
          <Typography variant='h4'>Active Vital Signs</Typography>
        </Box>
        <Box borderBottom={1} borderTop={1}>
          {activeVitals.map((data: IThresholdVitalsData, i: any) => {
            return (
              <>
                <Box
                  key={data.seniorId}
                  className={clsx([classes.vitalContainer], {
                    [classes.selectedVital]: data.selected,
                  })}>
                  <Box
                    className={classes.vitalList}
                    onClick={() => handleSelected(data)}
                    data-testid='select-active-vital'>
                    <Box
                      mr={1}
                      ml={1}
                      className={clsx([classes.inActiveIndicator], {
                        [classes.activeIndicator]:
                          data.currentState === VitalState.ACTIVE_INSIGHT,
                      })}></Box>
                    <Typography variant='body1'>
                      {data.measurementTitle}
                    </Typography>
                  </Box>
                  <CloseOutlinedIcon
                    className={classes.iconSize}
                    onClick={() => handleRemoveVitals(data)}
                    data-testid='closeVitalButton'
                  />
                </Box>
                {!data.selected &&
                  i !== activeVitals.length - 1 &&
                  !activeVitals[i + 1]?.selected && (
                    <Box className={classes.separator}></Box>
                  )}
              </>
            );
          })}
        </Box>
      </Box>
      <Box mt={1} color='#fff' data-testid='inactiveVitalsListing'>
        <Box className={classes.headingVital} pl={2} pb={1}>
          <Typography variant='h4'>Add Vitals</Typography>
          <Box className={classes.count}>
            <Typography variant='subtitle1'>{inActiveVitals.length}</Typography>
          </Box>
        </Box>
        <Box borderBottom={1} borderTop={1}>
          {inActiveVitals.map((data: any, key: any) => (
            <>
              <Box
                key={data.name}
                className={clsx(classes.vitalContainer, {
                  [classes.disableVital]: data.isDisable,
                })}>
                <Box ml={1} className={classes.vitalList}>
                  <Typography variant='body1'>
                    {data.measurementTitle}
                  </Typography>
                </Box>
                <AddOutlinedIcon
                  className={classes.iconSize}
                  onClick={() => !data.isDisable && handleAddVitals(data)}
                  data-testid='addVitalButton'
                />
              </Box>
              {key !== inActiveVitals.length - 1 && (
                <Box className={classes.separator}></Box>
              )}
            </>
          ))}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default VitalsListing;
