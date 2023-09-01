/* eslint-disable max-len */
import {Box, Button, DialogActions, TableContainer} from '@mui/material';
import Table from 'common/Table/Table.component';
import {
  PAGINATION_TYPE,
  TableSelectionType,
  PaginationFetchTypes,
} from 'globals/enums';
import React from 'react';
import {
  assignWellnessCoachDialogStyles,
  wellnessCoachTableStyles,
} from './AssignWellnessCoachDialog.style';
import DialogWrapper from '../DialogWrapper';
import ShowHyphen from 'common/ShowHyphen/ShowHyphen';
import {
  IDisplayDataColumn,
  IPopupProps,
  IWellnessCoachTableProps,
} from './AssignWellnessCoachDialog.types';
import {PAGINATION_LIMIT} from 'globals/global.constants';
import withPaginationTable from 'hoc/withPaginationIsolated/withPaginationTable';
import {eventMaxDialogLayoutStyle} from 'common/Events/EventMaxDialog.style';
import {
  constructLocation,
  constructName,
  constructTimezoneAbbr,
  getCountString,
  toTitleCase,
} from 'globals/global.functions';
import {IName} from 'common/UserName/UserName.types';
import {
  getCareAgentListFail,
  getCareAgentListSuccess,
  getCareAgentSearchListSuccess,
  updateCareAgentListPageNumber,
  closeDialog,
  resetCareAgentList,
  searchCareAgentByName,
  getCareAgentListWithoutOvernight,
} from 'store/commonReducer/common.action';
import {ICareAgentData} from 'services/careAgentAccountService/careAgentAccount.types';
import UserName from 'common/UserName';
import {assignWellnessCoach} from 'pages/WCPages/Admin/Assignment/SeniorCoach/components/SeniorCoachAssignment/SeniorCoachAssignment.action';
import {ITableColumn, ITableRowData} from 'common/Table/Table.types';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

/**
 * @description component for WellnessCoachTable
 * @param {IWellnessCoachTableProps} props
 * @return Table Component
 */
const WellnessCoachTable = ({
  data,
  selected,
  onChangeSelected,
  isDataLoading,
  isFilterLoading,
}: IWellnessCoachTableProps) => {
  const {classes} = wellnessCoachTableStyles();

  const headerData = React.useMemo<ITableColumn[]>(
    () => [
      {columnId: 'name', label: 'Wellness Coach Name'},
      {columnId: 'location', label: 'Location', width: 180},
      {columnId: 'timezone', label: 'Time Zone', width: 120},
      {columnId: 'shift', label: 'Shift', width: 100},
      {columnId: 'assigned', label: 'Assigned', width: 90},
    ],
    [],
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
          format: (value: any[]) => getCountString(value?.length, 'Senior'),
        },
      ],
    }),
    [],
  );

  return (
    <Box className={classes.tableContainer}>
      <TableContainer sx={{maxHeight: '475px', height: '475px'}}>
        <Table<ICareAgentData>
          headerData={headerData}
          rowId='userId'
          rowData={rowData}
          selectionType={TableSelectionType.SINGLE}
          isSelectable={(record: ICareAgentData) =>
            record.assignedSenior.length < 50
          }
          data={data}
          selected={selected}
          onChangeSelected={onChangeSelected}
          isDataLoading={isDataLoading}
          isFilterLoading={isFilterLoading}
        />
      </TableContainer>
    </Box>
  );
};

export const AssignWellnessCoachDialog = ({position}: IPopupProps) => {
  const {classes} = assignWellnessCoachDialogStyles();
  const dispatch: any = useAppDispatch();
  const data = useAppSelector((state: any) => state.common.dialog.data);
  const dialogTitle = useAppSelector(
    (state: any) => state.common.dialog.dialogTitle,
  );
  const [selected, setSelected] = React.useState<ICareAgentData[]>([]);
  const {classes: eventClasses} = eventMaxDialogLayoutStyle(position);

  const onCloseHandler = () => {
    dispatch(closeDialog());
  };

  const handleChangeSelected = React.useCallback(
    (newSelected: ICareAgentData[]) => {
      setSelected(newSelected);
    },
    [setSelected],
  );

  const displayData = React.useMemo<IDisplayDataColumn[]>(() => {
    let newArr = [
      {label: 'Location:', value: constructLocation(data?.minimal?.location)},
      {
        label: 'Time Zone:',
        value: constructTimezoneAbbr(data?.minimal?.timezone),
      },
    ];
    return data?.minimal?.is_resident
      ? [...newArr, {label: 'Facility:', value: '-'}]
      : newArr;
  }, [data]);

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
        withBorder: true,
        onPageChange: updateCareAgentListPageNumber,
        rowsPerPage: PAGINATION_LIMIT.wellnessCoachList,
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
  const seniorWCMappingWithPagination = React.useMemo(() => {
    return withPaginationTable(
      WellnessCoachTable,
      {selected, onChangeSelected: handleChangeSelected},
      withPaginationProps,
    );
  }, [selected, handleChangeSelected, withPaginationProps]);

  // Assign Action Handler, Passing Senior Names & CoachName for Success & error dialogs
  const handleAssign = React.useCallback(() => {
    const coach = selected[0];
    dispatch(
      assignWellnessCoach(
        {
          id: coach?.userId || '',
          name: constructName(
            coach?.name?.firstName,
            coach?.name?.middleName || '',
            coach?.name?.lastName,
          ),
        },
        {
          id: data?.senior_id || '',
          name: constructName(
            data?.minimal?.name?.first_name,
            '',
            data?.minimal?.name?.last_name,
          ),
        },
      ),
    );
  }, [data, selected, dispatch]);

  const checkResident = () => {
    return `Please Select 1 Wellness Coach to Assign to ${
      data?.minimal?.is_resident ? 'Resident' : 'Senior'
    }`;
  };
  // on unmount clear the table data
  React.useEffect(() => {
    return () => {
      dispatch(resetCareAgentList());
    };
  }, [dispatch]);

  return (
    <DialogWrapper title={dialogTitle} wide>
      <Box
        data-testid='AssignWellnessCoachDialog'
        className={classes.container}>
        <Box
          typography='body1'
          className={classes.displayData}
          marginBottom='0px'>
          <Box display='flex'>
            <Box className={classes.label}>{checkResident()}</Box>
            <Box>
              <ShowHyphen>
                <UserName
                  name={{
                    firstName: data?.minimal?.name?.first_name,
                    middleName: '',
                    lastName: data?.minimal?.name?.last_name,
                  }}
                />
              </ShowHyphen>
            </Box>
          </Box>
        </Box>
        <Box
          typography='body1'
          className={classes.displayData}
          marginBottom='18px'>
          {displayData.map((column: IDisplayDataColumn) => (
            <Box display='flex' key={column.label}>
              <Box className={classes.label}>{column.label}</Box>
              <Box>
                <ShowHyphen>{column.value}</ShowHyphen>
              </Box>
            </Box>
          ))}
        </Box>
        <Box className={classes.searchbar}>
          {seniorWCMappingWithPagination()}
        </Box>
        <DialogActions
          className={eventClasses.dialogActions}
          style={{
            justifyContent: 'center',
          }}>
          <Button
            data-testid='AssignWellnessCoachCancel'
            size='large'
            onClick={onCloseHandler}
            variant='outlined'>
            Cancel
          </Button>
          <Button
            data-testid='AssignWellnessCoachAssign'
            size='large'
            onClick={handleAssign}
            color='primary'
            variant='contained'
            disabled={selected.length === 0}>
            Assign
          </Button>
        </DialogActions>
      </Box>
    </DialogWrapper>
  );
};

export default AssignWellnessCoachDialog;
