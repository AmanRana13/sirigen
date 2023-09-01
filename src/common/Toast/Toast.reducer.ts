/** @format */

import {SHOW_TOAST, HIDE_TOAST} from './Toast.types';

const INITIAL_STATE = {
  type: 'success',
  message: '',
  duration: 4000,
  open: false,
};
export const toastReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        ...state,
        open: true,
        ...action.payload,
      };
    case HIDE_TOAST:
      return {
        ...state,
        open: false,
        ...action.payload,
      };
    default:
      return state;
  }
};
