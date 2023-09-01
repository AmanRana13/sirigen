import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import get from 'lodash.get';
import {
  TableContainer,
  TableHead,
  TableCell,
  Table,
  TableRow,
  TableBody,
  Box,
  Typography,
} from '@mui/material';

import {
  DATE_FORMAT_SHORT_YEAR,
  PAGINATION_LIMIT,
  TIME_FORMAT,
} from 'globals/global.constants';
import {
  HolisticAssessmentAdminStatus,
  PaginationFetchTypes,
  PAGINATION_TYPE,
} from 'globals/enums';
import withPaginationTable from 'hoc/withPaginationIsolated';

import {
  getAssessmentHistoryAdminFail,
  getAssessmentHistoryAdminSuccess,
  getHolisticAssessmentHistoryAdmin,
  GET_HOLISTIC_ASSESSMENT_ADMIN,
  toggleHolisticAssessmentAdminViewState,
  updateAssessmentHistoryAdminPageNumber,
} from './HolisticAssessmentAdmin.action';
import {previousVersionsStyle} from './PreviousVersions.style';
import {IWithPaginationProps} from 'hoc/withPaginationIsolated/withPaginationTable.types';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const PreviousVersionsTable = ({data}: any) => {
  const {classes} = previousVersionsStyle();
  const dispatch: any = useAppDispatch();
  const currentVersion = useAppSelector(
    (state: any) => state.holisticAssessmentAdmin.versionNumber,
  );

  const handleView = (history: any) => {
    dispatch(toggleHolisticAssessmentAdminViewState(true));
    dispatch({
      type: GET_HOLISTIC_ASSESSMENT_ADMIN,
      payload: {survey: history.form, versionNumber: history.versionNumber},
    });
  };

  return (
    <TableContainer
      className={classes.tableInnerContainer}
      data-testid='assessmentHistoryComponent'>
      <Typography variant='h2' className={classes.tableHeadingText}>
        Previous Versions
      </Typography>
      <Table size='medium' className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Version</TableCell>
            <TableCell align='center'>Status</TableCell>
            <TableCell align='center'>Published Date</TableCell>
            <TableCell align='center'>Published Time</TableCell>
            <TableCell align='center'>Admin Name</TableCell>
            <TableCell align='center'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((history: any, index: number): any => (
            <TableRow key={history.id}>
              <TableCell align='center'>
                Version {history.versionNumber}
              </TableCell>
              <TableCell align='center'>
                {history.formStatus == 'submit' ? 'Published' : 'Not Published'}
              </TableCell>
              <TableCell
                align='center'
                style={{
                  color:
                    history.formStatus ==
                    HolisticAssessmentAdminStatus.SubmitLater
                      ? '#868686'
                      : '#000',
                }}>
                {moment(
                  get(history, 'publishedDateAndTime') ||
                    get(history, 'createdDateAndTime'),
                ).format(DATE_FORMAT_SHORT_YEAR)}
              </TableCell>
              <TableCell
                align='center'
                style={{
                  color:
                    history.formStatus ==
                    HolisticAssessmentAdminStatus.SubmitLater
                      ? '#868686'
                      : '#000',
                }}>
                {moment(
                  get(history, 'publishedDateAndTime') ||
                    get(history, 'createdDateAndTime'),
                ).format(TIME_FORMAT)}
              </TableCell>
              <TableCell align='center'>{history.adminName}</TableCell>
              <TableCell align='center'>
                <Box
                  className={clsx(classes.view, {
                    [classes.disableView]:
                      currentVersion == history.versionNumber,
                  })}
                  data-testid = 'versionNumberBox'
                  onClick={() => handleView(history)}>
                  View
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const PreviousVersions = React.memo(() => {
  const tableData = useAppSelector(
    (state: any) => state.holisticAssessmentAdmin.history.data,
  );

  // HOC props
  const withPaginationProps: IWithPaginationProps = React.useMemo(() => {
    return {
      fetchType: PaginationFetchTypes.LAST_EVALUATED_KEY,
      paginationProps: {
        getData: () => getHolisticAssessmentHistoryAdmin(),
        onSuccess: getAssessmentHistoryAdminSuccess,
        onError: getAssessmentHistoryAdminFail,
        onPageChange: updateAssessmentHistoryAdminPageNumber,
        //cacheKey: `${TABLE_CACHE_KEY.HOLISTIC_ADMIN}`,
        rowsPerPage: PAGINATION_LIMIT.assessmentHistory,
        className: '',
        lastEvaluatedKeyPath:
          'holisticAssessmentAdmin.history.lastEvaluatedKey',
        loadingPath: 'holisticAssessmentAdmin.history.loading',
        paginationType: PAGINATION_TYPE.SECONDARY,
        pagePath: 'holisticAssessmentAdmin.history.currentPage',
        tableData,
        withBorder: true,
      },
    };
  }, [tableData]);

  /**
   * @description Wrap component withPagination HOC to get the pagination service
   */
  const PreviousVersionsWithPagination = withPaginationTable(
    PreviousVersionsTable,
    {},
    withPaginationProps,
  );

  return (
    <React.Fragment>
      <Box>{PreviousVersionsWithPagination()}</Box>
    </React.Fragment>
  );
});

export default PreviousVersions;
