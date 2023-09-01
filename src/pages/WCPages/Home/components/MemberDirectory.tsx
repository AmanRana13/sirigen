import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Dialog} from '@mui/material';

import SeniorCallScheduler from 'pages/WCPages/SeniorCallScheduler';
import {
  constructName,
  getCareAgentInfo,
  getQueryParamTimezone,
  searchDelay,
} from 'globals/global.functions';
import {
  PaginationFetchTypes,
  PAGINATION_TYPE,
  Roles,
  ZoneType,
} from 'globals/enums';

import {memberDirectoryStyle} from './MemberDirectory.style';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {
  SENIOR_HOME_SEARCH,
  SET_HOME_WC,
  SET_HOME_ZONE,
  emptyPaginationData,
  getCareAgentList,
  getSeniorList,
  getSeniorListFail,
  getSeniorListSuccess,
  getSeniorSearchListSuccess,
  openOverlayDialog,
  resetHomeSearch,
  resetSeniorList,
  searchSeniorByName,
  setSeniorZone,
  showError,
  updateSeniorListPageNumber,
} from 'store/commonReducer/common.action';
import {
  DIALOG_TYPES,
  PAGINATION_LIMIT,
  TABLE_CACHE_KEY,
} from 'globals/global.constants';
import withPaginationTable from 'hoc/withPaginationIsolated';
import {homeStyle} from '../Home.style';
import AutoComplete from 'common/AutoComplete/AutoComplete';
import {useInfiniteQuery, useMutation} from 'utilities/react-query';
import SeniorTable from './SeniorTable';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import {
  getCareAgents,
  RESET_CARE_AGENTS,
} from 'pages/WCPages/Admin/Accounts/AgentAccount/CareAgentAccount.actions';
import {IConfigInterface} from 'config/app.config.types';
import ZoneSelect from 'common/ZoneSelect/ZoneSelect.component';
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {postMinimalInfoService} from 'services/seniorService/senior.service';

const MemberDirectory = ({...props}) => {
  const {classes} = memberDirectoryStyle();
  const navigate = useNavigate();
  const roleConfig: IConfigInterface = useAppSelector(
    (state: any) => state.auth.roleConfig,
  );
  const [openScheduler, setOpenSchedulerDialog] = useState(false);
  const [seniorInfo, setSeniorInfo] = useState({seniorID: '', accountID: ''});
  const [callInfo, setCallInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [wcSearchInput, setWcSearchInput] = useState<string>('');
  const dispatch: any = useAppDispatch();
  const currentUser = getCareAgentInfo();
  const currentWcData = useAppSelector(
    (state: any) => state.careAgentAccount.allCareAgentAccounts,
  );
  const selectedWc = useAppSelector(
    (state: any) => state.common.seniorList.selectedHomeWc,
  );
  const selectedZone: ZoneType | '' = useAppSelector(
    (state: any) => state.common.seniorList.selectedHomeZone,
  );

  //AutoComplete Logic Start
  const {observerRef} = useIntersectionObserver(() => {
    fetchNextPage();
  });

  const {data, fetchNextPage, refetch, isFetching, isLoading} =
    useInfiniteQuery({
      queryKey: ['careAgentListDynamicScroll'],
      queryFn: (params: any): any => {
        return dispatch(
          getCareAgentList(
            open ? wcSearchInput : '',
            params.pageParam,
            false,
            [],
            Roles.CareAgent,
          ),
        );
      },
      getNextPageParam: (lastPage: any) => {
        return lastPage?.lastEvaluatedKey
          ? lastPage?.lastEvaluatedKey
          : undefined;
      },
    });

  // Mutation for Changing Zone
  const changeZone = useMutation({
    mutationFn: (data: any): Promise<any> => {
      dispatch(showApplicationLoader());
      return postMinimalInfoService(data);
    },
    onSuccess: (data: any) => {
      const fullName = constructName(
        data?.name?.first_name,
        data?.name?.last_name,
      );
      dispatch(setSeniorZone(data.user_id, data.zone));
      dispatch(hideApplicationLoader());
      dispatch(
        openOverlayDialog({
          type: DIALOG_TYPES.SUCCESS,
          firstMessage: `${fullName}'s zone has been updated successfully.`,
        }),
      );
    },
    onError: (error: any) => {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    },
  });

  /**
   * @function handleZoneChange
   * @description function that handles Zone Change Mutation Call
   * @param {any} data seniorInfo
   * @param {ZoneType} zone new zone value to be updated
   */
  const handleZoneChange = React.useCallback(
    (data: any, zone: ZoneType) => {
      const minimal = data?.minimal;
      changeZone.mutate({
        account_id: data?.account_id,
        user_id: data?.senior_id,
        name: minimal?.name,
        gender: minimal?.gender,
        dob: minimal?.dob,
        email: minimal?.email,
        mobile_number: minimal?.mobile_number,
        address: minimal?.location,
        zone: zone?.toLowerCase(),
        is_resident: minimal?.is_resident,
        ...(minimal?.is_resident
          ? {
              corporate: minimal?.corporate || '',
              facility: minimal?.facility || '',
            }
          : {}),
      });
    },
    [changeZone],
  );

  //AutoComplete Logic End
  const navigateToDashboard = (
    seniorID: any,
    accountID: any,
    timezone: any,
  ) => {
    //Clear data of call logs to get updated data.
    dispatch(emptyPaginationData(TABLE_CACHE_KEY.CALL_LOGS));
    navigate(
      `/senior/${seniorID}/${accountID}/${getQueryParamTimezone(timezone)}/${
        roleConfig.defaultHomeRoute
      }`,
    );
  };

  const openSchedulerForm = (
    seniorID: any,
    accountID: any,
    info: any,
    event: any,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    setSeniorInfo({seniorID: seniorID, accountID: accountID});
    setCallInfo(info);
    setOpenSchedulerDialog(true);
  };

  // HOC props
  const withPaginationProps: any = React.useMemo(() => {
    const commonProps = {
      getData: (searchQuery: string, lastEvaluatedKey: string) =>
        getSeniorList(
          searchQuery,
          lastEvaluatedKey,
          [],
          null,
          false,
          '',
          true,
          true,
          selectedWc?.userId,
          selectedZone,
        ),
      onSuccess: getSeniorListSuccess,
      onError: getSeniorListFail,
      onSearchSuccess: getSeniorSearchListSuccess,
      lastEvaluatedKeyPath: 'common.seniorList.lastEvaluatedKey',
      tableDataPath: 'common.seniorList.data',
    };
    return {
      fetchType: PaginationFetchTypes.LAST_EVALUATED_KEY,
      // constructing dependency using all possible filter values
      dependency: `${selectedZone || selectedZone === ''}${
        selectedWc?.userId || ''
      }`,
      paginationProps: {
        ...commonProps,
        onPageChange: updateSeniorListPageNumber,
        rowsPerPage: PAGINATION_LIMIT.homeSenior,
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
        onSearchChange: (value: string) => {
          dispatch({type: SENIOR_HOME_SEARCH, payload: value}); // will trigger with debounce
        },
        searchMethod: searchSeniorByName,
        disableFrontendSearch: true,
        noRightMargin: true,
        renderLeftSideComponent: () => {
          return (
            <Box display='flex' gap='1.5rem'>
              <AutoComplete
                id='autocompleteAgents'
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                value={selectedWc}
                onChange={(event: any, newValue: any) => {
                  dispatch({
                    type: SET_HOME_WC,
                    payload: newValue,
                  });
                }}
                getOptionDisabled={() => isLoading || (open && isFetching)}
                onInputChange={(event: any, newValue: any) => {
                  if (event) {
                    setWcSearchInput(newValue);
                  }
                }}
                loading={isLoading || (open && isFetching)}
                filterOptions={(x: any) => x}
                renderOption={(props: any, option: any) => {
                  if (!option.fullName) {
                    return (
                      <Box key={option.userId || 'all'} ref={observerRef}></Box>
                    );
                  }
                  return (
                    <Box component='li' {...props} key={option.userId}>
                      {option.fullName}
                    </Box>
                  );
                }}
                options={options}
              />
              <ZoneSelect
                zoneType={selectedZone}
                onChange={(e) => {
                  const value = e.target.value as ZoneType;
                  dispatch({
                    type: SET_HOME_ZONE,
                    payload: value,
                  });
                }}
                hasAllOption
              />
            </Box>
          );
        },
      },
    };
  }, [
    open,
    selectedWc,
    options,
    wcSearchInput,
    observerRef,
    isFetching,
    isLoading,
    selectedZone,
  ]);

  /**
   * @description Wrap component withPagination HOC to get the pagination service
   */
  const SeniorPaginationData = withPaginationTable(
    SeniorTable,
    {openSchedulerForm, navigateToDashboard, handleZoneChange},
    withPaginationProps,
  );

  const debounceWCSearch = React.useCallback(searchDelay(refetch), []);

  React.useEffect(() => {
    if (!open) {
      setWcSearchInput('');
    }
  }, [open]);

  //check if CA have seniors or not.
  React.useEffect(() => {
    if (currentWcData?.length) {
      if (
        currentWcData[0]?.assignedSenior.length &&
        roleConfig.role === Roles.CareAgent
      ) {
        dispatch({
          type: SET_HOME_WC,
          payload: {
            fullName: `${currentUser.userName.first_name} ${currentUser.userName.last_name}`,
            userId: currentUser.userId,
          },
        });
      } else {
        dispatch({
          type: SET_HOME_WC,
          payload: {
            fullName: 'All Wellness Coaches',
            userId: null,
          },
        });
      }
    }

    if (!currentWcData) {
      dispatch(getCareAgents('', [currentUser.userId]));
    }
  }, [currentWcData]);

  React.useEffect(() => {
    if (wcSearchInput) {
      debounceWCSearch();
    }
  }, [wcSearchInput, debounceWCSearch]);

  React.useEffect(() => {
    if (data) {
      const flatArrayData: any[] =
        data?.pages.map((item) => item.data).flat() || [];
      flatArrayData.unshift({fullName: 'All Wellness Coaches', userId: null});
      flatArrayData.length > 8
        ? flatArrayData.push({
            fullName: '',
            userId: '',
          })
        : [];
      setOptions([...flatArrayData]);
    }
  }, [data]);
  // on unmount clear the table data
  React.useEffect(() => {
    return () => {
      dispatch(resetSeniorList());
      dispatch({type: RESET_CARE_AGENTS});
      dispatch(resetHomeSearch());
    };
  }, [dispatch]);

  return (
    <>
      {SeniorPaginationData()}
      <SchedulerForm
        closeDialog={() => setOpenSchedulerDialog(false)}
        openScheduler={openScheduler}
        seniorInfo={seniorInfo}
        callInfo={callInfo}
        {...props}
      />
    </>
  );
};

const SchedulerForm = ({
  closeDialog,
  openScheduler,
  seniorInfo,
  ...props
}: any) => {
  return (
    <Dialog
      onClose={closeDialog}
      fullScreen={true}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
      aria-labelledby='simple-dialog-title'
      open={openScheduler}>
      <SeniorCallScheduler
        closeDialog={closeDialog}
        noHeader={true}
        {...props}
        seniorInfo={seniorInfo}
      />
    </Dialog>
  );
};

export {MemberDirectory};
