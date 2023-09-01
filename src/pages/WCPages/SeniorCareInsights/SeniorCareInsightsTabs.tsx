import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Grid, Tooltip, Typography} from '@mui/material';
import clsx from 'clsx';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {seniorCareInsightsStyle} from './SeniorCareInsights.style';
import {
  getCurrentSenior,
  getQueryParamTimezone,
} from 'globals/global.functions';

// eslint-disable-next-line max-len
const THRESHOLD_BUTTON_INFO = `Settings generate insight messages to the caregiver mobile app and care agent portal informing them of the status of the seniors vital signs. You can also enable and disable insight messaging by clicking the ON/OFF switch.`;
// eslint-disable-next-line max-len
const MESSAGE_MANAGER_INFO = `The message manager is used to view action messages and create summary messages about the member’s status. The care agent will be able to choose the date range for the message and view vital signs. These messages once completed will display in the Care Insights section in the caregiver application. The messages will also be stored in the message manager for review by care agent.`;

const SeniorCareInsightsTabs = () => {
  const {classes} = seniorCareInsightsStyle();
  const param = useParams<any>()['*'];
  const navigate = useNavigate();

  const handleChange = (path: any) => {
    const seniorInfo = {...getCurrentSenior()};
    navigate(
      `/senior/${seniorInfo.seniorID}/${
        seniorInfo.accountID
      }/${getQueryParamTimezone(seniorInfo.timezone)}/care-insights/${path}`,
      {replace: true},
    );
  };

  return (
    <React.Fragment>
      <Grid item xs={2}>
        <Button
          className={clsx([classes.thresholdNavButton], {
            [classes.filledButton]:
              param === 'threshold-setting' || param === undefined,
          })}
          onClick={() => handleChange('threshold-setting')}>
          <Typography className={classes.navTabs} variant='h4'>
            Range Settings
            <Tooltip
              classes={{
                tooltip: classes.tooltip,
              }}
              title={
                <Typography variant='subtitle1'>
                  {THRESHOLD_BUTTON_INFO}
                </Typography>
              }>
              <InfoOutlinedIcon className={classes.infoIcon} />
            </Tooltip>
          </Typography>
        </Button>
      </Grid>
      <Grid item xs={2} style={{marginLeft: 10}}>
        <Button
          className={clsx([classes.thresholdNavButton], {
            [classes.filledButton]: param === 'message-manager',
          })}
          onClick={() => handleChange('message-manager')}
          variant='contained'>
          <Typography className={classes.navTabs} variant='h4'>
            Message Manager
            <Tooltip
              classes={{
                tooltip: classes.tooltip,
              }}
              title={
                <Typography variant='subtitle1'>
                  {MESSAGE_MANAGER_INFO}
                </Typography>
              }>
              <InfoOutlinedIcon className={classes.infoIcon} />
            </Tooltip>
          </Typography>
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default SeniorCareInsightsTabs;
