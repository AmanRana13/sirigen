import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {showToast} from 'common/Toast';
import {API} from 'globals/api';

import {push} from 'redux-first-history';

export const resetPasswordAPI = (values: any) => {
  return (dispatch: any) => {
    dispatch(showApplicationLoader());
    API({
      url: 'cognito/authentication/reset-password',
      method: 'post',
      data: values,
    })
      .then(() => {
        dispatch(hideApplicationLoader());

        dispatch(showToast('password reset successfull.', 'success'));
        dispatch(push('/'));
      })
      .catch(() => {
        dispatch(hideApplicationLoader());
        dispatch(showToast('Something went wrong.', 'error'));
      });
  };
};
