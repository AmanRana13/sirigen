import {push} from 'redux-first-history';
import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {DIALOG_TYPES} from 'globals/global.constants';
import {forgotPasswordService} from 'services/adminServices/agentAccount.service';
import {loginUserService} from 'services/userService/userService';
import {openOverlayDialog, showError} from 'store/commonReducer/common.action';

export const forgotPasswordVerification = (email: any, password: any) => async (
  dispatch: any,
) => {
  dispatch(showApplicationLoader());
  const params = {
    email: email,
    password: password,
  };
  try {
    await loginUserService(params);
    dispatch(hideApplicationLoader());
    dispatch(push(`/choose-password?otp=${password}&email=${email}`));
  } catch (error) {
    console.log('error', error);
    dispatch(hideApplicationLoader());
    dispatch(
      openOverlayDialog({
        type: DIALOG_TYPES.ERROR2,
        // eslint-disable-next-line max-len
        firstMessage: `Incorrect one time password`,
        secondMessage: `Please try again`,
      }),
    );
  }
};

export const forgotPassword = (email: any) => async (dispatch: any) => {
  const params = {
    email: email,
  };

  try {
    dispatch(showApplicationLoader());
    await forgotPasswordService(params);
    dispatch(hideApplicationLoader());
    dispatch(
      openOverlayDialog({
        type: DIALOG_TYPES.SUCCESS,
        // eslint-disable-next-line max-len
        firstMessage: `If you have a valid account with us you will shortly receive an email to retrieve your password`,
      }),
    );
  } catch (error) {
    dispatch(hideApplicationLoader());
    dispatch(showError(error));
    return error;
  }
};
