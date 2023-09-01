import React from 'react';
import {Grid, Box, Typography, CircularProgress} from '@mui/material';
import {NavLink} from 'react-router-dom';

import {maskPhoneNumber} from 'globals/global.functions';

import ShowHyphen from 'common/ShowHyphen/ShowHyphen';
import {ResidentSummaryStyle} from './ResidentDetailSummary.style';
import {useAppSelector} from 'hooks/reduxHooks';
import {DEVICE_TYPE} from 'globals/global.constants';

const ResidentDetailSummary = () => {
  const {classes} = ResidentSummaryStyle();
  const {
    seniorDetail: {minimalInfo, isLoading},
    careGiverInfo: caregiverData,
    providerInfo: providerData,
  } = useAppSelector((state: any) => state.common);
  const basicInfo = useAppSelector(
    (state: any) => state.common.seniorDetail.basicInfo,
  );

  const deviceDetail = useAppSelector((state: any) => state.devices.data);

  const summaryList: any = React.useMemo(() => {
    const {emergency_phone = '', mobile_number = null} = {
      ...basicInfo,
      ...minimalInfo,
    };

    const emergencyCareGiver = caregiverData?.find(
      (data: any) => data.emergencyContact === true,
    );
    const doctorDetail = providerData?.doctor?.find(
      (item: any) => item.isPrimary,
    );

    const watchDetail = deviceDetail?.find(
      (device: any) => device.device_type == DEVICE_TYPE.WATCH,
    );

    return [
      {
        label: 'Senior Mobile #',
        value: maskPhoneNumber(mobile_number),
      },
      {
        label: 'Watch phone #',
        value: maskPhoneNumber(watchDetail?.watch_phone_number) || '',
      },
      {
        label: 'Local 911 #',
        value: maskPhoneNumber(emergency_phone),
      },
      {
        label: 'Emergency Contact',
        value: `${emergencyCareGiver?.name?.firstName || ''} ${
          emergencyCareGiver?.name?.lastName || ''
        }`,
      },
      {
        label: 'Emergency Mobile #',
        value: maskPhoneNumber(emergencyCareGiver?.mobileNumber) || '',
      },
      {
        label: 'Primary Doctor',
        value: `${doctorDetail?.name?.firstName || ''} ${
          doctorDetail?.name?.lastName || ''
        }`,
      },
      {
        label: 'Doctor Office #',
        value: maskPhoneNumber(doctorDetail?.contactPhone) || '',
      },
    ];
  }, [
    basicInfo,
    caregiverData,
    deviceDetail,
    minimalInfo,
    providerData?.doctor,
  ]);

  if (isLoading) {
    return (
      <Box
        className={classes.ResidentSummaryContainer}
        display='flex'
        justifyContent='center'
        alignItems='center'
        data-testid='loader'>
        <CircularProgress color='primary' />
      </Box>
    );
  }
  return (
    <Grid
      className={classes.ResidentSummaryContainer}
      data-testid='Resident-detail-component'>
      {summaryList.map((summary: any) => {
        return (
          <Box key={summary.label} className={classes.ResidentDetail}>
            <Typography variant='h5' className={classes.ResidentDetailHeading}>
              {summary.label}:
            </Typography>
            <Typography variant='body1' className={classes.ResidentDetailValue}>
              <ShowHyphen withValue value={summary.value.trim()}>
                <NavLink to='#' className={classes.NavLink}>
                  {summary.value}
                </NavLink>
              </ShowHyphen>
            </Typography>
          </Box>
        );
      })}
    </Grid>
  );
};

export default ResidentDetailSummary;
