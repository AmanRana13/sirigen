import {
  GET_DEVICES_DATA,
  GET_DEVICES_DATA_SUCCESSFUL,
  GET_DEVICES_DATA_FAIL,
  GET_WATCH_DETAILS,
  RESET_WATCH_DETAILS,
} from './Devices.action';

const INITIAL_STATE = {
  data: [],
  deviceDataLoader: true,
  watchPhoneNumber: '',
  watchModelNumber: '',
};

export const devicesReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case GET_DEVICES_DATA:
      return {
        ...state,
        deviceDataLoader: true,
      };
    case GET_DEVICES_DATA_SUCCESSFUL:
      return {
        ...state,
        data: action.payload.data,
        deviceDataLoader: false,
      };
    case GET_DEVICES_DATA_FAIL:
      return {
        ...state,
        deviceDataLoader: false,
      };
    case GET_WATCH_DETAILS:
      return {
        ...state,
        watchPhoneNumber: action.payload.watchPhoneNumber,
        watchModelNumber: action.payload.watchModelNumber,
      };
    case RESET_WATCH_DETAILS:
      return {
        ...state,
        watchPhoneNumber: '',
        watchModelNumber: '',
      };
    default:
      return state;
  }
};
