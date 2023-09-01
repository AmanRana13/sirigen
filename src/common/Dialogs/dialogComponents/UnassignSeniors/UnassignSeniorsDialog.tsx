/* eslint-disable max-len */
import {Box, Button, DialogActions, TableContainer} from '@mui/material';
import React from 'react';
import {
  assignWellnessCoachDialogStyles,
  wellnessCoachTableStyles,
} from '../AssignWellnessCoach/AssignWellnessCoachDialog.style';
import DialogWrapper from '../DialogWrapper';
import ShowHyphen from 'common/ShowHyphen/ShowHyphen';
import {eventMaxDialogLayoutStyle} from 'common/Events/EventMaxDialog.style';
import {
  constructLocation,
  constructName,
  constructTimezoneAbbr,
  getAge,
  getCountString,
  toTitleCase,
} from 'globals/global.functions';
import {
  closeDialog,
  getSeniorList,
  getSeniorListFail,
  getSeniorListSuccess,
  getSeniorSearchListSuccess,
  resetSeniorList,
  searchSeniorByName,
  updateSeniorListPageNumber,
} from 'store/commonReducer/common.action';
import Table from 'common/Table/Table.component';
import {
  PaginationFetchTypes,
  TableSelectionType,
  PAGINATION_TYPE,
} from 'globals/enums';
import {PAGINATION_LIMIT} from 'globals/global.constants';
import withPaginationTable from 'hoc/withPaginationIsolated/withPaginationTable';
import {
  IDisplayDataColumn,
  IPopupProps,
} from '../AssignWellnessCoach/AssignWellnessCoachDialog.types';
import UserName from 'common/UserName';
import {ISeniorsTableProps} from './UnassignSeniorsDialog.types';
import {unassignSeniors} from 'pages/WCPages/Admin/Assignment/SeniorCoach/components/SeniorWCMapping/SeniorWCMapping.action';
import {ITableColumn} from 'common/Table/Table.types';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

/**
 * @description component for AssignedSeniorsTable
 * @param {ISeniorsTableProps} props
 * @return Table Component
 */
const AssignedSeniorsTable = ({
  data,
  selected,
  onChangeSelected,
  isDataLoading,
  isFilterLoading,
}: ISeniorsTableProps) => {
  const {classes} = wellnessCoachTableStyles();

  const headerData = React.useMemo<ITableColumn[]>(
    () => [
      {columnId: 'name', label: 'Senior Name'},
      {columnId: 'location', label: 'Location', width: 220},
      {columnId: 'timezone', label: 'Time Zone', width: 120},
      {columnId: 'facility', label: 'Facility', width: 120},
    ],
    [],
  );

  const rowData = React.useMemo(
    () => ({
      values: [
        {
          dataId: 'minimal',
          dataKey: 'name',
          format: (minimal: any) =>
            constructName(minimal?.name?.first_name, minimal?.name?.last_name),
        },
        {
          dataId: 'minimal',
          dataKey: 'location',
          format: (minimal: any) => constructLocation(minimal?.location),
        },
        {
          dataId: 'minimal',
          dataKey: 'timezone',
          format: (minimal: any) => constructTimezoneAbbr(minimal?.timezone),
        },
        {
          dataId: 'minimal',
          dataKey: 'facility',
          format: (minimal: any) =>
            minimal?.facility ? minimal?.facility : '-',
        },
      ],
    }),
    [],
  );

  return (
    <Box className={classes.tableContainer}>
      <TableContainer sx={{maxHeight: '475px', height: '475px'}}>
        <Table
          headerData={headerData}
          rowId='senior_id'
          rowData={rowData}
          selectionType={TableSelectionType.MULTIPLE}
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

export const UnassignSeniorsDialog = ({position}: IPopupProps) => {
  const {classes} = assignWellnessCoachDialogStyles();
  const dispatch: any = useAppDispatch();
  const data = useAppSelector((state: any) => state.common.dialog.data);
  const dialogTitle = useAppSelector(
    (state: any) => state.common.dialog.dialogTitle,
  );
  const [selected, setSelected] = React.useState<any[]>([]);
  const {classes: eventClasses} = eventMaxDialogLayoutStyle(position);

  const onCloseHandler = () => {
    dispatch(closeDialog());
  };

  const handleChangeSelected = React.useCallback(
    (newSelected: any[]) => {
      setSelected(newSelected);
    },
    [setSelected],
  );

  const displayData = React.useMemo<IDisplayDataColumn[]>(
    () => [
      {label: 'Location:', value: constructLocation(data?.location, true)},
      {label: 'Time Zone:', value: constructTimezoneAbbr(data?.timezone)},
      {label: 'Shift:', value: toTitleCase(data?.shift)},
      {
        label: 'Assigned',
        value: getCountString(data?.assignedSenior?.length, 'Senior'),
      },
    ],
    [data],
  );

  const getData = React.useCallback(
    (searchQuery = '', lastEvaluatedKey = '') => {
      return getSeniorList(
        searchQuery,
        lastEvaluatedKey,
        data?.assignedSenior || [],
        null,
        false,
        '',
        true,
        true,
      );
    },
    [data],
  );

  const withPaginationProps: any = React.useMemo(() => {
    const commonProps = {
      getData: getData,
      onSuccess: getSeniorListSuccess,
      onError: getSeniorListFail,
      onSearchSuccess: getSeniorSearchListSuccess,
      lastEvaluatedKeyPath: 'common.seniorList.lastEvaluatedKey',
      tableDataPath: 'common.seniorList.data',
    };
    return {
      fetchType: PaginationFetchTypes.LAST_EVALUATED_KEY,
      paginationProps: {
        ...commonProps,
        withBorder: true,
        onPageChange: updateSeniorListPageNumber,
        rowsPerPage: PAGINATION_LIMIT.wellnessCoachList,
        className: classes.pagination,
        containerClass: classes.paginationContainer,
        loadingPath: 'common.seniorList.loading',
        paginationType: PAGINATION_TYPE.PRIMARY,
        isScrollOnTop: true,
        pagePath: 'common.seniorList.currentPage',
        searchLastEvaluatedKeyPath: 'common.seniorList.searchLastEvaluatedKey',
      },
      searchBarProps: {
        ...commonProps,
        searchMethod: searchSeniorByName,
        isNewDesign: true,
        placeholder: 'Search Senior',
        position: 'flex-start',
      },
    };
  }, []);

  /**
   * @description Wrap component withPagination HOC to get the pagination service
   */
  const assignedSeniorsTableWithPagination = React.useMemo(() => {
    return withPaginationTable(
      AssignedSeniorsTable,
      {selected, onChangeSelected: handleChangeSelected},
      withPaginationProps,
    );
  }, [selected, handleChangeSelected, withPaginationProps]);

  // Unassign Action Handler, Passing Senior Names & CoachName for Success & error dialogs
  const handleUnassign = React.useCallback(() => {
    const seniors = selected.map((senior) => {
      return {
        id: senior.senior_id,
        name: constructName(
          senior?.minimal?.name?.first_name,
          '',
          senior?.minimal?.name?.last_name,
        ),
      };
    });
    const coach = {
      id: data?.userId || '',
      name: constructName(data?.name?.firstName, '', data?.name?.lastName),
    };
    dispatch(unassignSeniors(coach, seniors));
  }, [data, selected, dispatch]);

  // on unmount clear the table data
  React.useEffect(() => {
    return () => {
      dispatch(resetSeniorList());
    };
  }, [dispatch]);

  return (
    <DialogWrapper title={dialogTitle} wide>
      <Box data-testid='UnassignSeniorsDialog' className={classes.container}>
        <Box className={classes.displayData} marginBottom='0px'>
          <Box display='flex'>
            <Box className={classes.label}>
              Please select single or multiple Seniors to un-assign from
              Wellness Coach:
            </Box>
            <Box>
              <ShowHyphen>
                <UserName
                  name={{
                    firstName: data?.name?.firstName,
                    middleName: '',
                    lastName: data?.name?.lastName,
                  }}
                />
              </ShowHyphen>
            </Box>
          </Box>
        </Box>
        <Box className={classes.displayData} marginBottom='18px'>
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
          {assignedSeniorsTableWithPagination()}
        </Box>
        <DialogActions
          className={eventClasses.dialogActions}
          style={{
            justifyContent: 'center',
          }}>
          <Button
            size='large'
            onClick={onCloseHandler}
            variant='outlined'
            data-testid='UnassignSeniorsCancel'>
            Cancel
          </Button>
          <Button
            size='large'
            onClick={handleUnassign}
            color='primary'
            variant='contained'
            disabled={selected.length === 0}
            data-testid='UnassignSeniorsUnassign'>
            Unassign
          </Button>
        </DialogActions>
      </Box>
    </DialogWrapper>
  );
};

export default UnassignSeniorsDialog;
