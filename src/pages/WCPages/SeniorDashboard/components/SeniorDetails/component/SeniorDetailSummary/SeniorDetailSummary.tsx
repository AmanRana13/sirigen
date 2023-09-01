import React from 'react';
import {Grid, Box, Typography, CircularProgress} from '@mui/material';
import {NavLink} from 'react-router-dom';

import {DEVICE_TYPE} from 'globals/global.constants';
import {
  maskPhoneNumber,
  getSeniorResidentBaseUrl,
} from 'globals/global.functions';
import {OnboardingTab} from 'globals/enums';
import {theme} from 'config/theme.config';

import {seniorSummaryStyle} from './SeniorDetailSummary.style';
import {useAppSelector} from 'hooks/reduxHooks';
import ShowHyphen from 'common/ShowHyphen/ShowHyphen';
import clsx from 'clsx';

const SeniorDetailSummary = () => {
  const {classes} = seniorSummaryStyle();
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
    const getSeniorOnboardingURL = getSeniorResidentBaseUrl();
    const onboardingEndpoint = 'onboarding-info';
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
        route: getSeniorOnboardingURL.seniorUrlWithTab(
          onboardingEndpoint,
          OnboardingTab.PROFILE_INFO,
        ),
        value: maskPhoneNumber(mobile_number),
      },
      {
        label: 'Watch phone #',
        route: getSeniorOnboardingURL.seniorUrlWithTab(
          onboardingEndpoint,
          OnboardingTab.DEVICES,
        ),
        value: maskPhoneNumber(watchDetail?.watch_phone_number) || '',
      },
      {
        label: 'Local 911 #',
        route: getSeniorOnboardingURL.seniorUrlWithTab(
          onboardingEndpoint,
          OnboardingTab.PROFILE_INFO,
        ),
        value: maskPhoneNumber(emergency_phone),
      },
      {
        label: 'Emergency Contact',
        route: getSeniorOnboardingURL.seniorUrlWithTab(
          onboardingEndpoint,
          OnboardingTab.CARE_CIRCLE,
        ),
        value: `${emergencyCareGiver?.name?.firstName || ''} ${
          emergencyCareGiver?.name?.lastName || ''
        }`,
      },
      {
        label: 'Emergency Mobile #',
        route: getSeniorOnboardingURL.seniorUrlWithTab(
          onboardingEndpoint,
          OnboardingTab.CARE_CIRCLE,
        ),
        value: maskPhoneNumber(emergencyCareGiver?.mobileNumber) || '',
      },
      {
        label: 'Primary Doctor',
        route: getSeniorOnboardingURL.seniorUrlWithTab(
          onboardingEndpoint,
          OnboardingTab.PROVIDER_INFO,
        ),
        value: `${doctorDetail?.name?.firstName || ''} ${
          doctorDetail?.name?.lastName || ''
        }`,
      },
      {
        label: 'Doctor Office #',
        route: getSeniorOnboardingURL.seniorUrlWithTab(
          onboardingEndpoint,
          OnboardingTab.PROVIDER_INFO,
        ),
        value: maskPhoneNumber(doctorDetail?.contactPhone) || '',
      },
      {
        label: 'Home Information',
        route: getSeniorOnboardingURL.seniorUrlWithTab(
          onboardingEndpoint,
          OnboardingTab.PROFILE_INFO,
        ),
        render: <Box className={classes.underline}>Click here</Box>,
      },
    ];
  }, [
    basicInfo,
    caregiverData,
    classes.underline,
    deviceDetail,
    minimalInfo,
    providerData?.doctor,
  ]);

  if (isLoading) {
    return (
      <Box
        className={classes.seniorSummaryContainer}
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
      className={clsx(
        classes.seniorSummaryContainer,
        classes.seniorSummaryTable,
      )}
      data-testid='senior-detail-component'>
      {summaryList.map((summary: any) => {
        return (
          <Box key={summary.label} className={classes.seniorDetail}>
            <Typography variant='h5' className={classes.seniorDetailHeading}>
              {summary.label}:
            </Typography>
            <Typography variant='body1' className={classes.seniorDetailValue}>
              {summary.render ? (
                <NavLink to={summary.route} style={{color: '#0186a5'}}>
                  {summary.render}
                </NavLink>
              ) : (
                <ShowHyphen withValue value={summary.value.trim()}>
                  <NavLink to={summary.route} style={{color: '#000'}}>
                    {summary.value}
                  </NavLink>
                </ShowHyphen>
              )}
            </Typography>
          </Box>
        );
      })}
    </Grid>
  );
};

export default SeniorDetailSummary;
