import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {showToast} from 'common/Toast';
import {getCurrentSenior} from 'globals/global.functions';
import {API} from 'globals/api';
import get from 'lodash.get';

export const connectWithingDevice = (email: any) => {
  return (dispatch: any) => {
    dispatch(showApplicationLoader());
    const accountInfo = getCurrentSenior();
    const apiData = {
      email_id: email,
      account_id: accountInfo.account_id,
      senior_id: accountInfo.senior_id,
    };

    return API({
      url: 'users/vendor/withings-registration',
      method: 'post',
      data: apiData,
    })
      .then(() => {
        dispatch(hideApplicationLoader());

        const message = 'Withing device connected Successfully';
        dispatch(showToast(message, 'success'));
        return {success: true};
      })
      .catch((err) => {
        dispatch(hideApplicationLoader());
        dispatch(showToast(err.message, 'error'));
      });
  };
};

export const fetchDeviceIntegrationInfo = () => {
  return (dispatch: any) => {
    dispatch(showApplicationLoader());
    const seniorInfo = getCurrentSenior();

    const deviceInfoApi = API({
      // eslint-disable-next-line max-len
      url: `users/medical-device?senior_id=${seniorInfo.senior_id}&account_id=${seniorInfo.account_id}`,
      method: 'get',
    });
    return Promise.all([deviceInfoApi])
      .then((res) => {
        dispatch(hideApplicationLoader());
        return {
          devices: get(res[0], 'data'),
        };
      })
      .catch(() => {
        dispatch(hideApplicationLoader());
      });
  };
};
