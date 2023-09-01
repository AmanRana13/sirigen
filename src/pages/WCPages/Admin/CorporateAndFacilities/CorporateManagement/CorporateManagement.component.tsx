/* eslint-disable max-len */
import React from 'react';
import {Box, Typography, Button, TableContainer} from '@mui/material';
import Table from 'common/Table/Table.component';
import {corporateManagementStyle} from './CorporateManagement.style';
import globalUseStyles from 'config/global.styles';
import {ITableRowData} from 'common/Table/Table.types';
import {maskPhoneNumber} from 'globals/global.functions';
import withPaginationTable from 'hoc/withPaginationIsolated';
import {DIALOG_TYPES, PAGINATION_LIMIT} from 'globals/global.constants';
import {
  getCorporateList,
  getCorporateListFail,
  getCorporateListSuccess,
  getCorporateSearchListSuccess,
  searchByName,
  updateCorporatePageNumber,
} from './CorporateManagement.action';
import {
  AssessmentStatus,
  PAGINATION_TYPE,
  PaginationFetchTypes,
  Roles,
} from 'globals/enums';
import EditAndDisable from '../../../../../common/EditAndDisable/EditAndDisable.component';
import {useAppDispatch} from 'hooks/reduxHooks';
import {
  openDialog,
  openOverlayDialog,
  showError,
} from 'store/commonReducer/common.action';
import {useMutation} from 'utilities/react-query';
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {disableCorporateService} from 'services/coporateAndFacilitiesService/corporateManagementService/corporateManagement.service';
import {useNavigate} from 'react-router-dom';
import RoleBaseRender from 'common/RoleBaseRender/RoleBaseRender';

const CorporateMangementTable = (props: {data: any}) => {
  const {classes} = corporateManagementStyle();
  const dispatch: any = useAppDispatch();
  const navigate = useNavigate();

  // Mutation Object for disable Service
  const disableMutation = useMutation({
    mutationFn: (data: any): Promise<boolean> => {
      dispatch(showApplicationLoader());
      return disableCorporateService(data);
    },
    onSuccess: (data: any) => {
      dispatch(hideApplicationLoader());
      dispatch(
        openOverlayDialog({
          type: DIALOG_TYPES.SUCCESS,
          firstMessage: `${data.corporateName} facility is Disabled successfully along with the Facility Agents and Residents associated with it.`,
        }),
      );
      dispatch(getCorporateList(''));
    },
    onError: (error) => {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    },
  });

  /**
   * @functions handleEdit
   * @description edit the corporate accounts.
   * @param {*} item
   * @returns void
   */
  const handleEdit = async (item: any) => {
    dispatch(
      openDialog({
        type: DIALOG_TYPES.CORPORATE,
        data: item,
        dialogTitle: 'Edit Corporate',
      }),
    );
  };

  /**
   * @functions handleDisable
   * @description disable the corporate account.
   * @param {*} disableData
   * @returns void
   */
  const handleDisable = (disableData: any): void => {
    const openDialogProp = {
      boldMessage: `Are you sure you want to DISABLE ${disableData.corporateName} corporate ?`,
      successButtonText: AssessmentStatus.YES,
      cancelButtonText: AssessmentStatus.NO,
      type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
      isFailButton: true,
      secondMessage: `Please note that this will DISABLE the Corporate, Corporate Admins, Facilities, Facility Agents and all the Residents under the Corporate.`,
      showAlertIcon: true,
      onSuccessButton: () => {
        disableMutation.mutate(disableData);
      },
    };
    dispatch(openDialog({...openDialogProp}));
  };

  const headerData = React.useMemo(
    () => [
      {
        columnId: 'name',
        label: 'Corporate Name',
        style: {minWidth: '250px'},
      },
      {columnId: 'corporateCode', label: 'Corporate Code', width: 150},
      {columnId: 'phone', label: 'Phone #', width: 180},
      {columnId: 'facility', label: 'Facility', width: 130},
      {columnId: 'admins', label: 'Admins', width: 100},
      {columnId: 'agents', label: 'Agents', width: 100},
      {columnId: 'residents', label: 'Residents', width: 110},
      {columnId: 'editAndDisable', label: '', width: 113},
    ],
    [],
  );

  const redirectToFacility = (rowData: any) => {
    navigate(rowData.id);
  };

  const renderFacilities = (value: any, record: any) => {
    const facility = value || 0;
    return (
      <Box padding='12.5px 4px'>
        <span
          data-testid = 'redirectToFacility'
          onClick={() => redirectToFacility(record)}
          className={classes.link}>
          {`${facility} ${facility === 1 ? 'Facility' : 'Facilities'}`}
        </span>
      </Box>
    );
  };

  const rowData = React.useMemo<ITableRowData<any>>(
    () => ({
      values: [
        {
          dataId: 'name',
          format: (name: any) => name,
        },
        {
          dataId: 'code',
          format: (code: any) => code,
        },
        {
          dataId: 'phone',
          format: (phone: any) => {
            return maskPhoneNumber(phone);
          },
        },
        {
          dataId: 'totalFacilities',
          render: (facility: any, record: any) =>
            renderFacilities(facility, record),
        },
        {
          dataId: 'totalAdmins',
          format: (admins: any) => {
            return admins;
          },
        },
        {
          dataId: 'totalAgents',
          format: (agents: any) => {
            return agents;
          },
        },
        {
          dataId: 'totalResidents',
          format: (residents: any) => {
            return residents;
          },
        },
        {
          dataId: 'editAndDisable',
          render: (data: any, rowData: any) => (
            <EditAndDisable
              handleEdit={() => handleEdit(rowData)}
              handleDisable={() => {
                // handleDisable(rowData)
              }}
              style={{padding: '10px 4px'}}
            />
          ),
        },
      ],
    }),
    [],
  );

  return (
    <Box mt={4}>
      <TableContainer>
        <Table<any>
          headerData={headerData}
          rowId='userId'
          rowData={rowData}
          noDataMessage='No Record found'
          {...props}
        />
      </TableContainer>
    </Box>
  );
};
const CorporateManagement = () => {
  const {classes} = corporateManagementStyle();
  const {classes: globalClasses} = globalUseStyles();
  const dispatch: any = useAppDispatch();

  const handleAddCorporate = () => {
    dispatch(
      openDialog({type: DIALOG_TYPES.CORPORATE, dialogTitle: 'Add Corporate'}),
    );
  };

  const withPaginationProps: any = React.useMemo(() => {
    const commonProps = {
      getData: getCorporateList,
      onSuccess: getCorporateListSuccess,
      onError: getCorporateListFail,
      onSearchSuccess: getCorporateSearchListSuccess,
      lastEvaluatedKeyPath:
        'corporateAndFacilities.corporateManagementList.lastEvaluatedKey',
      tableDataPath: 'corporateAndFacilities.corporateManagementList.data',
    };
    return {
      paginationProps: {
        ...commonProps,
        onPageChange: updateCorporatePageNumber,
        rowsPerPage: PAGINATION_LIMIT.corporateAndFacilities,
        className: classes.pagination,
        loadingPath: 'corporateAndFacilities.corporateManagementList.loading',
        paginationType: PAGINATION_TYPE.PRIMARY,
        tableDataPath: 'corporateAndFacilities.corporateManagementList.data',
        isScrollOnTop: true,
        pagePath: 'corporateAndFacilities.corporateManagementList.currentPage',
        searchLastEvaluatedKeyPath:
          'corporateAndFacilities.corporateManagementList.searchLastEvaluatedKey',
      },
      searchBarProps: {
        ...commonProps,
        searchMethod: searchByName,
        isNewDesign: true,
        placeholder: 'Search Corporate',
        position: 'flex-start',
      },
      fetchType: PaginationFetchTypes.LAST_EVALUATED_KEY,
    };
  }, []);

  /**
   * @description Wrap component withPagination HOC to get the pagination service
   */
  const corporateMangementWithPagination = withPaginationTable(
    CorporateMangementTable,
    {},
    withPaginationProps,
  );
  return (
    <Box className={classes.container} data-testid='corporate-management'>
      <Box className={classes.corporateManagementHeader}>
        <Typography className={classes.corporateManagementText} variant='h2'>
          Corporate Management
        </Typography>
        <RoleBaseRender notForRole={Roles.BDM} >
          <Button
            variant='contained'
            color='primary'
            data-testid = 'addCorporateBtn'
            onClick={handleAddCorporate}
            className={globalClasses.smallButton}>
            Add Corporate
          </Button>
        </RoleBaseRender>
      </Box>
      <Box className={classes.searchbar}>
        {corporateMangementWithPagination()}
      </Box>
    </Box>
  );
};

export default CorporateManagement;
