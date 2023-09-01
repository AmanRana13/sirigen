import {
  GET_GOALS_SUCCESS,
  UPDATE_GOALS_PAGE_NUMBER,
  GET_GOAL_ACTION_MAP,
  UPDATE_GOAL_ACTION_MAP,
  GET_GOALS,
  GET_GOALS_FAILS,
  RESET_GOALS,
} from './goals.action';
import {
  IGoalsAction,
  intialStateGoals,
  IInitialStateGoals,
} from './goals.types';

const goalsReducer = (
  state: IInitialStateGoals = intialStateGoals,
  action: IGoalsAction,
) => {
  switch (action.type) {
    case GET_GOALS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_GOALS_SUCCESS:
      return {
        ...state,
        goalsRowsData: action.payload.data,
        lastEvaluatedKey: action.payload.lastEvaluatedKey,
        loading: false,
      };
    case GET_GOALS_FAILS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_GOALS_PAGE_NUMBER: {
      return {
        ...state,
        currentPage: action.payload,
      };
    }
    case GET_GOAL_ACTION_MAP: {
      return {
        ...state,
        goalsActionMap: {...action.payload.response},
      };
    }
    case UPDATE_GOAL_ACTION_MAP: {
      return {
        ...state,
        goalsActionMap: {...action.payload.goalActionMap},
      };
    }
    case RESET_GOALS: {
      return intialStateGoals;
    }
    default:
      return state;
  }
};

export default goalsReducer;
