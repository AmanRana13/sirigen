/** @format */

import {SHOW_TOAST, HIDE_TOAST} from './Toast.types';

export const showToast = (message: string, type: any) => {
  return (dispatch: any) => {
    dispatch({
      type: SHOW_TOAST,
      payload: {
        type: type,
        message: message,
      },
    });
  };
};

export const hideToast = () => {
  return (dispatch: any) => {
    dispatch({
      type: HIDE_TOAST,
    });
  };
};
