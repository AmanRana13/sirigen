import {IInitialState} from './preview.types';

export const SET_PREVIEW_DATA = 'SET_PREVIEW_DATA';
export const RESET_PREVIEW_DATA = 'RESET_PREVIEW_DATA';

export const setPreviewData = (payload: IInitialState) => {
  return {
    type: SET_PREVIEW_DATA,
    payload,
  };
};

export const resetPreviewData = () => {
  return {
    type: RESET_PREVIEW_DATA,
  };
};
