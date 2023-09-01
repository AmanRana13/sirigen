import {showToast} from 'common/Toast';
import {API} from 'globals/api';
import {getCurrentSenior} from 'globals/global.functions';

export const fetchNotifications = () => {
  return (dispatch: any) => {
    const seniorInfo = {...getCurrentSenior()};
    if (!seniorInfo) {
      return Promise.resolve(null);
    }
    return API({
      // eslint-disable-next-line max-len
      url: `careinsights/latest-insight?senior_id=${seniorInfo.seniorID}&account_id=${seniorInfo.accountID}&latest=5`,
      method: 'get',
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        dispatch(showToast('Notification Failed!', 'error'));
      });
  };
};
