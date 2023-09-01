import {CLOSE_CALL_ENTRY, CREATE_CALL_ENTRY} from './CallEntry.action';
const INITIAL_STATE = {
  callEntryData: [],
  events: {},
};

export const callEntryReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case `GET_CALL_ENTRY`:
      return {
        ...state,
      };
    case `SET_CALL_ENTRY`:
      return {
        ...state,
        ...action.payload,
      };
    case CREATE_CALL_ENTRY:
      return {
        ...state,
        events: {
          ...state.events,
          ...action.payload.callEntryAlarm,
        },
      };

    case CLOSE_CALL_ENTRY:
      return {
        ...state,
        events: {
          ...action.payload.updatedCallEntry,
        },
      };
    default:
      return state;
  }
};
