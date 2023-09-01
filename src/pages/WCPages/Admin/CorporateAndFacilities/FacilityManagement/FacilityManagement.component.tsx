/* eslint-disable max-len */
import React from 'react';
import {Box, Typography, Button} from '@mui/material';
import globalUseStyles from 'config/global.styles';
import {maskPhoneNumber} from 'globals/global.functions';
import withPaginationTable from 'hoc/withPaginationIsolated';
import {DIALOG_TYPES, PAGINATION_LIMIT} from 'globals/global.constants';

import {PAGINATION_TYPE, PaginationFetchTypes, Roles} from 'globals/enums';
import {useAppDispatch} from 'hooks/reduxHooks';
import {openDialog, showError} from 'store/commonReducer/common.action';
import {useQuery} from 'utilities/react-query';
import {hideApplicationLoader} from 'common/ApplicationLoader';
import {facilityManagementStyle} from './FacilityManagement.style';
import {
  getFacilityList,
  getFacilityListFail,
  getFacilityListSuccess,
  getFacilitySearchListSuccess,
  resetFacilityManagementList,
  searchFacilityByName,
  updateFacilityPageNumber,
} from './FacilityManagement.action';
import {useParams} from 'react-router-dom';
import {getCorporateListService} from 'services/coporateAndFacilitiesService/corporateManagementService/corporateManagement.service';
import ShowHyphen from 'common/ShowHyphen/ShowHyphen';
import FacilityMangementTable from './FacilityManagementTable';
import RoleBaseRender from 'common/RoleBaseRender/RoleBaseRender';

const FacilityManagement = () => {
  const {classes} = facilityManagementStyle();
  const {classes: globalClasses} = globalUseStyles();
  const dispatch: any = useAppDispatch();
  const {corpId} = useParams();

  //query to fetch corpDetails
  const {data: corpDetails} = useQuery({
    queryKey: ['corporateDetails'],
    queryFn: (): Promise<any> => {
      return getCorporateListService({
        corporate_id: corpId,
      });
    },
    onError: (error: any) => {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    },
    cacheTime: 0,
  });

  const facilityHeaderData = React.useMemo((): any => {
    const corporateData = corpDetails?.data[0] || {};
    return [
      {label: 'Corporate Name:', value: corporateData.name || ''},
      {
        label: 'Corporate Contact:',
        value: corporateData?.phone
          ? maskPhoneNumber(String(corporateData?.phone))
          : '',
      },
      {
        label: 'Total Corporate Admins:',
        value: corporateData?.totalAdmins || '',
      },
      {label: 'Total Residents:', value: corporateData?.totalAdmins || 0},
      {label: 'Corporate Code:', value: corporateData?.code || ''},
      {label: 'Total Facility Agents:', value: corporateData?.totalAgents || 0},
    ];
  }, [corpDetails]);

  const handleAddFacility = () => {
    dispatch(
      openDialog({
        type: DIALOG_TYPES.FACILITY,
        dialogTitle: 'Add Facility',
        id: corpId,
      }),
    );
  };

  const withPaginationProps: any = React.useMemo(() => {
    const commonProps = {
      getData: (searchQuery: string) => getFacilityList(searchQuery, corpId),
      onSuccess: getFacilityListSuccess,
      onError: getFacilityListFail,
      onSearchSuccess: getFacilitySearchListSuccess,
      lastEvaluatedKeyPath:
        'corporateAndFacilities.facilityManagementList.lastEvaluatedKey',
      tableDataPath: 'corporateAndFacilities.facilityManagementList.data',
    };
    return {
      paginationProps: {
        ...commonProps,
        onPageChange: updateFacilityPageNumber,
        rowsPerPage: PAGINATION_LIMIT.corporateAndFacilities,
        className: classes.pagination,
        loadingPath: 'corporateAndFacilities.facilityManagementList.loading',
        paginationType: PAGINATION_TYPE.PRIMARY,
        tableDataPath: 'corporateAndFacilities.facilityManagementList.data',
        isScrollOnTop: true,
        pagePath: 'corporateAndFacilities.facilityManagementList.currentPage',
        searchLastEvaluatedKeyPath:
          'corporateAndFacilities.facilityManagementList.searchLastEvaluatedKey',
      },
      fetchType: PaginationFetchTypes.LAST_EVALUATED_KEY,
      searchBarProps: {
        ...commonProps,
        searchMethod: searchFacilityByName,
        isNewDesign: true,
        placeholder: 'Search Facility',
        position: 'flex-start',
      },
    };
  }, []);

  /**
   * @description Wrap component withPagination HOC to get the pagination service
   */
  const facilityMangementWithPagination = withPaginationTable(
    FacilityMangementTable,
    {},
    withPaginationProps,
  );

  React.useEffect(() => {
    return () => {
      dispatch(resetFacilityManagementList());
    };
  }, [dispatch]);
  return (
    <Box className={classes.container} data-testid='facility-management'>
      <Box className={classes.facilityManagementHeader}>
        <Typography className={classes.facilityManagementText} variant='h2'>
          Facility Management
        </Typography>
        <RoleBaseRender notForRole={Roles.BDM}>
          <Button
            variant='contained'
            color='primary'
            data-testid = 'addFacilityBtn'
            onClick={handleAddFacility}
            className={globalClasses.smallButton}>
            Add Facility
          </Button>
        </RoleBaseRender>
      </Box>
      <Box className={classes.facilityHeader} mb={4}>
        <Box
          display='flex'
          flexDirection='row'
          flexWrap='wrap'
          className={classes.facilityHeaderContainer}>
          {facilityHeaderData.map((data: any) => {
            return (
              <Box key={data.id} display='flex' flex='0 0 33.333333%'>
                <Typography variant='h5' className={classes.detailValues}>
                  {data.label}&nbsp;
                </Typography>
                <Box className={classes.detailValues}>
                  <ShowHyphen>{data.value}</ShowHyphen>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box className={classes.searchbar}>
        {facilityMangementWithPagination()}
      </Box>
    </Box>
  );
};

export default FacilityManagement;
