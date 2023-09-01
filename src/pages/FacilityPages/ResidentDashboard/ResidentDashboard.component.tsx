/* eslint-disable max-len */
import {Box, Typography} from '@mui/material';
import FacilitySummaryTable from './components/FacilitySummaryTable/FacilitySummaryTable.component';
import SOSTable from './components/SOSTable/SOSTable.component';
import {residentDashboardStyle} from './ResidentDashboard.style';
import ResidentDetailSummary from '../AllResidents/component/ResidentDetailSummary/ResidentDetailSummary';
import SeniorDetail from 'pages/WCPages/SeniorDashboard/components/SeniorDetails/SeniorDetail.component';
import {LocationDashboardCard} from 'pages/WCPages/SeniorDashboard/components/WellnessIndicator/LocationDashboardCard.component';
import React from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {
  emptySeniorDetail,
  emptySeniorImage,
  resetLocationDates,
  setSeniorDetail,
  setSeniorImage,
} from 'store/commonReducer/common.action';
import WellnessIndicators from './WellnessIndicators.container';
import {getDashboardCareInsight} from 'pages/WCPages/SeniorDashboard/components/CareInsights/CareInsights.action';
import {useSOSData} from 'hooks/useSOSData';

const ResidentDashboard = () => {
  const {classes} = residentDashboardStyle();
  const dispatch: any = useAppDispatch();
  const careInsightHistory = useAppSelector(
    (state: any) => state.seniorDashboard.careInsightHistory.data,
  );
  const careInsightHistoryLoading = useAppSelector(
    (state: any) => state.seniorDashboard.careInsightHistory.loading,
  );

  const summaryData = React.useMemo(() => {
    return careInsightHistory ? careInsightHistory.slice(0, 20) : [];
  }, [careInsightHistory]);

  const {sosFallData, sosLoading, fallLoading} = useSOSData();

  React.useEffect(() => {
    dispatch(setSeniorDetail());
    dispatch(setSeniorImage());
    dispatch(getDashboardCareInsight());
    return () => {
      dispatch(emptySeniorDetail());
      dispatch(emptySeniorImage());
      dispatch(resetLocationDates());
    };
  }, []);

  return (
    <Box display='flex' flexDirection='column'>
      <Box margin='20px 0'>
        <Typography variant='h1v1' className={classes.dashboardTitle}>
          Dashboard
        </Typography>
      </Box>
      <Box display='flex' gap='30px'>
        <Box display='flex' flexDirection='column' gap='12px' width='397px'>
          <SeniorDetail />
          <ResidentDetailSummary />
          <LocationDashboardCard isResident />
        </Box>
        <Box display='flex' flexDirection='column' gap='30px' flexGrow={1}>
          <WellnessIndicators />
          <Box display='flex' gap='30px'>
            <Box flexGrow={1} className={classes.tableCard} maxWidth='796px'>
              <Box padding='12px 20px'>
                <Typography variant='body2' color='primary'>
                  Messages
                </Typography>
              </Box>
              <FacilitySummaryTable
                data={summaryData || []}
                loading={careInsightHistoryLoading}
              />
            </Box>
            <Box width='370px' className={classes.tableCard}>
              <Box padding='12px 20px'>
                <Typography variant='body2' color='primary'>
                  Fall & SOS Detection
                </Typography>
              </Box>
              <SOSTable
                data={sosFallData || []}
                loading={sosLoading || fallLoading}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ResidentDashboard;
