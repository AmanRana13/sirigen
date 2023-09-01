import {RESET_PREVIEW_DATA, SET_PREVIEW_DATA} from './preview.action';
import {IInitialState, initialState, IPreviewAction} from './preview.types';

const previewReducer = (
  state: IInitialState = initialState,
  action: IPreviewAction,
) => {
  switch (action.type) {
    case SET_PREVIEW_DATA:
      return {...state, ...(action.payload || {})};
    case RESET_PREVIEW_DATA:
      return initialState;
    default:
      return state;
  }
};

export default previewReducer;
