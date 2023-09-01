import {GET_CONFIG_DATA} from './config.action';
import {
  configInitialState,
  IConfigAction,
  IConfigInitialState,
} from './config.action.types';

const configReducer = (
  state: IConfigInitialState = configInitialState,
  action: IConfigAction,
) => {
  if (action.type === GET_CONFIG_DATA) {
    return {
      ...state,
      messages: {
        resourcesInfo: action.payload.resourcesInfo,
        uploadFileInfo: action.payload.uploadFileInfo,
        uploadUrlInfo: action.payload.uploadUrlInfo,
      },
      locationResponseTime: action.payload.locationResponseTime,
      autoSaveTimeOut: action.payload.autoSaveTimeOut,
    };
  } else {
    return state;
  }
};

export default configReducer;
