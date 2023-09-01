import React from 'react';
import {Box, Grid, Typography} from '@mui/material';

import {SubHeader} from 'common/SubHeader';

import SeniorDetail from './components/SeniorDetails';
import MedicalInfoDetail from './components/MedicalInfoDetail';
import WellnessIndicator from './components/WellnessIndicator';
import {CallEntryComponent} from './components/CallEntry/CallEntry.component';

import {seniorDashboardStyle} from './SeniorDashboard.style';
import CareInsightsComponent from './components/CareInsights';
// eslint-disable-next-line max-len
import SeniorDetailSummary from './components/SeniorDetails/component/SeniorDetailSummary/SeniorDetailSummary';
import {LocationDashboardCard} from './components/WellnessIndicator/LocationDashboardCard.component';
import SOSTable from './components/SOSTable/SOSTable.component';
import { FacilityThemeProvider } from 'themes';

const SeniorDashboard = () => {
  const {classes} = seniorDashboardStyle();
  return (
    <FacilityThemeProvider>
    <Box className={classes.container} data-testid='senior-dashboard'>
      <SubHeader />
      <Grid container>
        <Grid item sm={3}>
          <SeniorDetail />
          <SeniorDetailSummary />
          <LocationDashboardCard />
        </Grid>
        <Grid item sm={9}>
          <WellnessIndicator />
          <Grid item container mt={2}>
            <Grid item sm={8}>
              <Box mr={2} ml={2}>
                <CallEntryComponent />
              </Box>
            </Grid>
            <Grid item sm={4}>
              <SOSTable />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
    </FacilityThemeProvider>
  );
};
export default SeniorDashboard;
