import {applicationLoaderActionTypes} from './ApplicationLoader.types';

export const showApplicationLoader = (
  text = '',
  loadingApp = false,
  isAutoSave: boolean = false,
) => {
  return (dispatch: any) => {
    if (!isAutoSave) {
      dispatch({
        type: applicationLoaderActionTypes.SHOW_APPLICATION_LOADER,
        text,
        loadingApp,
      });
    }
  };
};

export const hideApplicationLoader = (isAutoSave: boolean = false) => {
  return (dispatch: any) => {
    if (!isAutoSave) {
      dispatch({type: applicationLoaderActionTypes.HIDE_APPLICATION_LOADER});
    }
  };
};
