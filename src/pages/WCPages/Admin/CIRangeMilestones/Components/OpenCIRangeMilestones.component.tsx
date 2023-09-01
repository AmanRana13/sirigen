import React from 'react';
import {Box} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

import withPaginationTable from 'hoc/withPaginationIsolated';
import {PAGINATION_LIMIT} from 'globals/global.constants';

import {
  getAdminOpenCIRangeMilestones,
  getOpenCIRangeMilestonesSuccess,
  getOpenCIRangeMilestonesFail,
  updateOpenCIRangeMilestonesPageNumber,
  resetCIRangeMilestonesData,
} from '../CIRangeMilestones.action';
import CIRangeMilestonesTable from '../CIRangeMilestonesTable.component';
import {openCIRangeMilestonesStyle} from './OpenCIRangeMilestones.style';
import {IWithPaginationProps} from 'hoc/withPaginationIsolated/withPaginationTable.types';
import {PAGINATION_TYPE, PaginationFetchTypes} from 'globals/enums';

const OpenCIRangeMilestones = () => {
  const {classes} = openCIRangeMilestonesStyle();
  const dispatch: any = useAppDispatch();

  const {open} = useAppSelector((state: any) => state.cIRangeMilestones);

  React.useEffect(() => {
    return () => {
      dispatch(resetCIRangeMilestonesData());
    };
  }, []);

  const openTableHeaders = [
    'Senior',
    'Type',
    'Milestone Date & Time',
    'Milestone',
    'Last Submitted',
  ];
  const noDataMsg = 'No Pending Messages';

  // HOC props
  const withPaginationProps: IWithPaginationProps = React.useMemo(() => {
    return {
      fetchType: PaginationFetchTypes.LAST_EVALUATED_KEY,
      paginationProps: {
        getData: () => getAdminOpenCIRangeMilestones(),
        onSuccess: getOpenCIRangeMilestonesSuccess,
        onError: getOpenCIRangeMilestonesFail,
        onPageChange: updateOpenCIRangeMilestonesPageNumber,
        rowsPerPage: PAGINATION_LIMIT.adminCIRangeMilestones,
        className: '',
        lastEvaluatedKeyPath: 'cIRangeMilestones.open.lastEvaluatedKey',
        loadingPath: 'cIRangeMilestones.open.loading',
        paginationType: PAGINATION_TYPE.SECONDARY,
        pagePath: 'cIRangeMilestones.open.currentPage',
        tableData: open.data,
      },
    };
  }, [open.data]);

  /**
   * @description Wrap component withPagination HOC to get the pagination service
   */
  const OpenCIRangeMilestonesWithPagination = withPaginationTable(
    CIRangeMilestonesTable,
    {
      tableHeadersList: openTableHeaders,
      showArrowButton: true,
      noDataMsg,
    },
    withPaginationProps,
  );

  return (
    <React.Fragment>
      <Box className={classes.openTableContainer}>
        <Box>{OpenCIRangeMilestonesWithPagination()}</Box>
      </Box>
    </React.Fragment>
  );
};

export default OpenCIRangeMilestones;
