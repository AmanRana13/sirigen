import React from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {Box, Button, Typography} from '@mui/material';
import {emotionalSurveyStyle} from './WellnessSurvey.style';
import {
  getSurvey,
  resetDateFilter,
  updateFromDate,
  getWellnessSurveySuccess,
  getWellnessSurveyFail,
  resetWellnessSurvey,
  applyDateFilter,
  updateToDate,
  updateIsDateError,
  updateCurrentPage,
  getPriorThirtyDayDate,
} from './WellnessSurvey.action';
import SurveyTable from './components/SurveyTable';
import withPaginationTable from 'hoc/withPaginationIsolated';
import {PAGINATION_LIMIT, TABLE_CACHE_KEY} from 'globals/global.constants';
import DateRangeSelector from 'common/DateRangeSelector/DateRangeSelector';
import {PaginationFetchTypes, PAGINATION_TYPE} from 'globals/enums';
import {IWithPaginationProps} from 'hoc/withPaginationIsolated/withPaginationTable.types';

const TableWithPagination = React.memo(({data}: any) => {
  const {classes} = emotionalSurveyStyle();

  return (
    <Box height='100%' overflow='auto' data-testid='table-with-pagination'>
      <Box mt={3} className={classes.container}>
        <SurveyTable data={data} />
      </Box>
    </Box>
  );
});

const EmotionalSurveyComponent = () => {
  const {classes} = emotionalSurveyStyle();
  const dispatch: any = useAppDispatch();
  const tableRef: any = React.useRef(null);

  const currentSeniorId = useAppSelector(
    (state: any) => state?.common?.seniorDetail?.minimalInfo?.user_id,
  );

  const toDate = useAppSelector(
    (state: any) => state.seniorDashboard.wellnessSurvey.toDate,
  );

  const isDateError = useAppSelector(
    (state: any) => state.seniorDashboard.wellnessSurvey.isDateError,
  );

  const fromDate = useAppSelector(
    (state: any) => state.seniorDashboard.wellnessSurvey.fromDate,
  );

  const tableData = useAppSelector(
    (state: any) => state.seniorDashboard.wellnessSurvey.allSurveys,
  );
  // HOC props
  const withPaginationProps: IWithPaginationProps = React.useMemo(() => {
    return {
      fetchType: PaginationFetchTypes.LAST_EVALUATED_KEY,
      paginationProps: {
        getData: getSurvey,
        onSuccess: getWellnessSurveySuccess,
        onError: getWellnessSurveyFail,
        onPageChange: updateCurrentPage,
        cacheKey: `${TABLE_CACHE_KEY.WELLNESS_SURVEY}-${currentSeniorId}`,
        rowsPerPage: PAGINATION_LIMIT.wellbiengSurvey,
        className: '',
        lastEvaluatedKeyPath: 'seniorDashboard.wellnessSurvey.lastEvaluatedKey',
        loadingPath: 'seniorDashboard.wellnessSurvey.loading',
        paginationType: PAGINATION_TYPE.SECONDARY,
        pagePath: 'seniorDashboard.wellnessSurvey.currentPage',
        tableData,
      },
    };
  }, [tableData, currentSeniorId]);

  /**
   * @description Wrap component withPagination HOC to get the pagination service
   */
  const SurveysWithPagination = withPaginationTable(
    TableWithPagination,
    {},
    withPaginationProps,
  );

  const searchRangeProps = React.useMemo(
    () => ({
      startDate: fromDate,
      endDate: toDate,
      isDateError: isDateError,
      onStartDateSuccess: () => {
        dispatch(applyDateFilter());
      },
      onEndDateSuccess: () => {
        dispatch(applyDateFilter());
      },
      onChangeStartDate: (date: any) => {
        dispatch(updateFromDate(date));
      },
      onChangeEndDate: (date: any) => {
        dispatch(updateToDate(date));
      },
      onError: (isError: any) => {
        dispatch(updateIsDateError(isError));
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toDate, isDateError, fromDate],
  );

  React.useEffect(() => {
    dispatch(updateFromDate(getPriorThirtyDayDate()));
  }, [dispatch]);

  React.useEffect(() => {
    localStorage.removeItem(TABLE_CACHE_KEY.WELLNESS_SURVEY);
    return () => {
      dispatch(resetWellnessSurvey());
    };
  }, [dispatch]);

  return (
    <Box className={classes.rootContainer}>
      <Box className={classes.header}>
        <Box className={classes.headerTitle}>
          <Typography variant='h5'>Search Range:</Typography>
        </Box>
        <Box className={classes.searchRangeContainer}>
          <DateRangeSelector {...searchRangeProps} />
        </Box>
        <ClearButton />
      </Box>
      <Box ref={tableRef} className={classes.tableContainer}>
        <Box height='100%'>{SurveysWithPagination()}</Box>
      </Box>
    </Box>
  );
};

const ClearButton = React.memo(() => {
  const {classes} = emotionalSurveyStyle();
  const dispatch: any = useAppDispatch();

  const clearHandler = () => {
    dispatch(resetDateFilter());
  };
  return (
    <Box className={classes.clearButtonContainer}>
      <Button
        type='button'
        onClick={clearHandler}
        className={classes.clearButton}
        variant='contained'
        color='primary'
        data-testid='clear-button'>
        Clear
      </Button>
    </Box>
  );
});

const WellbiengSurvey = React.memo(() => {
  return (
    <Box data-testid='emotional-survey'>
      <EmotionalSurveyComponent />
    </Box>
  );
});

export default WellbiengSurvey;
