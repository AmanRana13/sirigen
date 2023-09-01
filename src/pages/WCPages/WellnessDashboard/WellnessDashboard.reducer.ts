import {
  SET_CURRENT_STATE,
  SET_START_END_TIME,
  RE_RENDER_GRAPH,
} from './WellnessDashboard.types';
import {SET_SLEEP_START_END_TIME} from './WellnessDashboard.actions';

const INITIAL_STATE = {
  currentState: 'day',
  startTime: '',
  endTime: '',
  reRender: false,
  sleepStartTime: null,
  sleepEndTime: null,
};

export const wellnessDashboardReducer = (
  state = INITIAL_STATE,
  action: any,
) => {
  switch (action.type) {
    case SET_CURRENT_STATE:
      return {
        ...state,
        currentState: action.currentState,
      };
    case SET_START_END_TIME:
      return {
        ...state,
        startTime: action.startTime,
        endTime: action.endTime,
      };

    case RE_RENDER_GRAPH:
      return {
        ...state,
        reRender: action.value,
      };

    case SET_SLEEP_START_END_TIME:
      return {
        ...state,
        sleepStartTime: action.payload.startTime,
        sleepEndTime: action.payload.endTime,
      };

    default:
      return state;
  }
};
