import React from 'react';
import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import {withStyles} from 'tss-react/mui';
import moment from 'moment';
import {toTitleCase, capitalizeFirstLetter} from 'globals/global.functions';
import {careInsightsStyle} from './CareInsights.style';
import {DATE_FORMAT, MEASUREMENT_TYPE} from 'globals/global.constants';
import {
  getDashboardCareInsight,
  getWellnessSurveyMessage,
} from './CareInsights.action';
import CollapsibleContainer from 'common/CollapsibleContainer';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {CareInsightTypes} from 'globals/enums';
import {ICareInsightHistory} from 'pages/WCPages/SeniorCareInsights/SeniorCareInsight.state';
import clsx from 'clsx';

const CustomTooltip = withStyles(Tooltip, (theme: any) => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: theme.typography.toolTipFontSize,
  },
}));

const InsightMessage = React.forwardRef((props: any, ref: any) => {
  let {measurementType, message, forTitle}: any = props;

  if (measurementType === MEASUREMENT_TYPE.WELLNESS_SURVEY) {
    const surveyMessage = getWellnessSurveyMessage(message);
    if (forTitle) {
      return surveyMessage;
    }
    message =
      JSON.parse(message).length > 1
        ? `${surveyMessage.substring(0, 70)}...`
        : surveyMessage;
  }

  return (
    <Box component='span' ref={ref} {...props}>
      {message && capitalizeFirstLetter(message)}
    </Box>
  );
});

const CollapsibleBody = () => {
  const {classes} = careInsightsStyle();
  const dispatch: any = useAppDispatch();

  const data = useAppSelector(
    (state: any) => state.seniorDashboard.careInsightHistory.data,
  );

  const isLoading = useAppSelector(
    (state: any) => state.seniorDashboard.careInsightHistory.loading,
  );

  const noRecordFound = React.useMemo(() => {
    return data.length === 0;
  }, [data]);

  React.useEffect(() => {
    dispatch(getDashboardCareInsight());
  }, [dispatch]);

  return (
    <TableContainer
      className={classes.tableContainer}
      component={Paper}
      data-testid='care-insights'>
      <Table className={classes.table} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell align='center' className={classes.tableHeading}>
              Day
            </TableCell>
            <TableCell align='center' className={classes.tableHeading}>
              Date
            </TableCell>
            <TableCell align='center' className={classes.tableHeading}>
              Time
            </TableCell>
            <TableCell align='center' className={classes.tableHeading}>
              Type
            </TableCell>
            <TableCell align='center' className={classes.tableHeading}>
              <Box width={170}>Insight Messages</Box>
            </TableCell>
            <TableCell align='center' className={classes.tableHeading}>
              Acknowledge
            </TableCell>
            {/* <TableCell align='center'>Caregiver/CA</TableCell> */}
            <TableCell align='center' className={classes.tableHeading}>
              Upper/Lower
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell className={classes.noDate} colSpan={8}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
          {!isLoading && noRecordFound && (
            <TableRow>
              <TableCell
                colSpan={8}
                className={clsx([classes.tableBody], [classes.noDate])}>
                No Record Found
              </TableCell>
            </TableRow>
          )}

          {data?.map((item: ICareInsightHistory) => {
            const {
              // ack_date,
              message,
              vitalSign,
              dateGenerated,
              type,
            }: ICareInsightHistory = item;

            const day = moment(dateGenerated).format('dddd');
            const date = moment(dateGenerated).format(DATE_FORMAT);
            const time = moment(dateGenerated).format('h:mm A');

            const ackDate = 'N/A';
            return (
              <TableRow key={item.careInsightId}>
                <TableCell align='center' className={classes.tableBody}>
                  {day}
                </TableCell>
                <TableCell align='center' className={classes.tableBody}>
                  {date}
                </TableCell>
                <TableCell align='center' className={classes.tableBody}>
                  {time}
                </TableCell>
                <TableCell align='center' className={classes.tableBody}>
                  {type === CareInsightTypes.Action
                    ? toTitleCase(CareInsightTypes.Alert)
                    : toTitleCase(type)}
                </TableCell>
                <TableCell
                  style={{
                    width: 130,
                    wordBreak:
                      vitalSign === MEASUREMENT_TYPE.WELLNESS_SURVEY
                        ? 'break-all'
                        : 'normal',
                  }}
                  align='center'
                  className={classes.tableBody}>
                  <CustomTooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    title={
                      <InsightMessage
                        measurementType={vitalSign || ''}
                        message={message}
                        forTitle={true}
                      />
                    }>
                    <InsightMessage
                      measurementType={vitalSign}
                      message={message}
                    />
                  </CustomTooltip>
                </TableCell>
                <TableCell align='center' className={classes.tableBody}>
                  {ackDate}
                </TableCell>
                {/* <TableCell align='center'>{caregiver_name || `-`}</TableCell> */}
                <TableCell align='center' className={classes.tableBody}>
                  N/A
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CareInsightsComponent = () => {
  return (
    <CollapsibleContainer heading='Care Insights'>
      <CollapsibleBody />
    </CollapsibleContainer>
  );
};

export default CareInsightsComponent;
