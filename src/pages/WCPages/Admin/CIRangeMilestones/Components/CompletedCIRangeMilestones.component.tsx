import React from 'react';
import {Box} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

import {PAGINATION_LIMIT} from 'globals/global.constants';
import withPaginationTable from 'hoc/withPaginationIsolated';

import {
  getAdminCompletedCIRangeMilestones,
  getCompletedCIRangeMilestonesSuccess,
  getCompletedCIRangeMilestonesFail,
  updateCompletedCIRangeMilestonesPageNumber,
  resetCIRangeMilestonesData,
} from '../CIRangeMilestones.action';
import CIRangeMilestonesTable from '../CIRangeMilestonesTable.component';
import {completedCIRangeMilestonesStyle} from './CompletedCIRangeMilestones.style';
import {IWithPaginationProps} from 'hoc/withPaginationIsolated/withPaginationTable.types';
import {PAGINATION_TYPE, PaginationFetchTypes} from 'globals/enums';

const CompletedCIRangeMilestones = () => {
  const {classes} = completedCIRangeMilestonesStyle();
  const dispatch: any = useAppDispatch();

  const {completed} = useAppSelector((state: any) => state.cIRangeMilestones);

  React.useEffect(() => {
    return () => {
      dispatch(resetCIRangeMilestonesData());
    };
  }, []);

  const completedTableHeaders = [
    'Senior',
    'Type',
    'Milestone Date & Time',
    'Milestone',
    'Submitted',
  ];
  const noDataMsg = 'No Records';

  // HOC props
  const withPaginationProps: IWithPaginationProps = React.useMemo(() => {
    return {
      fetchType: PaginationFetchTypes.LAST_EVALUATED_KEY,
      paginationProps: {
        getData: () => getAdminCompletedCIRangeMilestones(),
        onSuccess: getCompletedCIRangeMilestonesSuccess,
        onError: getCompletedCIRangeMilestonesFail,
        onPageChange: updateCompletedCIRangeMilestonesPageNumber,
        rowsPerPage: PAGINATION_LIMIT.adminCIRangeMilestones,
        className: '',
        lastEvaluatedKeyPath: 'cIRangeMilestones.completed.lastEvaluatedKey',
        loadingPath: 'cIRangeMilestones.completed.loading',
        paginationType: PAGINATION_TYPE.SECONDARY,
        pagePath: 'cIRangeMilestones.completed.currentPage',
        tableData: completed.data,
      },
    };
  }, [completed.data]);

  /**
   * @description Wrap component withPagination HOC to get the pagination service
   */
  const CompletedCIRangeMilestonesWithPagination = withPaginationTable(
    CIRangeMilestonesTable,
    {
      tableHeadersList: completedTableHeaders,
      showArrowButton: false,
      noDataMsg,
    },
    withPaginationProps,
  );

  return (
    <React.Fragment>
      <Box
        className={classes.completedTableContainer}
        data-testid='CompletedCIRangeMilestones'>
        <Box>{CompletedCIRangeMilestonesWithPagination()}</Box>
      </Box>
    </React.Fragment>
  );
};

export default CompletedCIRangeMilestones;
