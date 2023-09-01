import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {emptyStringToNull, getCurrentSenior} from 'globals/global.functions';
import {API} from 'globals/api';
import {getDevicesService} from 'services/deviceService/device.service';
import {openOverlayDialog, showError} from 'store/commonReducer/common.action';
import {DEVICE_TYPE, DIALOG_TYPES} from 'globals/global.constants';

export const GET_DEVICES_DATA = 'GET_DEVICES_DATA';
export const GET_DEVICES_DATA_SUCCESSFUL = 'GET_DEVICES_DATA_SUCCESSFUL';
export const GET_DEVICES_DATA_FAIL = 'GET_DEVICES_DATA_FAIL';
export const GET_WATCH_DETAILS = 'GET_WATCH_DETAILS';
export const RESET_WATCH_DETAILS = 'RESET_WATCH_DETAILS';

export const getDevicesInfo = () => async (dispatch: any) => {
  const seniorInfo = getCurrentSenior();
  if (!seniorInfo) {
    return;
  }
  const param = {
    senior_id: seniorInfo.senior_id,
    account_id: seniorInfo.account_id,
  };
  try {
    dispatch(showApplicationLoader());
    dispatch({
      type: GET_DEVICES_DATA,
    });
    const res = await getDevicesService(param);
    dispatch(hideApplicationLoader());
    dispatch({
      type: GET_DEVICES_DATA_SUCCESSFUL,
      payload: {
        data: res,
      },
    });
  } catch (err) {
    dispatch({
      type: GET_DEVICES_DATA_FAIL,
    });
    dispatch(hideApplicationLoader());
    dispatch(showError(err));
  }
};

export const saveDevicesDetail = (
  data: any,
  height: any,
  weight: any,
  timezone: any,
  type: any,
) => {
  return (dispatch: any) => {
    dispatch(showApplicationLoader());
    const accountInfo = getCurrentSenior();
    data = emptyStringToNull(data);

    const apiData = {
      ...data,
      senior_id: accountInfo.senior_id,
      timezone: timezone,
      weight: weight,
      height: height,
    };

    return API({
      url: 'users/medical-device',
      method: 'put',
      data: apiData,
    })
      .then(() => {
        if (type === 'watch') {
          dispatch(connectNavigilDevice(data.device_serial));
        } else {
          dispatch(hideApplicationLoader());
          dispatch(
            openOverlayDialog({
              type: DIALOG_TYPES.SUCCESS,
              // eslint-disable-next-line max-len
              firstMessage: `Device has been saved successfully`,
            }),
          );
          dispatch(getDevicesInfo());
        }
        return {success: true};
      })
      .catch((err) => {
        dispatch(hideApplicationLoader());
        dispatch(showError(err));
      });
  };
};

export const deleteDevicesDetail = (data: any, deviceName: any) => {
  return (dispatch: any) => {
    const accountInfo = getCurrentSenior();
    const apiData = {
      ...data,
      senior_id: accountInfo.senior_id,
    };
    dispatch(showApplicationLoader());

    API({
      url: 'users/medical-device',
      method: 'delete',
      data: apiData,
    })
      .then(() => {
        dispatch(hideApplicationLoader());
        dispatch(
          openOverlayDialog({
            type: DIALOG_TYPES.SUCCESS,
            // eslint-disable-next-line max-len
            firstMessage: `${deviceName} has been deleted successfully`,
          }),
        );
        dispatch({
          type: RESET_WATCH_DETAILS,
        });
        dispatch(getDevicesInfo());
        return {success: true};
      })
      .catch((err) => {
        dispatch(hideApplicationLoader());
        dispatch(showError(err));
      });
  };
};

export const connectNavigilDevice = (serialId: any) => {
  return (dispatch: any) => {
    const accountInfo = getCurrentSenior();
    const apiData = {
      serial_id: serialId,
      device_type: DEVICE_TYPE.WATCH,
      account_id: accountInfo.account_id,
      senior_id: accountInfo.senior_id,
    };

    return API({
      url: 'users/vendor/navigil-registration',
      method: 'post',
      data: apiData,
    })
      .then(() => {
        dispatch(hideApplicationLoader());
        dispatch(
          openOverlayDialog({
            type: DIALOG_TYPES.SUCCESS,
            firstMessage: `Device has been saved successfully`,
          }),
        );
        dispatch(getDevicesInfo());
        return {success: true};
      })
      .catch((err) => {
        dispatch(hideApplicationLoader());
        dispatch(showError(err));
      });
  };
};
