import {
  CHECK_CALL_SCHEDULED_FAILED,
  CLEAR_MESSAGE,
} from './SeniorCallScheduler.action';

const INITIAL_STATE = {
  checkCallScheduledMessage: '',
};

export const seniorCallSchedulerReducer = (
  state = INITIAL_STATE,
  action: any,
) => {
  switch (action.type) {
    case CHECK_CALL_SCHEDULED_FAILED:
      return {
        ...state,
        checkCallScheduledMessage: action.payload,
      };

    case CLEAR_MESSAGE: {
      return {
        ...state,
        checkCallScheduledMessage: '',
      };
    }
    default:
      return state;
  }
};
