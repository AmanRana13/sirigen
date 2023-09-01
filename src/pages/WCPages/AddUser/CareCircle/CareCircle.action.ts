import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {showToast} from 'common/Toast';

import get from 'lodash.get';
import {
  EMPTY_CAREGIVER_INFO,
  setSeniorDetail,
} from 'store/commonReducer/common.action';
import {GetSeniorData} from 'globals/enums';
import {getCurrentSenior} from 'globals/global.functions';

import {
  createUserService,
  fetchCaregiverInfoservice,
  saveCaregiverInfoService,
} from 'services/careCircleService/careCircleService';
import {ICreateCaregiverParams, IUpdateCaregiverInfo} from './CareCircle.type';

/**
 * @actionCreator createUser
 * @description to add new caregiver
 * @param (newCareGiverData):IUpdateCaregiverInfo
 */
export const createUser =
  (newCareGiverData: IUpdateCaregiverInfo, deletion: string[]) =>
  async (dispatch: any) => {
    const seniorInfo = getCurrentSenior();
    const newCareGiverIds: string[] = [];
    try {
      for (const careGiverData of newCareGiverData.addition) {
        const data: ICreateCaregiverParams = {
          role: 'caregiver',
          email: careGiverData.basic_info.email,
          mobile_number: careGiverData.basic_info.mobile_number,
          name: careGiverData.basic_info.name.first_name,
          account_id: seniorInfo.account_id,
          senior_id: seniorInfo.senior_id,
        };
        const res: any = await createUserService(data);
        newCareGiverIds.push(res?.data[0].user_id);
      }

      newCareGiverIds.forEach((id: string, index: number) => {
        newCareGiverData.addition[index].caregiver_id = id;
      });
      const params: IUpdateCaregiverInfo = {
        ...newCareGiverData,
        deletion: deletion,
      };
      const response = await dispatch(saveCareGiverInfo(params));
      return response;
    } catch (err) {
      const message = get(err, 'response.data.message');
      dispatch(showToast(message, 'error'));
    }
  };

/**
 * @actionCreator saveCareGiverInfo
 * @description to update the details of caregiver
 * @param (newCareGiverData):IUpdateCaregiverInfo
 */
export const saveCareGiverInfo =
  (data: IUpdateCaregiverInfo) => async (dispatch: any) => {
    const seniorInfo = getCurrentSenior();
    dispatch(showApplicationLoader());

    try {
      const params = {
        ...data,
        account_id: seniorInfo.account_id,
        senior_id: seniorInfo.senior_id,
      };
      const response = await saveCaregiverInfoService(params);
      dispatch(hideApplicationLoader());
      dispatch(showToast('Saved Successfully', 'success'));
      dispatch({type: EMPTY_CAREGIVER_INFO});
      dispatch(setSeniorDetail(GetSeniorData.CAREGIVER));
      return response;
    } catch (err) {
      console.log('err', err);
      dispatch(hideApplicationLoader());
      const message = get(err, 'response.data.message');
      dispatch(showToast(message, 'error'));
    }
  };

/**
 * @actionCreator fetchCareGiverInfo
 * @description to fetch the details of existing caregiver
 * @returns the details of existing caregivers
 */
export const fetchCareGiverInfo = () => async (dispatch: any) => {
  dispatch(showApplicationLoader());
  const seniorInfo = getCurrentSenior();
  try {
    const res: any = await fetchCaregiverInfoservice(
      seniorInfo.senior_id,
      seniorInfo.account_id,
    );
    dispatch(hideApplicationLoader());
    return res.data?.caregivers;
  } catch (err) {
    dispatch(hideApplicationLoader());
    return [];
  }
};
