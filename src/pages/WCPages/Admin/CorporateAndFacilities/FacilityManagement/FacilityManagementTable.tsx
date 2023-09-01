/* eslint-disable max-len */
import React from 'react';
import {Box, TableContainer} from '@mui/material';
import Table from 'common/Table/Table.component';
import {ITableRowData} from 'common/Table/Table.types';
import {AssessmentStatus} from 'globals/enums';
import EditAndDisable from '../../../../../common/EditAndDisable/EditAndDisable.component';
import {
  getPaginationDataIsolated,
  openDialog,
  openOverlayDialog,
  showError,
} from 'store/commonReducer/common.action';
import {useMutation} from 'utilities/react-query';
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
// eslint-disable-next-line max-len
import {disableFacilityService} from 'services/coporateAndFacilitiesService/FacilityManagementService/facilitymanagement.service';
import StateCityFormatter from 'common/StateCityFormatter/StateCityFormatter';
import {useAppDispatch} from 'hooks/reduxHooks';
import {DIALOG_TYPES, PAGINATION_LIMIT} from 'globals/global.constants';
import ShowHyphen from 'common/ShowHyphen/ShowHyphen';
import {maskPhoneNumber} from 'globals/global.functions';
import {useNavigate, useParams} from 'react-router-dom';
import {IFacilityData} from 'services/coporateAndFacilitiesService/FacilityManagementService/facilitymanagement.types';
import {
  getFacilityList,
  getFacilityListFail,
  getFacilityListSuccess,
  resetFacilityManagementList,
} from './FacilityManagement.action';
import {facilityManagementStyle} from './FacilityManagement.style';

const RenderResidentsCount = ({residentData, count}: any) => {
  const {classes} = facilityManagementStyle();
  const navigate = useNavigate();
  const redirectToResidents = (rowData: IFacilityData) => {
    // TODO uncomment this when facility pages are needed
    // navigate(`/facility-management/${rowData.id}/Residents`);
  };

  return (
    <Box padding='12.5px 4px'>
      <span
        onClick={() => redirectToResidents(residentData)}
        className={classes.link}>
        {`${count} ${count > 0 ? 'Residents' : 'Resident'}`}
      </span>
    </Box>
  );
};

const FacilityMangementTable = (props: {data: IFacilityData[]}) => {
  const dispatch: any = useAppDispatch();
  const {corpId} = useParams();

  // Mutation Object for disable Service
  const disableMutation = useMutation({
    mutationFn: (facilityData: any): Promise<boolean> => {
      dispatch(showApplicationLoader());

      return disableFacilityService(facilityData);
    },
    onSuccess: ({facilityName}: any) => {
      dispatch(hideApplicationLoader());
      dispatch(
        openOverlayDialog({
          type: DIALOG_TYPES.SUCCESS,
          firstMessage: `${facilityName} facility is Disabled successfully along with the Facility Agents and Residents associated with it.`,
        }),
      );
      dispatch(resetFacilityManagementList());
      dispatch(
        getPaginationDataIsolated(
          () => getFacilityList('', corpId),
          PAGINATION_LIMIT.corporateAndFacilities,
          '',
          1,
          getFacilityListSuccess,
          getFacilityListFail,
          [],
          '',
          '',
        ),
      );
    },
    onError: (error) => {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    },
  });

  /**
   * @functions handleEdit
   * @description edit the facility accounts.
   * @param {*} item
   * @returns void
   */
  const handleEdit = async (item: any) => {
    dispatch(
      openDialog({
        type: DIALOG_TYPES.FACILITY,
        data: item,
        dialogTitle: 'Edit Facility',
        id: corpId,
      }),
    );
  };

  /**
   * @functions handleDisable
   * @description disable the facility account.
   * @param {*} disableData
   * @returns void
   */
  const handleDisable = (facilityData: IFacilityData): void => {
    const openDialogProp = {
      boldMessage: `Are you sure you want to DISABLE ${facilityData.facilityName} facility?`,
      successButtonText: AssessmentStatus.YES,
      cancelButtonText: AssessmentStatus.NO,
      type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
      isFailButton: true,
      secondMessage: `Please note that this will DISABLE the Facility, Facility Agents and all the Residents under the Facility.`,
      showAlertIcon: true,
      onSuccessButton: () => {
        const faciltiyData = {
          name: facilityData.facilityName,
          id: facilityData.id,
        };
        disableMutation.mutate(faciltiyData);
      },
    };
    dispatch(openDialog({...openDialogProp}));
  };

  const headerData = React.useMemo(
    () => [
      {
        columnId: 'facilityName',
        label: 'Facility Name',
        style: {minWidth: '190px'},
      },
      {columnId: 'facilityCode', label: 'Facility Code', width: 190},
      {columnId: 'cityAndState', label: 'City/State', width: 230},
      {columnId: 'Phone', label: 'Phone #', width: 190},
      {columnId: 'agent', label: 'Agent', width: 190},
      {columnId: 'Residents', label: 'Residents', width: 130},
      {columnId: 'editAndDisable', label: '', width: 113},
    ],
    [],
  );

  const rowData = React.useMemo<ITableRowData<any>>(
    () => ({
      values: [
        {
          dataId: 'facilityName',
          format: (name: any) => name,
        },
        {
          dataId: 'facilityCode',
          format: (code: any) => code,
        },
        {
          dataId: 'cityAndState',
          format: (cityAndState: any) => (
            <ShowHyphen>
              <StateCityFormatter {...cityAndState} />
            </ShowHyphen>
          ),
        },

        {
          dataId: 'phone',
          format: (phone: any) => {
            return maskPhoneNumber(phone);
          },
        },
        {
          dataId: 'agent',
          format: (agent: any) => {
            return <ShowHyphen>{agent}</ShowHyphen>;
          },
        },
        {
          dataId: 'residents',
          render: (data: any, rowData: IFacilityData) => {
            return <RenderResidentsCount residentData={rowData} count={data} />;
          },
        },
        {
          dataId: 'editAndDisable',
          render: (data: any, rowData: IFacilityData) => (
            <EditAndDisable
              handleEdit={() => handleEdit(rowData)}
              handleDisable={() => handleDisable(rowData)}
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

export default FacilityMangementTable;
