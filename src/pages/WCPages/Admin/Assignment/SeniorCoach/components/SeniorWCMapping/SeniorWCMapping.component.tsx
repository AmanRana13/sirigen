import {Box, TableContainer} from '@mui/material';
import Table from 'common/Table/Table.component';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {appRoutesEndpoints} from 'routes/appRoutesEndpoints';
import SeniorCoach from '../../SeniorCoach.component';
import {seniorWCMappingStyles} from './SeniorWCMapping.style';
import withPaginationTable from 'hoc/withPaginationIsolated/withPaginationTable';
import {openUnassignSeniorsDialog} from './SeniorWCMapping.action';
import {PAGINATION_LIMIT} from 'globals/global.constants';
import {useAppDispatch} from 'hooks/reduxHooks';
import {ICareAgentData} from 'services/careAgentAccountService/careAgentAccount.types';
import {
  getCareAgentListFail,
  getCareAgentListSuccess,
  getCareAgentListWithoutOvernight,
  getCareAgentSearchListSuccess,
  resetCareAgentList,
  searchCareAgentByName,
  updateCareAgentListPageNumber,
} from 'store/commonReducer/common.action';
import {IName} from 'common/UserName/UserName.types';
import {
  constructLocation,
  constructName,
  constructTimezoneAbbr,
  getCountString,
  toTitleCase,
} from 'globals/global.functions';
import clsx from 'clsx';
import {ITableRowData} from 'common/Table/Table.types';
import {PAGINATION_TYPE, PaginationFetchTypes} from 'globals/enums';

/**
 * @description component for WellnessCoachTable
 */
const WellnessCoachTable = (props: {data: ICareAgentData[]}) => {
  const {classes} = seniorWCMappingStyles();
  const headerData = React.useMemo(
    () => [
      {
        columnId: 'name',
        label: 'Wellness Coach Name',
        style: {minWidth: '240px'},
      },
      {columnId: 'location', label: 'Location', width: 300},
      {columnId: 'timezone', label: 'Time Zone', width: 220},
      {columnId: 'shift', label: 'Shift', width: 160},
      {columnId: 'assigned', label: 'Assigned', width: 90},
    ],
    [],
  );

  const dispatch: any = useAppDispatch();

  const handlePopup = React.useCallback(
    (record: ICareAgentData) => {
      dispatch(openUnassignSeniorsDialog(record));
    },
    [dispatch],
  );

  const renderAssign = React.useCallback(
    (value: any, record: ICareAgentData) => {
      return (
        <Box padding='12.5px 4px'>
          <span
            onClick={() => handlePopup(record)}
            className={clsx(classes.link, {
              [classes.disableLink]: !value?.length,
            })}>
            {getCountString(value?.length, 'Senior')}
          </span>
        </Box>
      );
    },
    [handlePopup],
  );

  const rowData = React.useMemo<ITableRowData<ICareAgentData>>(
    () => ({
      values: [
        {
          dataId: 'name',
          format: (name: IName) => constructName(name.firstName, name.lastName),
        },
        {
          dataId: 'location',
          format: (location: any) => constructLocation(location, true),
        },
        {
          dataId: 'timezone',
          format: (timezone: string) => constructTimezoneAbbr(timezone),
        },
        {
          dataId: 'shift',
          format: (shift: string) => toTitleCase(shift),
        },
        {
          dataId: 'assignedSenior',
          render: renderAssign,
        },
      ],
    }),
    [],
  );

  return (
    <Box>
      <TableContainer>
        <Table<ICareAgentData>
          headerData={headerData}
          rowId='userId'
          rowData={rowData}
          {...props}
        />
      </TableContainer>
    </Box>
  );
};

/**
 * @description component to perform senior wellness coach mapping
 */
const SeniorWCMapping = () => {
  const navigate = useNavigate();
  const {classes} = seniorWCMappingStyles();
  const dispatch: any = useAppDispatch();

  const unassignedSeniorsHandler = () => {
    navigate(
      // eslint-disable-next-line max-len
      `/portal-admin/${appRoutesEndpoints.admin.nestedRoutes.assignment.baseRoute}/${appRoutesEndpoints.admin.nestedRoutes.seniorCoach.baseRoute}/unassigned-seniors`,
      {replace: true},
    );
  };

  const withPaginationProps: any = React.useMemo(() => {
    const commonProps = {
      getData: getCareAgentListWithoutOvernight,
      onSuccess: getCareAgentListSuccess,
      onError: getCareAgentListFail,
      onSearchSuccess: getCareAgentSearchListSuccess,
      lastEvaluatedKeyPath: 'common.careAgentList.lastEvaluatedKey',
      tableDataPath: 'common.careAgentList.data',
    };
    return {
      fetchType: PaginationFetchTypes.LAST_EVALUATED_KEY,
      paginationProps: {
        ...commonProps,
        onPageChange: updateCareAgentListPageNumber,
        rowsPerPage: PAGINATION_LIMIT.wellnessCoachUnassignList,
        className: classes.pagination,
        containerClass: classes.paginationContainer,
        loadingPath: 'common.careAgentList.loading',
        paginationType: PAGINATION_TYPE.PRIMARY,
        isScrollOnTop: true,
        pagePath: 'common.careAgentList.currentPage',
        searchLastEvaluatedKeyPath:
          'common.careAgentList.searchLastEvaluatedKey',
      },
      searchBarProps: {
        ...commonProps,
        searchMethod: searchCareAgentByName,
        isNewDesign: true,
        placeholder: 'Search Wellness Coach',
        position: 'flex-start',
      },
    };
  }, []);

  /**
   * @description Wrap component withPagination HOC to get the pagination service
   */
  const seniorWCMappingWithPagination = withPaginationTable(
    WellnessCoachTable,
    {},
    withPaginationProps,
  );

  // on unmount clear the table data
  React.useEffect(() => {
    return () => {
      dispatch(resetCareAgentList());
    };
  }, [dispatch]);

  return (
    <>
      <SeniorCoach
        seniorCoachHandler={unassignedSeniorsHandler}
        mainHeading='Senior-Coach Assignment'
        subHeading='Wellness Coaches'
        buttonText='Unassigned Seniors'>
        <Box className={classes.searchbar}>
          {seniorWCMappingWithPagination()}
        </Box>
      </SeniorCoach>
    </>
  );
};

export default SeniorWCMapping;
