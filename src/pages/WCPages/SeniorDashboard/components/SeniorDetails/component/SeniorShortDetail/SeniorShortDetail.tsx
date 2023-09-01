import React from 'react';
import moment from 'moment-timezone';
import {NavLink, useLocation} from 'react-router-dom';
import {Typography, Grid} from '@mui/material';

import {DATE_FORMAT} from 'globals/global.constants';
import {OnboardingTab} from 'globals/enums';
import {theme} from 'config/theme.config';
import {getSeniorResidentBaseUrl} from 'globals/global.functions';

const SeniorShortDetail = ({data}: any) => {
  const location = useLocation();

  const getCurrentAge = (value: any) => {
    const ageDifMs = Date.now() - new Date(value).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };
  const getSeniorOnboardingURL = getSeniorResidentBaseUrl();

  const list = [
    {
      label: 'Member Since',
      route: getSeniorOnboardingURL.seniorUrlWithTab(
        'onboarding-info',
        OnboardingTab.PROFILE_INFO,
      ),
      value: data.created_date
        ? moment(data.created_date).format(DATE_FORMAT)
        : '',
      isVisible: true,
    },
    {
      label: 'DOB/Age',
      route: getSeniorOnboardingURL.seniorUrlWithTab(
        'onboarding-info',
        OnboardingTab.PROFILE_INFO,
      ),
      value: data.dob
        ? `${moment(data.dob).format('MM-DD-YYYY')}/${getCurrentAge(
            data.dob,
          )} yrs`
        : '',
      isVisible: true,
    },
    {
      label: 'Facility',
      route: `-`,
      value: '',
      isVisible: data.isResident || false,
    },
  ];
  return (
    <Grid container>
      {list.map(
        (item) =>
          item.isVisible && (
            <Grid
              container
              key={item.label}
              style={{justifyContent: 'space-between'}}>
              <Grid item style={{flex: 2.2}}>
                <Typography
                  key={item.label}
                  style={{fontWeight: 'bold'}}
                  variant='body1'>
                  {item.label}:&nbsp;
                </Typography>
              </Grid>
              <Grid item style={{flex: 2.5}}>
                <Typography
                  key={item.label}
                  style={{wordBreak: 'break-all'}}
                  variant='body1'>
                  {item.value ? (
                    <NavLink
                      to={item.route || location.pathname}
                      style={{
                        color: theme.palette.common.black,
                      }}>
                      {item.value}
                    </NavLink>
                  ) : (
                    '-'
                  )}
                </Typography>
              </Grid>
            </Grid>
          ),
      )}
    </Grid>
  );
};

export default React.memo(SeniorShortDetail);
