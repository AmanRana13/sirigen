/* eslint-disable max-len */
import React from 'react';
import {Box, TableContainer, Typography, Button} from '@mui/material';

import {DIALOG_TYPES, PAGINATION_LIMIT} from 'globals/global.constants';
import {maskPhoneNumber} from 'globals/global.functions';
import {
  getCareAgentList,
  getCareAgentListFail,
  getCareAgentListSuccess,
  openDialog,
  openOverlayDialog,
  resetCareAgentList,
  updateCareAgentListPageNumber,
} from 'store/commonReducer/common.action';
import {ICareAgentData} from 'services/careAgentAccountService/careAgentAccount.types';

import {disableAgent, isFirstLogin} from './CareAgentAccount.actions';
import {agentAccountStyle} from './AgentAccount.style';
import {ROLES_CONFIG} from 'config/app.config';
import globalUseStyles from 'config/global.styles';
import {
  isExistsEmailAddress,
  isExistsEmployeeId,
} from 'pages/WCPages/AddUser/ProfileInfo/ProfileInfo.action';
import EditAndDisable from 'common/EditAndDisable/EditAndDisable.component';
import {ITableRowData} from 'common/Table/Table.types';
import {PAGINATION_TYPE, PaginationFetchTypes, Roles} from 'globals/enums';
import withPaginationTable from 'hoc/withPaginationIsolated/withPaginationTable';
import Table from 'common/Table/Table.component';
import {useAppDispatch} from 'hooks/reduxHooks';

/**
 * @description UserList Table Component
 * @returns {JSX}
 */
const UserTable = (props: {data: ICareAgentData[]}) => {
  const dispatch: any = useAppDispatch();
  const headerData = React.useMemo(
    () => [
      {
        columnId: 'employeeId',
        label: 'Employee ID',
        width: 150,
      },
      {
        columnId: 'firstName',
        label: 'First Name',
        width: 160,
      },
      {
        columnId: 'lastName',
        label: 'Last Name',
        width: 160,
      },
      {
        columnId: 'email',
        label: 'Email',
      },
      {
        columnId: 'phone',
        label: 'Phone',
        width: 180,
      },
      {
        columnId: 'access',
        label: 'Role',
        width: 85,
      },
      {
        columnId: 'action',
        label: '',
        width: 120,
      },
    ],
    [],
  );

  /**
   * @functions handleEdit
   * @description edit the care agent account.
   * @param {*} item
   * @returns void
   */
  const handleEdit = React.useCallback(
    async (item: any) => {
      dispatch(isExistsEmailAddress(false));
      dispatch(isExistsEmployeeId(false));
      item.isFirstLogin = await dispatch(isFirstLogin(item.email));
      dispatch(
        openDialog({
          type: DIALOG_TYPES.ADD_AGENT,
          data: item,
          dialogTitle: 'Edit User',
        }),
      );
    },
    [dispatch],
  );

  /**
   * @functions handleDisable
   * @description disable the care agent account.
   * @param {ICareAgentData} disableData
   * @returns void
   */
  const handleDisable = React.useCallback(
    (disableData: ICareAgentData): void => {
      const agentName = `${disableData.name.firstName} ${disableData.name.lastName}`;
      // Can't disable if Seniors are Assigned to a CareAgent, raise error
      if (disableData?.assignedSenior?.length) {
        dispatch(
          openOverlayDialog({
            type: DIALOG_TYPES.ERROR2,
            firstMessage: `Agent Account could not be DISABLED. Please un-assign all the Seniors from ${agentName} to disable the account`,
          }),
        );
        return;
      }
      const openDialogProp = {
        /* eslint-disable max-len */
        boldMessage: `Are you sure you want to disable the user ${agentName}`,
        successButtonText: 'Confirm',
        type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
        isFailButton: true,
        onSuccessButton: () => {
          dispatch(disableAgent(disableData));
        },
      };
      dispatch(openDialog({...openDialogProp}));
    },
    [dispatch],
  );

  /**
   * @functions renderActions
   * @description render function for User Actions
   * @param {any} value // not required
   * @param {ICareAgentData} record data for current row
   * @returns {JSX}
   */
  const renderActions = React.useCallback(
    (value: any, record: ICareAgentData) => {
      return (
        <Box padding='12.5px 4px'>
          <EditAndDisable
            handleEdit={() => handleEdit(record)}
            handleDisable={() => handleDisable(record)}
          />
        </Box>
      );
    },
    [handleEdit, handleDisable],
  );

  const rowData = React.useMemo<ITableRowData<ICareAgentData>>(
    () => ({
      values: [
        {
          dataId: 'employeeId',
        },
        {
          dataId: 'name',
          dataKey: 'firstName',
          format: (name) => name.firstName,
        },
        {
          dataId: 'name',
          dataKey: 'lastName',
          format: (name) => name.lastName,
        },
        {
          dataId: 'email',
          style: {
            wordBreak: 'break-word',
          },
        },
        {
          dataId: 'phone',
          format: (phone) => maskPhoneNumber(phone),
        },
        {
          dataId: 'accessRole',
          format: (role: Roles) => ROLES_CONFIG[role].accessLabel,
        },
        {
          dataId: '',
          render: renderActions,
        },
      ],
    }),
    [renderActions],
  );

  return (
    <Box>
      <TableContainer>
        <Table<ICareAgentData>
          headerData={headerData}
          rowId='email'
          rowData={rowData}
          {...props}
        />
      </TableContainer>
    </Box>
  );
};

/**
 * @description This component list down all care agent accounts.
 * @returns {JSX}
 */
const AgentAccount = () => {
  const {classes} = agentAccountStyle();
  const {classes: globalClasses} = globalUseStyles();
  const dispatch: any = useAppDispatch();

  /**
   * @functions handleAddAgent
   * @description add a care agent.
   * @returns void
   */
  const handleAddAgent = () => {
    dispatch(isExistsEmailAddress(false));
    dispatch(isExistsEmployeeId(false));
    dispatch(
      openDialog({type: DIALOG_TYPES.ADD_AGENT, dialogTitle: 'Add User'}),
    );
  };

  const withPaginationProps: any = React.useMemo(() => {
    const commonProps = {
      getData: getCareAgentList,
      onSuccess: getCareAgentListSuccess,
      onError: getCareAgentListFail,
      lastEvaluatedKeyPath: 'common.careAgentList.lastEvaluatedKey',
      tableDataPath: 'common.careAgentList.data',
    };
    return {
      fetchType: PaginationFetchTypes.LAST_EVALUATED_KEY,
      paginationProps: {
        ...commonProps,
        onPageChange: updateCareAgentListPageNumber,
        rowsPerPage: PAGINATION_LIMIT.adminAgentAccount,
        className: classes.pagination,
        loadingPath: 'common.careAgentList.loading',
        paginationType: PAGINATION_TYPE.PRIMARY,
        isScrollOnTop: true,
        pagePath: 'common.careAgentList.currentPage',
        searchLastEvaluatedKeyPath:
          'common.careAgentList.searchLastEvaluatedKey',
      },
    };
  }, [classes]);

  /**
   * @description Wrap component withPagination HOC to get the pagination service
   */
  const userTableWithPagination = withPaginationTable(
    UserTable,
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
    <Box className={classes.container} data-testid='admin-agent-account'>
      <Box className={classes.agentAccountHeader}>
        <Typography className={classes.agentAccountText} variant='h2'>
          Vimient Account
        </Typography>
        <Button
          variant='contained'
          color='primary'
          data-testid = 'buttonAddUser'
          onClick={handleAddAgent}
          className={globalClasses.smallButton}>
          Add User
        </Button>
      </Box>
      {userTableWithPagination()}
    </Box>
  );
};

export default AgentAccount;
