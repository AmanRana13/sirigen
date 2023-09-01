/* eslint-disable max-len */
import React from 'react';
import {Box, CircularProgress} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from 'hooks/reduxHooks';
import {appRoutesEndpoints} from 'routes/appRoutesEndpoints';
import withPaginationTable from 'hoc/withPaginationIsolated';
import {API_LOAD_STATE, PAGINATION_LIMIT} from 'globals/global.constants';
import UserDataCard from 'common/UserDataCard';

import SeniorCoach from '../../SeniorCoach.component';
import {seniorCoachAssignmentStyle} from './SeniorCoachAssignment.style';
import {
  getUnassignedSeniorList,
  getSeniorListFail,
  getSeniorListSuccess,
  getSeniorSearchListSuccess,
  resetSeniorList,
  searchSeniorByName,
  updateSeniorListPageNumber,
} from 'store/commonReducer/common.action';
import {openAssignCoachDialog} from './SeniorCoachAssignment.action';
import {PaginationFetchTypes, PAGINATION_TYPE} from 'globals/enums';

/**
 * @description component for Senior Coach Assignment Table
 */
const SeniorCoachAssignmentTable = ({
  data: seniorDataList = [],
  isDataLoading,
  isSearch,
}: any) => {
  const {classes} = seniorCoachAssignmentStyle();
  const dispatch: any = useAppDispatch();

  if (isDataLoading === API_LOAD_STATE.PROGRESS) {
    return (
      <Box className={classes.emptySeniors} mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (seniorDataList.length === 0)
    return (
      <Box className={classes.emptySeniors} mt={10}>
        {isSearch ? 'No Records Found' : 'All Seniors are Assigned'}
      </Box>
    );

  return (
    <Box className={classes.seniorCardContainer}>
      {seniorDataList?.map((seniorData: any) => {
        const name = seniorData?.minimal?.name;
        return (
          <UserDataCard
            key={seniorData.senior_id}
            userData={{
              name: {
                firstName: name?.first_name,
                middleName: name?.middle_name,
                lastName: name?.last_name,
              },
              location: seniorData?.minimal?.location,
              dob: seniorData?.minimal?.dob,
              timezone: seniorData?.minimal?.location?.timezone,
              profileImage: seniorData?.profile_image,
              isResident: seniorData?.minimal?.is_resident,
              facility: seniorData?.minimal?.facility,
            }}
            onAssign={() => dispatch(openAssignCoachDialog(seniorData))}
          />
        );
      })}
    </Box>
  );
};

/**
 * @description component for Assignment of Senior Coach
 */
const SeniorCoachAssignment = () => {
  const navigate = useNavigate();
  const {classes} = seniorCoachAssignmentStyle();
  const dispatch: any = useAppDispatch();

  const wellnessCoachesHandler = () => {
    navigate(
      `/portal-admin/${appRoutesEndpoints.admin.nestedRoutes.assignment.baseRoute}/${appRoutesEndpoints.admin.nestedRoutes.seniorCoach.baseRoute}/wellness-coaches`,
      {replace: true},
    );
  };

  const withPaginationProps: any = React.useMemo(() => {
    const commonProps = {
      getData: getUnassignedSeniorList,
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
        onPageChange: updateSeniorListPageNumber,
        rowsPerPage: PAGINATION_LIMIT.seniorCoachAssignment,
        className: classes.pagination,
        loadingPath: 'common.seniorList.loading',
        paginationType: PAGINATION_TYPE.PRIMARY,
        tableDataPath: 'common.seniorList.data',
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
        disableFrontendSearch: true,
      },
    };
  }, []);

  /**
   * @description Wrap component withPagination HOC to get the pagination service
   */
  const seniorCoachAssignmentWithPagination = withPaginationTable(
    SeniorCoachAssignmentTable,
    {},
    withPaginationProps,
  );

  // on unmount clear the table data
  React.useEffect(() => {
    return () => {
      dispatch(resetSeniorList());
    };
  }, [dispatch]);

  return (
    <>
      <SeniorCoach
        seniorCoachHandler={wellnessCoachesHandler}
        mainHeading='Senior-Coach Assignment'
        subHeading='Unassigned Seniors'
        buttonText='Wellness Coaches'>
        <Box className={classes.searchbar}>
          {seniorCoachAssignmentWithPagination()}
        </Box>
      </SeniorCoach>
    </>
  );
};

export default SeniorCoachAssignment;
