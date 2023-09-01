import {CREATE_SOS, CREATE_FALL_DETECTION, CLOSE_ALARM} from './Alarm.action';

const intialState = {
  sos: {},
  fall: {},
};

const alarmReducer = (state = intialState, action: any) => {
  switch (action.type) {
    case CREATE_SOS:
      return {
        ...state,
        sos: {
          ...state.sos,
          ...action.payload.alarmData,
        },
      };
    case CREATE_FALL_DETECTION:
      return {
        ...state,
        fall: {
          ...state.fall,
          ...action.payload.alarmData,
        },
      };

    case CLOSE_ALARM:
      return {
        ...state,
        [action.payload.eventType]: action.payload.updatedAlarm,
      };
    default:
      return state;
  }
};

export default alarmReducer;
