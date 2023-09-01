import {applicationLoaderActionTypes} from './ApplicationLoader.types';

const initialState = {
  show: false,
  text: '',
  loadingApp: false,
};

export const applicationLoaderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case applicationLoaderActionTypes.SHOW_APPLICATION_LOADER:
      return {
        ...state,
        show: !action.loadingApp,
        text: action.text,
        loadingApp: action.loadingApp,
      };
    case applicationLoaderActionTypes.HIDE_APPLICATION_LOADER:
      return {
        ...state,
        show: false,
        text: '',
        loadingApp: false,
      };
    default:
      return state;
  }
};
