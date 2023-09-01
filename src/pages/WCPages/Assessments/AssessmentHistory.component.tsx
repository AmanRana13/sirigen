/* eslint-disable max-len */
import React from 'react';
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
import {assessmentHistoryStyle} from './AssessmentHistory.style';
import {PAGINATION_LIMIT} from 'globals/global.constants';
import {useAppSelector} from 'hooks/reduxHooks';
import withPaginationTable from 'hoc/withPaginationIsolated';
import {IWithPaginationProps} from 'hoc/withPaginationIsolated/withPaginationTable.types';
import {
  IAssessmentHistoryProps,
  IAssessmentHistoryTableProps,
  IHistoryColumnProps,
} from './AssessmentHistory.type';
import {PAGINATION_TYPE, PaginationFetchTypes} from 'globals/enums';

const HistoryTable = ({
  data,
  onClickViewHistory,
  columnProps,
  tableLabel,
}: IAssessmentHistoryTableProps) => {
  const {classes} = assessmentHistoryStyle();
  const {assessmentId} = useAppSelector((state: any) => state.assessments);
  return (
    <TableContainer
      className={classes.tableInnerContainer}
      data-testid='assessmentHistoryComponent'>
      <Typography variant='h2' className={classes.tableHeadingText}>
        {tableLabel}
      </Typography>
      <Table size='medium' className={classes.table}>
        <TableHead>
          <TableRow>
            {columnProps.map((column: IHistoryColumnProps): any => (
              <TableCell
                key={column.label}
                align='center'
                style={{minWidth: 120}}>
                <Typography variant='body1Bold'>{column.label}</Typography>
              </TableCell>
            ))}
            <TableCell align='center'>
              <Typography variant='body1Bold'>Action</Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableCell className={classes.noData} colSpan={8} align='center'>
                No Record Found
              </TableCell>
            </TableRow>
          )}
          {data.map((history: any, index: number) => (
            <TableRow key={history.id}>
              {columnProps.map((column: IHistoryColumnProps): any => (
                <TableCell
                  component='th'
                  scope='row'
                  key={history.id}
                  align='center'>
                  {column.method
                    ? column.method(history)
                    : history[column.value]}
                </TableCell>
              ))}

              <TableCell align='center'>
                <Box
                  className={
                    history.assessmentId === assessmentId
                      ? classes.disabled
                      : classes.view
                  }
                  onClick={() => {
                    if (history.assessmentId !== assessmentId) {
                      window.scrollTo({top: 0, behavior: 'smooth'});
                      onClickViewHistory(history, index);
                    }
                  }}
                  data-testid='viewHistory'>
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

const AssessmentHistory = ({
  tableData,
  columnProps,
  actionCreators,
  onClickViewHistory,
  paginationProps,
  tableLabel,
  maximumScore,
}: IAssessmentHistoryProps) => {
  const seniorId = useAppSelector(
    (state: any) => state.common.seniorDetail.minimalInfo.user_id,
  );

  // HOC props
  const withPaginationProps: IWithPaginationProps = React.useMemo(() => {
    return {
      fetchType: PaginationFetchTypes.LAST_EVALUATED_KEY,
      dependency: seniorId,
      paginationProps: {
        getData: () => actionCreators.getData(),
        onSuccess: actionCreators.success,
        onError: actionCreators.error,
        onPageChange: actionCreators.pageChange,
        // cacheKey: `${TABLE_CACHE_KEY.GOALS}-${seniorId}`,
        rowsPerPage: PAGINATION_LIMIT.assessmentHistory,
        className: '',
        lastEvaluatedKeyPath: paginationProps.lastEvaluatedKeyPath,
        loadingPath: paginationProps.loadingPath,
        paginationType: PAGINATION_TYPE.SECONDARY,
        pagePath: paginationProps.pagePath,
        tableData,
        withBorder: true,
      },
    };
  }, [tableData, seniorId]);

  /**
   * @description Wrap component withPagination HOC to get the pagination service
   */
  const AssessmentHistoryWithPagination = withPaginationTable(
    HistoryTable,
    {columnProps, onClickViewHistory, tableLabel, maximumScore},
    withPaginationProps,
  );

  return (
    <React.Fragment>
      <Box>{AssessmentHistoryWithPagination()}</Box>
    </React.Fragment>
  );
};

export default React.memo(AssessmentHistory);
