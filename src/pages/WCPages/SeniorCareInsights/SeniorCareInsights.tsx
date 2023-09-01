/* eslint-disable max-len */
import React from 'react';
import {Box, Grid} from '@mui/material';

import {SubHeader} from 'common/SubHeader';

import {ContanctInfo} from './ContantInfo.component';
import {seniorCareInsightsStyle} from './SeniorCareInsights.style';
import CareInsightsTabs from './SeniorCareInsightsTabs';
import {Route, Routes, useParams} from 'react-router-dom';
import ThresholdSettings from './ThresholdSettings';
import MessageManager from './MessageManager';

const Renderer = () => {
  const param = useParams();
  switch (param?.careInsightTab) {
    case 'threshold-setting':
      return <ThresholdSettings />;
    case 'message-manager':
      return <MessageManager />;
    default:
      return <ThresholdSettings />;
  }
};

const SeniorCareInsights = ({...props}) => {
  const {classes} = seniorCareInsightsStyle();
  return (
      <Box className={classes.container} data-testid='SeniorCareInsights'>
        <SubHeader {...props} />
        <ContanctInfo />
        <Grid container className={classes.thresholdNav}>
          <CareInsightsTabs />
        </Grid>

        <Routes>
          <Route path=':careInsightTab' element={<Renderer />} />
        </Routes>
      </Box>
  );
};

export default React.memo(SeniorCareInsights);
