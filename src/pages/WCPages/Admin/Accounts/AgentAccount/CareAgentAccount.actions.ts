import {isEmpty} from 'lodash';
import {
  showApplicationLoader,
  hideApplicationLoader,
} from '../../../../../common/ApplicationLoader/ApplicationLoader.action';
import {getCareAgentService} from 'services/careAgentAccountService/careAgentAccount.service';
import {getCurrentSenior, unmaskPhoneNumber} from 'globals/global.functions';
import {DIALOG_TYPES} from 'globals/global.constants';
import {
  addAgentService,
  disableAgentService,
  resendOtpService,
} from 'services/adminServices/agentAccount.service';
import {
  closeDialog,
  getCareAgentList,
  getCareAgentListSuccess,
  openOverlayDialog,
  resetCareAgentList,
  showError,
} from 'store/commonReducer/common.action';
import {
  IAddAgentPayload,
  IDisableAgentPayload,
  IGetCareAgentsParams,
  IResendOtpPayload,
} from './CareAgentAccount.types';
// eslint-disable-next-line max-len
import {validateEmailAddressService} from 'services/addUserService/validateEmailAddressAndMobileService';
import {Roles} from 'globals/enums';

export const GET_CARE_AGENTS = 'GET_CARE_AGENTS';
export const RESET_CARE_AGENTS = 'RESET_CARE_AGENTS';
export const RESET_PAGINATION = 'RESET_PAGINATION';
export const END_PAGINATION = 'END_PAGINATION';

// TODO: will move getCareAgents to a separate commmon reducer outside Admin.
/**
 * @description action creator to get the data of all care agents.
 * @param {string} lastEvaluatedKey
 * @returns void
 */
export const getCareAgents =
  (lastEvaluatedKey?: string, careAgentIds?: string[]) =>
  async (dispatch: any) => {
    try {
      let params: IGetCareAgentsParams = {
        last_evaluated_key: lastEvaluatedKey,
      };
      if (careAgentIds?.length) {
        params = {
          last_evaluated_key: lastEvaluatedKey,
          careagent_ids: JSON.stringify(careAgentIds),
        };
      }
      dispatch(showApplicationLoader());
      const response = await getCareAgentService(params);
      if (isEmpty(response.result)) {
        dispatch({type: END_PAGINATION});
      }
      dispatch({
        type: GET_CARE_AGENTS,
        payload: response.result,
      });
      dispatch(hideApplicationLoader());

      return response;
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    }
  };

/**
 * @functions addEditAgent
 * @description action creator to add a new agent with edited details.
 * @param {*} data
 */

export const addEditAgent =
  (data: any, existingEmail?: string, triggerOtp?: boolean) =>
  async (dispatch: any) => {
    const params: IAddAgentPayload = {
      employee_id: data.empId,
      name: {first_name: data.firstName, last_name: data.lastName},
      email: data.email.toLowerCase(),
      access: data.access,
      phone_number: {
        number: unmaskPhoneNumber(data.phone),
        ext: data.extension || '',
      },
      location: {
        zipcode: data.zipCode,
        city: data.city,
        state: data.state,
      },
      shift: data.access === Roles.BDM ? null : data.agentShift,
      is_active: true,
    };
    if (data.userId) {
      params.user_id = data.userId;
    }
    try {
      dispatch(showApplicationLoader());
      await addAgentService(params);
      if (triggerOtp && existingEmail !== data.email) {
        await dispatch(resendOtp(data.email, false));
      }
      //Closing the dialog here as it was appearing in login page while changing role of self
      dispatch(closeDialog());
      dispatch(resetCareAgentList());
      const response = await dispatch(getCareAgentList());
      dispatch(getCareAgentListSuccess(response));
      dispatch(
        openOverlayDialog({
          type: DIALOG_TYPES.SUCCESS,
          firstMessage: `User ${data.firstName} ${data.lastName} ${
            data.userId ? 'updated' : 'added'
          } successfully`,
        }),
      );
      dispatch(hideApplicationLoader());
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
      return error;
    }
  };

/**
 * @functions disableAgent
 * @description action creator to disable care agent account.
 * @param {*} data
 */
export const disableAgent = (data: any) => async (dispatch: any) => {
  const params: IDisableAgentPayload = {
    employee_id: data.employeeId,
    email: data.email,
    is_active: false,
    user_id: data.userId,
  };

  try {
    dispatch(showApplicationLoader());
    await disableAgentService(params);
    dispatch(resetCareAgentList());
    const response = await dispatch(getCareAgentList());
    dispatch(getCareAgentListSuccess(response));
    dispatch(
      openOverlayDialog({
        type: DIALOG_TYPES.SUCCESS,
        firstMessage: `User ${data.name.firstName} ${data.name.lastName} disabled successfully`,
      }),
    );
    dispatch(hideApplicationLoader());
  } catch (error) {
    dispatch(hideApplicationLoader());
    dispatch(showError(error));
    return error;
  }
};

export const resendOtp =
  (
    email: any,
    showSuccessMessage: boolean = true,
    withAccountId: boolean = false,
  ) =>
  async (dispatch: any) => {
    const params: IResendOtpPayload = {
      email: email,
    };
    if (withAccountId) {
      const {accountID} = getCurrentSenior();
      params.account = accountID;
    }

    try {
      dispatch(showApplicationLoader());
      await resendOtpService(params);
      dispatch(hideApplicationLoader());
      if (showSuccessMessage) {
        dispatch(
          openOverlayDialog({
            type: DIALOG_TYPES.SUCCESS,
            firstMessage: `OTP is successfully sent to email ${email}`,
          }),
        );
      }
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
      return error;
    }
  };

export const isFirstLogin = (email: string) => async (dispatch: any) => {
  const param = {
    email: email,
  };
  try {
    dispatch(showApplicationLoader());
    const response = await validateEmailAddressService(param);
    dispatch(hideApplicationLoader());
    return response.data.is_first_login;
  } catch (error) {
    console.error(error);
    dispatch(hideApplicationLoader());
  }
};
