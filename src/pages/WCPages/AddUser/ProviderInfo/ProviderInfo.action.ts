import {isEmpty} from 'lodash';
import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {showToast} from 'common/Toast';
import {API} from 'globals/api';
import {GetSeniorData} from 'globals/enums';
import {getCurrentSenior} from 'globals/global.functions';
import get from 'lodash.get';
import {
  EMPTY_PROVIDER_INFO,
  setSeniorDetail,
} from 'store/commonReducer/common.action';

export const saveProviderInfo = (data: any) => {
  return (dispatch: any) => {
    dispatch(showApplicationLoader());
    const accountInfo = getCurrentSenior();
    const doctorAPI = API({
      url: 'users/provider/doctor',
      method: 'post',
      data: {
        ...data.doctor,
        account_id: accountInfo.account_id,
        senior_id: accountInfo.senior_id,
      },
    });

    const dentistAPI = API({
      url: 'users/provider/dentist',
      method: 'post',
      data: {
        ...data.dentist,
        account_id: accountInfo.account_id,
        senior_id: accountInfo.senior_id,
      },
    });
    let pharmacyAPI: any = [{data: []}];
    if (
      !isEmpty(data.pharmacy.provider_modification) ||
      !isEmpty(data.pharmacy.provider_addition) ||
      !isEmpty(data.pharmacy.provider_deletion)
    ) {
      pharmacyAPI = API({
        // eslint-disable-next-line max-len
        url: `users/provider/pharmacy`,
        method: 'post',
        data: {
          ...data.pharmacy,
          account_id: accountInfo.account_id,
          senior_id: accountInfo.senior_id,
        },
      });
    }

    return Promise.all([doctorAPI, dentistAPI, pharmacyAPI])
      .then((res) => {
        dispatch(hideApplicationLoader());
        dispatch(showToast('Saved Successfully', 'success'));
        dispatch({type: EMPTY_PROVIDER_INFO});
        dispatch(setSeniorDetail(GetSeniorData.PROVIDER));
        return {
          doctor: get(res[0], 'data'),
          dentist: get(res[1], 'data'),
          pharmacy: get(res[2], 'data'),
        };
      })
      .catch((err) => {
        dispatch(hideApplicationLoader());
        dispatch(showToast(err.message, 'error'));
      });
  };
};

export const fetchProviderInfo = () => {
  return (dispatch: any) => {
    dispatch(showApplicationLoader());
    const seniorInfo = getCurrentSenior();
    if (!seniorInfo) {
      dispatch(hideApplicationLoader());
      return Promise.resolve(null);
    }
    const doctorAPI = API({
      // eslint-disable-next-line max-len
      url: `users/provider/doctor?senior_id=${seniorInfo.senior_id}&account_id=${seniorInfo.account_id}`,
      method: 'get',
    });

    const dentistAPI = API({
      // eslint-disable-next-line max-len
      url: `users/provider/dentist?senior_id=${seniorInfo.senior_id}&account_id=${seniorInfo.account_id}`,
      method: 'get',
    });
    const pharmacyAPI = API({
      // eslint-disable-next-line max-len
      url: `users/provider/pharmacy?senior_id=${seniorInfo.senior_id}`,
      method: 'get',
    });

    return Promise.all([doctorAPI, dentistAPI, pharmacyAPI])
      .then((res) => {
        dispatch(hideApplicationLoader());
        return {
          doctor: get(res[0], 'data'),
          dentist: get(res[1], 'data'),
          pharmacy: get(res[2], 'data'),
        };
      })
      .catch(() => {
        dispatch(hideApplicationLoader());
      });
  };
};
